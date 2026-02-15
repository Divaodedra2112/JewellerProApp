import { post } from '../../../services/api';
import { logger } from '../../../utils/logger';

export interface SendOtpResponse {
  isSuccess: boolean;
  code: string;
  data?: {
    otp?: string | null;
  };
}

export const sendOtp = async (phoneNumber: string): Promise<SendOtpResponse | null> => {
  const requestData = {
    mobileNo: phoneNumber,
  };
  const response = await post<SendOtpResponse>('/auth/login', requestData);
  
  // Check if the response indicates failure
  if (response && !response.isSuccess) {
    const error: any = new Error(response.code || 'Failed to send OTP');
    error.response = {
      data: {
        code: response.code,
        isSuccess: false,
      },
    };
    throw error;
  }
  
  return response;
};

export interface LoginAppRequest {
  countryCode: string;
  mobileNumber: string;
  password: string;
}

export interface LoginAppResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  data?: {
    token?: string;
    refreshToken?: string;
    user?: {
      id: number;
      name: string;
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      photo?: string;
      roles?: Array<{
        id: number;
        name: string;
        permissions: Record<string, string[]>;
      }>;
      permissions?: Record<string, string[]>;
    };
    modules?: string[];
  };
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    photo?: string;
    roles?: Array<{
      id: number;
      name: string;
      permissions: Record<string, string[]>;
    }>;
    permissions?: Record<string, string[]>;
  };
  modules?: string[];
}

export const loginApp = async (requestData: LoginAppRequest): Promise<LoginAppResponse> => {
  try {
    logger.info('Login Service - Making login API call', {
      endpoint: '/auth/login-app',
      countryCode: requestData.countryCode,
      mobileNumber: requestData.mobileNumber,
      hasPassword: !!requestData.password,
    });

    const response = await post<LoginAppResponse>('/auth/login-app', requestData);
    
    logger.debug('Login Service - API response received', {
      hasResponse: !!response,
      isSuccess: response?.isSuccess,
      code: response?.code,
      hasData: !!response?.data,
      hasToken: !!(response?.data?.access_token || response?.token),
      hasUser: !!response?.data?.user || !!response?.user,
    });
    
    // Check if the response indicates failure
    if (response && response.code && response.code !== 'SUCCESS' && !response.isSuccess) {
      const errorMessage = response.code || response.message || 'Failed to login';
      logger.error('Login Service - Login API returned error', new Error(errorMessage), {
        code: response.code,
        message: response.message,
        isSuccess: response.isSuccess,
      });
      const error: any = new Error(errorMessage);
      error.response = {
        data: {
          code: response.code,
          message: response.message,
          isSuccess: false,
        },
      };
      throw error;
    }
    
    logger.info('Login Service - Login API call successful', {
      hasAccessToken: !!(response?.data?.access_token || response?.token),
      hasRefreshToken: !!(response?.data?.refresh_token || response?.refreshToken),
      userId: response?.data?.user?.id || response?.user?.id,
    });
    
    return response;
  } catch (error: any) {
    const errorDetails = {
      errorMessage: error?.message,
      errorCode: error?.code,
      statusCode: error?.response?.status,
      statusText: error?.response?.statusText,
      responseData: error?.response?.data ? JSON.stringify(error?.response?.data) : 'null',
      isNetworkError: error?.code === 'ERR_NETWORK' || error?.message === 'Network Error',
    };
    
    logger.error('Login Service - Error in loginApp', error as Error, errorDetails);
    throw error;
  }
};

export interface LogoutAppRequest {
  access_token: string;
}

export interface LogoutAppResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
}

export const logoutApp = async (accessToken: string): Promise<LogoutAppResponse> => {
  try {
    const requestData: LogoutAppRequest = {
      access_token: accessToken,
    };
    const response = await post<LogoutAppResponse>('/auth/logout-app', requestData);
    
    // Check if the response indicates failure
    if (response && response.code && response.code !== 'SUCCESS' && !response.isSuccess) {
      const error: any = new Error(response.code || response.message || 'Failed to logout');
      error.response = {
        data: {
          code: response.code,
          message: response.message,
          isSuccess: false,
        },
      };
      throw error;
    }
    
    return response || { isSuccess: true };
  } catch (error: any) {
    logger.error('Login Service - Error in logoutApp', error as Error);
    throw error;
  }
};
