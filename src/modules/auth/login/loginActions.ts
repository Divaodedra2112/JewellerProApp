import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtp, SendOtpResponse, loginApp, LoginAppRequest } from './loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setModules, setUser } from '../../../store/slices/authSlice';
import { logger } from '../../../utils/logger';

export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const response: SendOtpResponse | null = await sendOtp(phoneNumber);
      if (response && response.isSuccess) {
        return {
          phoneNumber,
          otp: response?.data?.otp || null,
        };
      } else {
        return rejectWithValue(response?.code || 'Failed to send OTP');
      }
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

export const loginAppAction = createAsyncThunk(
  'auth/loginApp',
  async (loginData: LoginAppRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginApp(loginData);
      
      const responseData = (response as any)?.data;
      const accessToken = responseData?.access_token;
      const refreshToken = responseData?.refresh_token;
      const userData = responseData?.user;

      if (!accessToken) {
        logger.error('Login Action - No access token in response', new Error('No access token'));
        return rejectWithValue('No access token received from server');
      }

      // Store tokens
      await AsyncStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }

      // Transform user data to match expected format
      if (userData) {
        const transformedUser = {
          id: parseInt(userData.id) || 0,
          name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          mobile: userData.mobileNumber || '',
          email: userData.email || '',
          photo: undefined,
          roles: userData.role ? [{
            id: parseInt(userData.role.id) || 0,
            name: userData.role.name || '',
            permissions: {} as Record<string, string[]>,
            roleType: userData.role.isSuperAdmin ? 'SUPER_ADMIN' : 'USER',
          }] : [],
          permissions: {} as Record<string, string[]>,
        };
        
        dispatch(setUser(transformedUser));
      }

      return {
        userId: userData?.id ? parseInt(userData.id) : 0,
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        user: userData ? {
          id: parseInt(userData.id) || 0,
          name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          mobile: userData.mobileNumber || '',
          email: userData.email || '',
          photo: undefined,
          roles: userData.role ? [{
            id: parseInt(userData.role.id) || 0,
            name: userData.role.name || '',
            permissions: {} as Record<string, string[]>,
            roleType: userData.role.isSuperAdmin ? 'SUPER_ADMIN' : 'USER',
          }] : [],
          permissions: {} as Record<string, string[]>,
        } : null,
      };
    } catch (error: any) {
      // Check if it's a network error
      const isNetworkError = (error as any)?.isNetworkError || error?.code === 'ERR_NETWORK' || error?.message === 'Network Error';
      
      if (isNetworkError) {
        logger.error('Login Action - Network Error', error as Error);
        return rejectWithValue('Network Error');
      }
      
      const errorCode = error?.response?.data?.code || error?.response?.data?.message || error?.message || 'LOGIN_FAILED';
      return rejectWithValue(errorCode);
    }
  }
);
