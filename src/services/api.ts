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

// Request interceptor to add device id and platform headers
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isOtpEndpoint =
      typeof config.url === 'string' &&
      (config.url.includes('/auth/verify-pin') || config.url.includes('/auth/resend-otp'));

    const token = await AsyncStorage.getItem('access_token');
    if (!isOtpEndpoint && token && config.headers) {
      config.headers.access_token = token;
    }
    // Add dynamic device id and platform headers
    const deviceId = await DeviceInfo.getUniqueId();
    const platform = Platform.OS;
    config.headers['x-current-device-id'] = deviceId;
    config.headers['x-client-info'] = JSON.stringify({
      bundleId: DeviceInfo.getBundleId(),
      platform,
    });
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
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
      console.error('[API Interceptor] Response construction error detected:', errorMsg, 'Error name:', errorName);
      const networkError = new Error(
        'Network Error: Unable to connect to server. Please check your internet connection.'
      );
      (networkError as any).isNetworkError = true;
      (networkError as any).code = (error as any)?.code;
      return Promise.reject(networkError);
    }

    const originalRequest = error.config;

    if (!originalRequest) {
      console.error('No original request found');
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
        (networkError as any).config = error.config;
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
          console.error('=== Token Refresh Failed ===');
          console.error('Error:', refreshError);
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
            console.error('Queued request failed:', err);
            return Promise.reject(err);
          });
      }
    }

    return Promise.reject(error);
  }
);

export const get = async <T>(url: string, params?: any): Promise<T | null> => {
  console.log(`[GET ${url}] Request:`, {
    params,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.get<T>(url, {
      params,
      signal: params?.signal,
    });

    console.log(`[GET ${url}] Response:`, {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    console.error(`[GET ${url}] Error:`, {
      error: {
        message: error?.message,
        status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
        data: error?.response?.data,
        code: error?.code,
      },
      timestamp: new Date().toISOString(),
    });

    if (error.name === 'AbortError') {
      return null;
    }

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

export const post = async <T>(url: string, data?: any): Promise<T | null> => {
  console.log(`[POST ${url}] Request:`, {
    data,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post<T>(url, data, {
      signal: data?.signal,
    });

    console.log(`[POST ${url}] Response:`, {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

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
      console.error(`[POST ${url}] Response construction error detected:`, errorMsg);
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

    console.error(`[POST ${url}] Error:`, {
      error: {
        message: error?.message,
        status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
        data: error?.response?.data,
        code: error?.code,
      },
      timestamp: new Date().toISOString(),
    });

    if (error.name === 'AbortError') {
      console.log(`[POST ${url}] Request aborted`);
      return null;
    }

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

export const put = async <T>(url: string, data: any): Promise<T> => {
  console.log(`[PUT ${url}] Request:`, {
    data,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.put<T>(url, data);

    console.log(`[PUT ${url}] Response:`, {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    console.error(`[PUT ${url}] Error:`, {
      error: {
        message: error?.message,
        status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
        data: error?.response?.data,
        code: error?.code,
      },
      timestamp: new Date().toISOString(),
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
  console.log(`[DELETE ${url}] Request:`, {
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.delete<T>(url);

    console.log(`[DELETE ${url}] Response:`, {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    console.error(`[DELETE ${url}] Error:`, {
      error: {
        message: error?.message,
        status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
        data: error?.response?.data,
        code: error?.code,
      },
      timestamp: new Date().toISOString(),
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
  console.log(`[DELETE ${url}] Request:`, {
    data,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.delete<T>(url, { data });

    console.log(`[DELETE ${url}] Response:`, {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error: any) {
    // Handle network errors where error.response is undefined
    const isNetworkError =
      !error.response &&
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED');

    console.error(`[DELETE ${url}] Error:`, {
      error: {
        message: error?.message,
        status: error?.response?.status ?? (isNetworkError ? 'NETWORK_ERROR' : undefined),
        data: error?.response?.data,
        code: error?.code,
      },
      timestamp: new Date().toISOString(),
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
