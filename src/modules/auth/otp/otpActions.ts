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
      // ===== MOCK DATA FOR TESTING (Backend not ready) =====
      // Hardcoded: phone number 9999999999, PIN 1234
      if (phoneNumber === '9999999999' && otp === '1234') {
        // Simulate successful login with mock data
        const mockAccessToken = 'mock_access_token_' + Date.now();
        const mockRefreshToken = 'mock_refresh_token_' + Date.now();
        
        // Store tokens
        await AsyncStorage.setItem('access_token', mockAccessToken);
        await AsyncStorage.setItem('refresh_token', mockRefreshToken);
        console.log('[RBAC][Login] Mock tokens stored: access & refresh');

        // Return mock user data
        const payload = {
          userId: 1,
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken,
          user: {
            id: 1,
            name: 'Test User',
            firstName: 'Test',
            lastName: 'User',
            mobile: '9999999999',
            email: 'test@example.com',
            photo: null,
            roles: [
              {
                id: 1,
                name: 'Admin',
                permissions: {
                  '*': ['*'], // Full access for testing
                },
              },
            ],
            permissions: {
              '*': ['*'], // Full access for testing
            },
          },
        };

        // Fetch permission catalog and compute effective permissions
        try {
          console.log('[RBAC][Permissions] Ensuring catalog is loaded...');
          const catalog = await dispatch(fetchPermissionCatalog()).unwrap();
          console.log(
            '[RBAC][Permissions] Catalog ready. Modules:',
            Array.isArray(catalog) ? catalog.map((c: any) => c.key) : 'N/A'
          );

          console.log(
            '[RBAC][Permissions] Building effective permissions from user.roles[0].permissions ...'
          );
          const effective = buildEffectivePermissions(payload.user.permissions || {}, catalog);
          dispatch(setEffectivePermissions(effective));
          console.log(
            '[RBAC][Permissions] Effective permissions built:',
            Object.fromEntries(Object.entries(effective).map(([k, v]) => [k, v]))
          );
        } catch (e) {
          console.error('[RBAC][Permissions] Setup failed:', e);
        }

        return payload;
      } else {
        // Invalid PIN or phone number
        return rejectWithValue('PIN_INVALID');
      }

      // ===== ORIGINAL BACKEND CODE (COMMENTED OUT) =====
      // const response = await verifyOtp(phoneNumber, otp);
      // console.log('[RBAC][Login] PIN verify response received');
      // console.log('[RBAC][Login] user.id:', response?.data?.user?.id);
      // console.log(
      //   '[RBAC][Login] roles:',
      //   response?.data?.user?.roles?.map((r: any) => r?.name)
      // );
      // // Check if response has the expected structure
      // if (!response.data?.user || !response.data?.tokens) {
      //   throw new Error('Invalid response structure');
      // }
      // const { access, refresh } = response.data.tokens;
      // const userData = response.data.user;
      // if (!access?.token || !refresh?.token) {
      //   throw new Error('No tokens received from API');
      // }
      // // Store tokens
      // await AsyncStorage.setItem('access_token', access.token);
      // await AsyncStorage.setItem('refresh_token', refresh.token);
      // console.log('[RBAC][Login] Tokens stored: access & refresh');
      // // Return user data
      // const payload = {
      //   userId: userData.id,
      //   accessToken: access.token,
      //   refreshToken: refresh.token,
      //   user: {
      //     id: userData.id,
      //     name: `${userData.firstName} ${userData.lastName}`,
      //     firstName: userData.firstName,
      //     lastName: userData.lastName,
      //     mobile: userData.mobileNo,
      //     email: userData.email,
      //     photo: userData.profileImage,
      //     roles: userData.roles,
      //     permissions: userData.roles[0]?.permissions || {},
      //   },
      // };
      // // Fetch permission catalog and compute effective permissions
      // try {
      //   console.log('[RBAC][Permissions] Ensuring catalog is loaded...');
      //   const catalog = await dispatch(fetchPermissionCatalog()).unwrap();
      //   console.log(
      //     '[RBAC][Permissions] Catalog ready. Modules:',
      //     Array.isArray(catalog) ? catalog.map((c: any) => c.key) : 'N/A'
      //   );
      //   console.log(
      //     '[RBAC][Permissions] Building effective permissions from user.roles[0].permissions ...'
      //   );
      //   const effective = buildEffectivePermissions(payload.user.permissions || {}, catalog);
      //   dispatch(setEffectivePermissions(effective));
      //   console.log(
      //     '[RBAC][Permissions] Effective permissions built:',
      //     Object.fromEntries(Object.entries(effective).map(([k, v]) => [k, v]))
      //   );
      // } catch (e) {
      //   console.error('[RBAC][Permissions] Setup failed:', e);
      // }
      // return payload;
    } catch (error: any) {
      console.error('[PIN] Verification error:', error);
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
      // ===== MOCK DATA FOR TESTING (Backend not ready) =====
      // Hardcoded phone number: 9999999999
      if (phoneNumber === '9999999999') {
        // Simulate successful resend
        return {
          phoneNumber,
          otp: null, // PIN is 1234 (hardcoded)
        };
      } else {
        return rejectWithValue('MOBILE_NOT_FOUND');
      }

      // ===== ORIGINAL BACKEND CODE (COMMENTED OUT) =====
      // const response = await resendOtp(phoneNumber);
      // return {
      //   phoneNumber,
      //   otp: response?.data?.otp || null, // API response key is still 'otp'
      // };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.code || error?.message || 'Failed to resend PIN';
      return rejectWithValue(errorMessage);
    }
  }
);
