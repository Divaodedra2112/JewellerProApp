import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtp, SendOtpResponse, loginApp, LoginAppRequest, logoutApp } from './loginService';
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
      logger.info('Login Action - Starting login attempt', {
        mobileNumber: loginData.mobileNumber,
        hasPassword: !!loginData.password,
      });

      const response = await loginApp(loginData);
      
      logger.debug('Login Action - API response received', {
        hasResponse: !!response,
        responseKeys: response ? Object.keys(response) : [],
        fullResponse: response ? JSON.stringify(response, null, 2) : 'null',
      });
      
      // Try multiple possible response structures
      const responseData = (response as any)?.data || response;
      const accessToken = responseData?.access_token || (response as any)?.access_token || (response as any)?.token;
      const refreshToken = responseData?.refresh_token || (response as any)?.refresh_token || (response as any)?.refreshToken;
      const userData = responseData?.user || (response as any)?.user;

      logger.debug('Login Action - Response data parsed', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        hasUserData: !!userData,
        userId: userData?.id,
      });

      if (!accessToken) {
        logger.error('Login Action - No access token in response', new Error('No access token'), {
          responseData: responseData ? JSON.stringify(responseData) : 'null',
        });
        return rejectWithValue('No access token received from server');
      }

      // Store tokens
      await AsyncStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }

      logger.info('Login Action - Tokens stored successfully');

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
        logger.info('Login Action - User data set successfully', {
          userId: transformedUser.id,
          name: transformedUser.name,
          email: transformedUser.email,
        });
      }

      const loginResult = {
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

      logger.info('Login Action - Login successful', {
        userId: loginResult.userId,
        hasUser: !!loginResult.user,
      });

      return loginResult;
    } catch (error: any) {
      // Check if it's a network error
      const isNetworkError = (error as any)?.isNetworkError || error?.code === 'ERR_NETWORK' || error?.message === 'Network Error';
      
      if (isNetworkError) {
        logger.error('Login Action - Network Error', error as Error, {
          errorCode: error?.code,
          errorMessage: error?.message,
          isNetworkError: true,
        });
        return rejectWithValue('Network Error');
      }
      
      const errorCode = error?.response?.data?.code || error?.response?.data?.message || error?.message || 'LOGIN_FAILED';
      const errorDetails = {
        errorCode,
        statusCode: error?.response?.status,
        statusText: error?.response?.statusText,
        responseData: error?.response?.data ? JSON.stringify(error?.response?.data) : 'null',
        errorMessage: error?.message,
        errorStack: error?.stack,
      };

      logger.error('Login Action - Login failed', error as Error, errorDetails);
      return rejectWithValue(errorCode);
    }
  }
);

export const logoutAppAction = createAsyncThunk(
  'auth/logoutApp',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      
      if (!accessToken) {
        logger.warn('Logout Action - No access token found');
        return { success: true };
      }

      const response = await logoutApp(accessToken);
      
      if (response && response.isSuccess) {
        logger.info('Logout Action - Logout successful');
        return { success: true };
      } else {
        const errorCode = response?.code || response?.message || 'LOGOUT_FAILED';
        logger.error('Logout Action - Logout failed', new Error(errorCode));
        return rejectWithValue(errorCode);
      }
    } catch (error: any) {
      // Check if it's a network error
      const isNetworkError = (error as any)?.isNetworkError || error?.code === 'ERR_NETWORK' || error?.message === 'Network Error';
      
      if (isNetworkError) {
        logger.error('Logout Action - Network Error', error as Error);
        // Even on network error, we should still clear local state
        return { success: true };
      }
      
      const errorCode = error?.response?.data?.code || error?.response?.data?.message || error?.message || 'LOGOUT_FAILED';
      logger.error('Logout Action - Error', error as Error);
      // Even on error, we should still clear local state
      return { success: true };
    }
  }
);
