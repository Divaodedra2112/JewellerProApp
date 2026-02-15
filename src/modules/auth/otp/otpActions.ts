// src/modules/auth/otp/otpActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPermissionCatalog,
  setEffectivePermissions,
  buildEffectivePermissions,
} from '../../../rbac';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOtp, resendOtp } from './otpService';

interface OTPResponse {
  code: string;
  isSuccess: boolean;
  message: string;
  data: {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      profileImage: string;
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
}

// Submit PIN (API parameter name is still 'otp')
export const submitOtp = createAsyncThunk(
  'auth/submitOtp',
  async (
    { phoneNumber, otp }: { phoneNumber: string; otp: string },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const response = await verifyOtp(phoneNumber, otp);
      
      if (!response.data?.user || !response.data?.tokens) {
        throw new Error('Invalid response structure');
      }
      
      const { access, refresh } = response.data.tokens;
      const userData = response.data.user;
      
      if (!access?.token || !refresh?.token) {
        throw new Error('No tokens received from API');
      }
      
      // Store tokens
      await AsyncStorage.setItem('access_token', access.token);
      await AsyncStorage.setItem('refresh_token', refresh.token);
      
      // Return user data
      const payload = {
        userId: userData.id,
        accessToken: access.token,
        refreshToken: refresh.token,
        user: {
          id: userData.id,
          name: `${userData.firstName} ${userData.lastName}`,
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobileNo,
          email: userData.email,
          photo: userData.profileImage,
          roles: userData.roles,
          permissions: userData.roles[0]?.permissions || {},
        },
      };
      
      // Fetch permission catalog and compute effective permissions
      try {
        const catalog = await dispatch(fetchPermissionCatalog()).unwrap();
        const effective = buildEffectivePermissions(payload.user.permissions || {}, catalog);
        dispatch(setEffectivePermissions(effective));
      } catch (e) {
        // Permission setup failed, but continue with login
      }
      
      return payload;

    } catch (error: any) {
      const errorMessage = error?.response?.data?.code || error?.message || 'Failed to verify PIN';
      return rejectWithValue(errorMessage);
    }
  }
);

// Resend PIN (API endpoint still uses 'otp' key)
export const resendOTP = createAsyncThunk(
  'auth/resendOtp',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const response = await resendOtp(phoneNumber);
      return {
        phoneNumber,
        otp: response?.data?.otp || null,
      };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.code || error?.message || 'Failed to resend PIN';
      return rejectWithValue(errorMessage);
    }
  }
);
