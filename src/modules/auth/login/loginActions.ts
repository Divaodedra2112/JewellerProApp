import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../../store/slices/authSlice';
import { logger } from '../../../utils/logger';
import { sendLoginOtp } from '../authApi';
import { logoutApp } from '../authApi';

export const DEFAULT_COUNTRY_CODE = '91';

/** Send OTP – Log in (Continue) and OTP (Resend Now). POST /auth/send-login-otp */
export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (
    payload: { countryCode: string; mobileNumber: string },
    { rejectWithValue }
  ) => {
    try {
      await sendLoginOtp({
        countryCode: payload.countryCode || DEFAULT_COUNTRY_CODE,
        mobileNumber: payload.mobileNumber,
      });
      return {
        phoneNumber: payload.mobileNumber,
        countryCode: payload.countryCode || DEFAULT_COUNTRY_CODE,
      };
    } catch (error: any) {
      const code = error?.response?.data?.code || error?.message || 'FAILED_SEND_OTP';
      const message = error?.response?.data?.message;
      return rejectWithValue({ code, message });
    }
  }
);

export const logoutAppAction = createAsyncThunk(
  'auth/logoutApp',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (!accessToken) {
        return { success: true };
      }
      await logoutApp(accessToken);
      return { success: true };
    } catch (error: any) {
      logger.error('Logout Action - Error', error as Error);
      return { success: true };
    }
  }
);
