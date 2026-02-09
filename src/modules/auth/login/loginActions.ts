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
      
      // Log the response for debugging
      console.log('[Login] Full response:', JSON.stringify(response, null, 2));
      
      // Extract token and user data from response
      // The API returns { status: 200, data: { access_token, refresh_token, user, ... } }
      // The post function returns response.data from axios, so response is { status: 200, data: {...} }
      // We need to access response.data.access_token
      const responseData = (response as any)?.data;
      const accessToken = responseData?.access_token;
      const refreshToken = responseData?.refresh_token;
      const userData = responseData?.user;

      console.log('[Login] Response data:', JSON.stringify(responseData, null, 2));
      console.log('[Login] Access token path check:');
      console.log('  - response?.data:', (response as any)?.data);
      console.log('  - response?.data?.access_token:', (response as any)?.data?.access_token);
      console.log('[Login] Extracted accessToken:', accessToken ? `Found: ${accessToken.substring(0, 20)}...` : 'Not found');
      console.log('[Login] Extracted refreshToken:', refreshToken ? 'Found' : 'Not found');
      console.log('[Login] Extracted userData:', userData ? 'Found' : 'Not found');

      if (!accessToken) {
        console.error('[Login] No access token found in response:', response);
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
      const errorCode = error?.response?.data?.code || error?.response?.data?.message || error?.message || 'LOGIN_FAILED';
      return rejectWithValue(errorCode);
    }
  }
);
