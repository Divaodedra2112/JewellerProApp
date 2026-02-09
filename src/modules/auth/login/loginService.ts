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

export interface LoginAppRequest {
  countryCode: string;
  mobileNumber: string;
  password: string;
}

export interface LoginAppResponse {
  status?: number;
  data?: {
    code?: string;
    message?: string;
    user?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNumber: string;
      countryCode: string;
      roleId: string;
      role?: {
        id: string;
        name: string;
        description?: string;
        status?: string;
        permissions?: Record<string, any>;
        sequence?: number;
        isDefault?: boolean;
        isSuperAdmin?: boolean;
        createdAt?: string;
        updatedAt?: string;
      };
    };
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  timestamp?: string;
}

export const loginApp = async (requestData: LoginAppRequest): Promise<LoginAppResponse> => {
  const response = await post<LoginAppResponse>('/auth/login-app', requestData);
  
  console.log('[LoginService] Raw response from post:', JSON.stringify(response, null, 2));
  
  // The post function returns response.data, so response is already the data part
  // But the API returns { status: 200, data: {...} }, so response should be that object
  // Check if response has a nested data property (API response structure)
  const apiData = response?.data || response;
  
  console.log('[LoginService] Extracted apiData:', JSON.stringify(apiData, null, 2));
  
  // Check if the response indicates failure
  // Only throw error if code exists and is NOT LOGIN_SUCCESS
  if (apiData?.code && apiData.code !== 'LOGIN_SUCCESS' && apiData.code !== 'SUCCESS') {
    const error: any = new Error(apiData.code || apiData.message || 'Failed to login');
    error.response = {
      data: {
        code: apiData.code,
        message: apiData.message,
      },
    };
    throw error;
  }
  
  // If status is not 200, also consider it an error
  if (response?.status && response.status !== 200) {
    const error: any = new Error(apiData?.code || apiData?.message || 'Failed to login');
    error.response = {
      data: {
        code: apiData?.code,
        message: apiData?.message,
      },
    };
    throw error;
  }
  
  // Return the response with data properly structured
  return {
    ...response,
    data: apiData,
  };
};
