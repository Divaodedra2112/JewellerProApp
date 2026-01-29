import { post } from '../../../services/api';

interface LoginResponse {
  isSuccess: boolean;
  code: string;
  token?: string;
  modules?: string[];
  data?: {
    otp?: string | null;
  };
}

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

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<LoginResponse> => {
  const response = await post<LoginResponse>('/auth/verify-pin', { phoneNumber, otp });
  
  // Check if the response indicates failure
  if (response && !response.isSuccess) {
    const error: any = new Error(response.code || 'Failed to verify OTP');
    error.response = {
      data: {
        code: response.code,
        isSuccess: false,
      },
    };
    throw error;
  }
  
  return {
    token: response?.token || '',
    modules: response?.modules || ['home', 'products', 'customers', 'profile', 'settings', 'help'], // Fallback modules
  };
};
