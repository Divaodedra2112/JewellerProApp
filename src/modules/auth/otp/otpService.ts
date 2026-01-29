// src/modules/auth/otp/otpService.ts
import { post } from '../../../services/api';

interface OTPResponse {
  isSuccess: boolean;
  code: string;
  message?: string;
  data?: {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string | null;
      mobileNo: string;
      profileImage: string | null;
      roles: Array<{
        id: number;
        name: string;
        permissions: Record<string, string[]>;
      }>;
    };
    tokens: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  };
  errorStack?: string;
}

interface ResendOtpResponse {
  isSuccess: boolean;
  code: string;
  data?: {
    otp?: string | null;
  };
}

export const verifyOtp = async (mobileNo: string, otp: string): Promise<OTPResponse> => {
  const response = await post<OTPResponse>('/auth/verify-pin', { mobileNo, pin: otp });

  // Check if the response indicates failure
  if (response && !response.isSuccess) {
    const error: any = new Error(response.code || 'Failed to verify OTP');
    error.response = {
      data: {
        code: response.code,
        isSuccess: false,
        errorStack: response.errorStack,
      },
    };
    throw error;
  }

  return response as OTPResponse;
};

export const resendOtp = async (mobileNo: string): Promise<ResendOtpResponse> => {
  const response = await post<ResendOtpResponse>('/auth/resend-otp', { mobileNo });

  // Check if the response indicates failure
  if (response && !response.isSuccess) {
    const error: any = new Error(response.code || 'Failed to resend OTP');
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
