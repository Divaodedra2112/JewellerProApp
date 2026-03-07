/**
 * Auth API – aligned with Jeweller Pro auth flow guide.
 * Endpoints: POST /auth/send-login-otp, POST /auth/verify-login-otp, POST /auth/logout-app, POST /auth/refresh-token.
 */

import { post } from '../../services/api';
import { logger } from '../../utils/logger';

const AUTH_SEND_OTP = '/auth/send-login-otp';
const AUTH_VERIFY_OTP = '/auth/verify-login-otp';
const AUTH_LOGOUT = '/auth/logout-app';
const AUTH_REFRESH = '/auth/refresh-token';

// --- Send OTP (Log in Continue + OTP Resend Now) ---

export interface SendLoginOtpRequest {
  countryCode: string;
  mobileNumber: string;
}

export interface SendLoginOtpSuccess {
  code: string;
  message?: string;
}

export async function sendLoginOtp(
  payload: SendLoginOtpRequest
): Promise<SendLoginOtpSuccess> {
  const body = {
    countryCode: payload.countryCode,
    mobileNumber: payload.mobileNumber,
  };
  if (__DEV__) {
    console.log('[OTP API] Send OTP – request body:', JSON.stringify(body, null, 2));
    logger.debug('Login API – Send OTP request', { endpoint: AUTH_SEND_OTP, body });
  }
  try {
    const response = await post<SendLoginOtpSuccess & { message?: string }>(AUTH_SEND_OTP, body);

    if (!response) {
      throw new Error('No response from server');
    }

    if (response.code !== 'OTP_SENT_SUCCESSFULLY') {
      const err: any = new Error(response.message || response.code || 'Failed to send OTP');
      err.response = { data: { code: response.code, message: response.message } };
      throw err;
    }

    return response;
  } catch (e: any) {
    if (e.response?.data) {
      const err: any = new Error(e.response.data.message || e.response.data.code || 'Failed to send OTP');
      err.response = { data: { code: e.response.data.code, message: e.response.data.message } };
      throw err;
    }
    throw e;
  }
}

// --- Verify OTP (OTP Sign in) ---

export interface VerifyLoginOtpRequest {
  countryCode: string;
  mobileNumber: string;
  otp: string;
}

export interface VerifyLoginOtpUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  countryCode: string;
  mobileNumber: string;
  role?: { id?: string; name?: string; [k: string]: any };
}

export interface VerifyLoginOtpSuccess {
  code: string;
  user: VerifyLoginOtpUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function verifyLoginOtp(
  payload: VerifyLoginOtpRequest
): Promise<VerifyLoginOtpSuccess> {
  const body = {
    countryCode: payload.countryCode,
    mobileNumber: payload.mobileNumber,
    otp: payload.otp,
  };
  if (__DEV__) {
    console.log('[OTP API] Verify OTP – request body:', JSON.stringify(body, null, 2));
    logger.debug('Login API – Verify OTP request', { endpoint: AUTH_VERIFY_OTP, body });
  }
  try {
    const response = await post<VerifyLoginOtpSuccess & { message?: string }>(AUTH_VERIFY_OTP, body);

    if (!response) {
      throw new Error('No response from server');
    }

    if (response.code !== 'LOGIN_SUCCESS' || !response.access_token) {
      const err: any = new Error((response as any).message || response.code || 'Verification failed');
      err.response = { data: { code: response.code, message: (response as any).message } };
      throw err;
    }

    return response;
  } catch (e: any) {
    if (e.response?.data) {
      const err: any = new Error(e.response.data.message || e.response.data.code || 'Verification failed');
      err.response = { data: { code: e.response.data.code, message: e.response.data.message } };
      throw err;
    }
    throw e;
  }
}

// --- Logout ---

export interface LogoutRequest {
  access_token: string;
}

export interface LogoutSuccess {
  code: string;
}

export async function logoutApp(accessToken: string): Promise<LogoutSuccess> {
  const response = await post<LogoutSuccess>(AUTH_LOGOUT, {
    access_token: accessToken,
  });

  if (!response) {
    return { code: 'LOGOUT_SUCCESS' };
  }

  if (response.code !== 'LOGOUT_SUCCESS') {
    const err: any = new Error((response as any).message || response.code || 'Logout failed');
    err.response = { data: { code: response.code } };
    throw err;
  }

  return response;
}

// --- Refresh token (used by api interceptor on 401) ---

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenSuccess {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  access?: { token: string; expires?: string };
  refresh?: { token: string; expires?: string };
}

export async function refreshToken(
  refreshTokenValue: string
): Promise<{ accessToken: string; refreshToken?: string }> {
  const response = await post<RefreshTokenSuccess>(AUTH_REFRESH, {
    refreshToken: refreshTokenValue,
  });

  if (!response) {
    throw new Error('No response from server');
  }

  const accessToken =
    response.access_token ?? response.access?.token;
  const newRefresh =
    response.refresh_token ?? response.refresh?.token;

  if (!accessToken) {
    throw new Error('Refresh failed: no access token');
  }

  return {
    accessToken,
    refreshToken: newRefresh,
  };
}
