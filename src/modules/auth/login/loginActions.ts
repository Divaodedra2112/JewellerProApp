import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtp, verifyOtp, SendOtpResponse, loginApp, LoginAppRequest } from './loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setModules, setUser } from '../../../store/slices/authSlice';

interface VerifyOtpParams {
  phoneNumber: string;
  otp: string;
}

export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      // ===== MOCK DATA FOR TESTING (Backend not ready) =====
      // Hardcoded phone number: 9999999999
      if (phoneNumber === '9999999999') {
        // Simulate successful OTP request
        // Return phoneNumber as string to match authSlice expectation
        return phoneNumber;
      } else {
        // For other numbers, reject
        return rejectWithValue('MOBILE_NOT_FOUND');
      }

      // ===== ORIGINAL BACKEND CODE (COMMENTED OUT) =====
      // const response: SendOtpResponse | null = await sendOtp(phoneNumber);
      // // Check if response is successful
      // if (response && response.isSuccess) {
      //   return {
      //     phoneNumber,
      //     otp: response?.data?.otp || null,
      //   };
      // } else {
      //   // If response exists but isSuccess is false
      //   return rejectWithValue(response?.code || 'Failed to send OTP');
      // }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.code ||
          error.response?.data?.message ||
          error.message ||
          'Failed to send OTP'
      );
    }
  }
);

export const submitOtp = createAsyncThunk(
  'auth/submitOtp',
  async ({ phoneNumber, otp }: VerifyOtpParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifyOtp(phoneNumber, otp);
      const { token, modules } = response;

      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      // Set the modules in Redux
      dispatch(
        setModules(modules || ['home', 'products', 'customers', 'profile', 'settings', 'help'])
      );

      return token;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.code || error?.message || 'Failed to login';
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginAppAction = createAsyncThunk(
  'auth/loginApp',
  async (loginData: LoginAppRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginApp(loginData);
      
      // Extract token and user data from response
      const token = response?.data?.token || response?.token;
      const refreshToken = response?.data?.refreshToken || response?.refreshToken;
      const user = response?.data?.user || response?.user;
      const modules = response?.data?.modules || response?.modules;

      if (!token) {
        return rejectWithValue('No token received from server');
      }

      // Store tokens
      await AsyncStorage.setItem('access_token', token);
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }

      // Set user and modules in Redux
      if (user) {
        dispatch(setUser(user));
      }
      if (modules) {
        dispatch(setModules(modules));
      }

      return {
        userId: user?.id || 0,
        accessToken: token,
        refreshToken: refreshToken || '',
        user: user || null,
      };
    } catch (error: any) {
      const errorCode = error?.response?.data?.code || error?.response?.data?.message || error?.message || 'LOGIN_FAILED';
      return rejectWithValue(errorCode);
    }
  }
);
