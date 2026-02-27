import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requestOtp, loginAppAction, logoutAppAction } from '../../modules/auth/login/loginActions';
import { submitOtp } from '../../modules/auth/otp/otpActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  phoneNumber: string;
  token: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  modules: string[];
  user: {
    id?: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    photo?: string;
    roles?: Array<{
      id: number;
      name: string;
      permissions: Record<string, string[]>;
      roleType: string;
    }>;
    permissions?: Record<string, string[]>;
    company?: Array<{
      id: number;
      name: string;
      country: string;
      state: string;
      city: string;
      pinCode: string;
      address_line1: string;
      address_line2: string;
    }>;
  } | null;
  initializing: boolean;
}

// Generic default modules for boilerplate
// TODO: Update with your app's modules
const defaultModules = [
  'Home',
  'Notification',
  'Profile',
];

const initialState: AuthState = {
  phoneNumber: '',
  token: null,
  loading: false,
  error: null,
  otpSent: false,
  modules: defaultModules,
  user: null,
  initializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      // Clear state
      state.token = null;
      state.phoneNumber = '';
      state.otpSent = false;
      state.loading = false;
      state.error = null;
      state.user = null;
      state.modules = defaultModules;

      // Clear storage
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('refresh_token');
    },
    restoreToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.initializing = false;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    setModules: (state, action: PayloadAction<string[]>) => {
      state.modules = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action: PayloadAction<{ phoneNumber: string; otp?: string | null }>) => {
        state.loading = false;
        state.otpSent = true;
        state.phoneNumber = action.payload?.phoneNumber ?? '';
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submitOtp.fulfilled,
        (
          state,
          action: PayloadAction<{
            userId: number;
            accessToken: string;
            refreshToken: string;
            user: {
              id: number;
              name: string;
              firstName: string;
              lastName: string;
              mobile: string;
              email: string;
              photo: string;
              roles: Array<{
                id: number;
                name: string;
                permissions: Record<string, string[]>;
              }>;
              permissions: Record<string, string[]>;
            };
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          if (!action.payload.accessToken) {
            state.error = 'No token received from server';
          }
        }
      )
      .addCase(submitOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAppAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAppAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            userId: number;
            accessToken: string;
            refreshToken: string;
            user: {
              id: number;
              name: string;
              firstName: string;
              lastName: string;
              mobile: string;
              email: string;
              photo?: string;
              roles?: Array<{
                id: number;
                name: string;
                permissions: Record<string, string[]>;
              }>;
              permissions?: Record<string, string[]>;
            } | null;
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.phoneNumber = action.payload.user?.mobile || '';
          if (!action.payload.accessToken) {
            state.error = 'No token received from server';
          }
        }
      )
      .addCase(loginAppAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAppAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAppAction.fulfilled, state => {
        state.loading = false;
        // Clear state
        state.token = null;
        state.phoneNumber = '';
        state.otpSent = false;
        state.error = null;
        state.user = null;
        state.modules = defaultModules;
        
        // Clear storage
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('refresh_token');
      })
      .addCase(logoutAppAction.rejected, (state, action) => {
        state.loading = false;
        // Even on error, clear state
        state.token = null;
        state.phoneNumber = '';
        state.otpSent = false;
        state.error = null;
        state.user = null;
        state.modules = defaultModules;
        
        // Clear storage
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('refresh_token');
      });
  },
});

export const { logout, restoreToken, setInitializing, setModules, setUser } = authSlice.actions;
export default authSlice.reducer;

export type GenericParamList = {
  [key: string]: undefined;
};
