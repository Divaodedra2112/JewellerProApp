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
    const response = await post<LoginAppResponse>('/auth/login-app', requestData);
    
    // Check if the response indicates failure
    if (response && response.code && response.code !== 'SUCCESS' && !response.isSuccess) {
      const error: any = new Error(response.code || response.message || 'Failed to login');
      error.response = {
        data: {
          code: response.code,
          message: response.message,
          isSuccess: false,
        },
      };
      throw error;
    }
    
    return response;
  } catch (error: any) {
    logger.error('Login Service - Error in loginApp', error as Error);
    throw error;
  }
};
