import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyLoginOtp, sendLoginOtp } from '../authApi';

/** Verify OTP – OTP (Sign in). POST /auth/verify-login-otp */
export const submitOtp = createAsyncThunk(
  'auth/submitOtp',
  async (
    payload: { countryCode: string; mobileNumber: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await verifyLoginOtp({
        countryCode: payload.countryCode,
        mobileNumber: payload.mobileNumber,
        otp: payload.otp,
      });
      const { access_token, refresh_token, user } = response;
      await AsyncStorage.setItem('access_token', access_token);
      if (refresh_token) {
        await AsyncStorage.setItem('refresh_token', refresh_token);
      }
      const u = user;
      const appUser = {
        id: parseInt(u.id, 10) || 0,
        name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email || '',
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        mobile: u.mobileNumber || '',
        email: u.email || '',
        photo: undefined,
        roles: u.role ? [{ id: 0, name: u.role.name || '', permissions: {} }] : [],
        permissions: {},
      };
      return {
        userId: appUser.id,
        accessToken: access_token,
        refreshToken: refresh_token || '',
        user: appUser,
      };
    } catch (error: any) {
      const code = error?.response?.data?.code || error?.message || 'VERIFY_FAILED';
      const message = error?.response?.data?.message;
      return rejectWithValue({ code, message });
    }
  }
);

/** Resend OTP – same as send. POST /auth/send-login-otp */
export const resendOTP = createAsyncThunk(
  'auth/resendOtp',
  async (
    payload: { countryCode: string; mobileNumber: string },
    { rejectWithValue }
  ) => {
    try {
      await sendLoginOtp({
        countryCode: payload.countryCode,
        mobileNumber: payload.mobileNumber,
      });
      return {
        phoneNumber: payload.mobileNumber,
        countryCode: payload.countryCode,
      };
    } catch (error: any) {
      const code = error?.response?.data?.code || error?.message || 'RESEND_FAILED';
      const message = error?.response?.data?.message;
      return rejectWithValue({ code, message });
    }
  }
);
