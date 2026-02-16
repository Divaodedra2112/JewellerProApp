import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_URL, API_VERSION, API_TIMEOUT } from '../config/constants';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import {
  isRefreshing,
  processQueue,
  refreshApi,
  setIsRefreshing,
  setFailedQueue,
} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';
import { logout } from '../store/slices/authSlice';
import { logger } from '../utils/logger';

interface TokenResponse {
  access: {
    token: string;
    expires: string;
  };
}

interface ErrorResponse {
  code?: string;
  message?: string;
}

export type ApiResponse<T> = T;

const api = axios.create({
  baseURL: `${API_URL}/api/${API_VERSION}`,
  timeout: API_TIMEOUT,
});

// Log API configuration on startup (dev only)
if (__DEV__) {
  logger.debug('API Configuration Initialized', {
    baseURL: `${API_URL}/api/${API_VERSION}`,
    API_URL,
    API_VERSION,
    platform: Platform.OS,
  });
}

// Request interceptor to add device id and platform headers
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Log the full URL being called (only in dev mode)
    if (__DEV__) {
      const fullUrl = `${config.baseURL}${config.url}`;
      logger.debug('API Request', {
        method: config.method?.toUpperCase() || 'UNKNOWN',
        url: fullUrl,
      });
      
      // Log to Reactotron
      if (typeof console.tron !== 'undefined' && console.tron) {
        console.tron.log('API Request', {
          method: config.method?.toUpperCase() || 'UNKNOWN',
          url: fullUrl,
          data: config.data,
          headers: config.headers,
        });
      }
    }

    const isOtpEndpoint =
      typeof config.url === 'string' &&
      (config.url.includes('/auth/verify-pin') || config.url.includes('/auth/resend-otp'));

    const token = await AsyncStorage.getItem('access_token');
    if (!isOtpEndpoint && token && config.headers) {
      config.headers.access_token = token;
    }
    // Add dynamic device id and platform headers
    const deviceId = await DeviceInfo.getUniqueId();
    config.headers['x-current-device-id'] = deviceId;
    
    // Add x-login-type header for login-app and logout-app endpoints
    const isLoginAppEndpoint =
      typeof config.url === 'string' && config.url.includes('/auth/login-app');
    const isLogoutAppEndpoint =
      typeof config.url === 'string' && config.url.includes('/auth/logout-app');
    if ((isLoginAppEndpoint || isLogoutAppEndpoint) && config.headers) {
      config.headers['x-login-type'] = 'C1';
    }
    
    // Get app version from package.json
    const packageJson = require('../../package.json');
    config.headers['x-client-info'] = JSON.stringify({
      platform: 'app',
      version: packageJson.version || '1.0.0',
      bundleId: DeviceInfo.getBundleId(),
    });
    
    // Add ngrok-skip-browser-warning header for ngrok URLs
    if (typeof config.baseURL === 'string' && config.baseURL.includes('ngrok-free.app')) {
      config.headers['ngrok-skip-browser-warning'] = 'true';
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses
    if (__DEV__) {
      logger.debug('API Response Success', {
        url: response.config.url,
        status: response.status,
      });
      
      // Log to Reactotron
      if (typeof console.tron !== 'undefined' && console.tron) {
        console.tron.log('API Response Success', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    // Log all errors with full details
    const originalRequest = error.config;
    const fullUrl = originalRequest ? `${originalRequest.baseURL}${originalRequest.url}` : 'Unknown URL';
    
    logger.error('API Response Error', error as Error, {
      url: originalRequest?.url || 'Unknown',
      method: originalRequest?.method?.toUpperCase() || 'UNKNOWN',
      fullURL: fullUrl,
      status: error.response?.status,
      errorMessage: error.message,
      errorCode: (error as any)?.code,
    });
    
    // Log to Reactotron
    if (__DEV__ && typeof console.tron !== 'undefined' && console.tron) {
      console.tron.error('API Response Error', {
        url: originalRequest?.url || 'Unknown',
        method: originalRequest?.method?.toUpperCase() || 'UNKNOWN',
        fullURL: fullUrl,
        status: error.response?.status,
        errorMessage: error.message,
        errorCode: (error as any)?.code,
        responseData: error.response?.data,
      });
    }

    // Check for Response construction errors first (before accessing error properties)
    const errorMsg = (error as any)?.message || String(error);
    const errorName = (error as any)?.name || '';

    if (
      errorMsg.includes("Failed to construct 'Response'") ||
      errorMsg.includes('status provided (0)') ||
      errorMsg.includes('status (0)') ||
      errorName === 'RangeError' ||
      errorName === 'TypeError'
    ) {
      // Response construction error detected
      logger.error('Response Construction Error Detected', new Error(errorMsg), {
        fullURL: fullUrl,
        platform: Platform.OS,
      });
      const networkError = new Error(
        'Network Error: Unable to connect to server. Please check your internet connection.'
      );
      (networkError as any).isNetworkError = true;
      (networkError as any).code = (error as any)?.code;
      (networkError as any).config = originalRequest;
      return Promise.reject(networkError);
    }

    if (!originalRequest) {
      logger.error('No original request found in error', error as Error);
      return Promise.reject(error);
    }

    // Handle network errors where error.response is undefined
    // This prevents issues with Response objects being constructed with status 0
    if (!error.response) {
      const isNetworkError =
        error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED' ||
        error.message?.includes('Network Error');

      if (isNetworkError) {
        // Create a proper error object without trying to construct Response
        const networkError = new Error(error?.message || 'Network Error');
        (networkError as any).isNetworkError = true;
        (networkError as any).code = error?.code;
        (networkError as any).config = originalRequest || error.config;
        
        // Log network error details for debugging
        if (__DEV__) {
          logger.error('Network Error - Request failed', networkError as Error, {
            url: originalRequest?.url || error.config?.url,
            fullURL: originalRequest ? `${originalRequest.baseURL}${originalRequest.url}` : 'Unknown',
          });
        }
        
        return Promise.reject(networkError);
      }
    }

    const isTokenExpired =
      error.response?.status === 401 ||
      (error.response?.data &&
        typeof error.response.data === 'object' &&
        'code' in (error.response.data as ErrorResponse) &&
        (error.response.data as ErrorResponse).code === 'TOKEN_EXPIRED');

    if (isTokenExpired) {
      if (!isRefreshing) {
        setIsRefreshing(true);

        const refreshToken = await AsyncStorage.getItem('refresh_token');

        if (!refreshToken) {
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          store.dispatch(logout());
          // Ensure we clear refresh state and unblock any queued requests
          processQueue(error as Error, null);
          setIsRefreshing(false);
          return Promise.reject(error);
        }

        try {
          const response = await refreshApi.post<TokenResponse>('/auth/refresh-token', {
            refreshToken: refreshToken,
          });

          const newAccessToken = response.data.access?.token;
          if (!newAccessToken) {
            throw new Error('Token refresh failed: No access token returned');
          }

          // Validate token format (basic check)
          if (typeof newAccessToken !== 'string' || newAccessToken.length < 10) {
            throw new Error('Token refresh failed: Invalid token format');
          }

          await AsyncStorage.setItem('access_token', newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers.access_token = newAccessToken;
          }

          processQueue(null, newAccessToken);

          return api(originalRequest);
        } catch (refreshError) {
          logger.error('Token Refresh Failed', refreshError as Error);
          if (axios.isAxiosError(refreshError)) {
          }

          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          store.dispatch(logout());
          processQueue(refreshError as Error, null);
          return Promise.reject(refreshError);
        } finally {
          setIsRefreshing(false);
        }
      } else {
        return new Promise((resolve, reject) => {
          setFailedQueue({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.access_token = token as string;
            }
            return api(originalRequest);
          })
          .catch(err => {
            logger.error('Queued request failed', err as Error);
            return Promise.reject(err);
          });
      }
    }

    return Promise.reject(error);
  }
);

export const get = async <T>(url: string, params?: any): Promise<T | null> => {
  logger.logApiRequest(url, 'GET', params);
  

  try {
    const response = await api.get<T>(url, {
      params,
      signal: params?.signal,
    });

    logger.logApiResponse(url, response.status, response.data);

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    logger.error(`GET ${url} failed`, error as Error, {
      status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
      code: error?.code,
    });

    if (error.name === 'AbortError') {
      return null;
    }

    // For network errors, create a proper error object without trying to construct Response
    if (isNetworkError) {
      const networkError = new Error(error?.message || 'Network Error');
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      (networkError as any).config = error.config;
      
      // Log network error details for debugging
      if (__DEV__) {
          logger.error(`GET ${url} - Network Error`, networkError as Error);
      }
      
      throw networkError;
    }

    throw error;
  }
};

export const post = async <T>(url: string, data?: any): Promise<T | null> => {
  logger.logApiRequest(url, 'POST', data);
  

  try {
    const response = await api.post<T>(url, data, {
      signal: data?.signal,
    });

    logger.logApiResponse(url, response.status, response.data);

    return response.data;
  } catch (error: any) {
    // Handle Response construction errors first (before accessing error properties)
    const errorMsg = error?.message || String(error);
    const errorName = error?.name || '';

    if (
      errorMsg.includes("Failed to construct 'Response'") ||
      errorMsg.includes('status provided (0)') ||
      errorMsg.includes('status (0)') ||
      errorName === 'RangeError'
    ) {
      logger.error(`POST ${url} - Response construction error`, new Error(errorMsg));
      const networkError = new Error(
        'Network Error: Unable to connect to server. Please check your internet connection.'
      );
      (networkError as any).isNetworkError = true;
      throw networkError;
    }

    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    logger.error(`POST ${url} failed`, error as Error, {
      status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
      code: error?.code,
    });

    if (error.name === 'AbortError') {
      logger.debug(`POST ${url} - Request aborted`);
      return null;
    }

    // For network errors, create a proper error object without trying to construct Response
    if (isNetworkError) {
      const networkError = new Error(error?.message || 'Network Error');
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      (networkError as any).config = error.config;
      
      // Log network error details for debugging
      if (__DEV__) {
        logger.error(`POST ${url} - Network Error`, networkError as Error);
      }
      
      throw networkError;
    }

    throw error;
  }
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  logger.logApiRequest(url, 'PUT', data);

  try {
    const response = await api.put<T>(url, data);

    logger.logApiResponse(url, response.status, response.data);

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    logger.error(`PUT ${url} failed`, error as Error, {
      status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
      data: error?.response?.data,
      code: error?.code,
    });

    // For network errors, create a proper error object without trying to construct Response
    if (isNetworkError) {
      const networkError = new Error(error?.message || 'Network Error');
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      throw networkError;
    }

    throw error;
  }
};

export const del = async <T>(url: string): Promise<T> => {
  logger.logApiRequest(url, 'DELETE');

  try {
    const response = await api.delete<T>(url);

    logger.logApiResponse(url, response.status, response.data);

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    logger.error(`DELETE ${url} failed`, error as Error, {
      status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
      data: error?.response?.data,
      code: error?.code,
    });

    // For network errors, create a proper error object without trying to construct Response
    if (isNetworkError) {
      const networkError = new Error(error?.message || 'Network Error');
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      throw networkError;
    }

    throw error;
  }
};

// Add a new DELETE function that accepts data
export const deleteWithData = async <T>(url: string, data?: any): Promise<T> => {
  logger.logApiRequest(url, 'DELETE', data);

  try {
    const response = await api.delete<T>(url, { data });

    logger.logApiResponse(url, response.status, response.data);

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    logger.error(`DELETE ${url} failed`, error as Error, {
      status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
      data: error?.response?.data,
      code: error?.code,
    });

    // For network errors, create a proper error object without trying to construct Response
    if (isNetworkError) {
      const networkError = new Error(error?.message || 'Network Error');
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      throw networkError;
    }

    throw error;
  }
};

export default api;
