import Toast from 'react-native-toast-message';

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
} as const;

export const TOAST_MESSAGES = {
  // Auth related messages
  AUTH: {
    // Login related
    PHONE_NUMBER_REQUIRED: 'Please enter your phone number',
    PHONE_NUMBER_INVALID: 'Please enter a valid 10-digit phone number',
    TOO_MANY_ATTEMPTS: 'Too many attempts. Please try again later.',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
    INVALID_CREDENTIALS: 'Invalid mobile number or password. Please try again.',
    INVALID_MOBILE_NUMBER: 'Invalid mobile number. Please enter a valid 10-digit number.',
    INVALID_PASSWORD: 'Invalid password. Please try again.',
    PASSWORD_REQUIRED: 'Password is required',
    MOBILE_NUMBER_REQUIRED: 'Mobile number is required',
    USER_NOT_FOUND: 'User not found. Please check your mobile number.',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
    ACCOUNT_SUSPENDED: 'Your account has been suspended. Please contact support.',
    NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',

    // PIN related
    PIN_INVALID: 'Invalid PIN. Please try again',
    PIN_NOT_SET: 'PIN not set',
    OTP_REQUIRED: 'Please enter a valid PIN',
    OTP_INVALID: 'Invalid PIN. Please try again',
    OTP_EXPIRED: 'PIN has expired. Please request a new one.',
    OTP_TOKEN_REQUIRED: 'PIN token is required',
    INVALID_OTP_TOKEN: 'Invalid PIN token',
    MOBILE_NOT_REGISTERED: 'Mobile number not registered',
    WAIT_OTP_ONE_MIN: 'Wait 1 minute before requesting another PIN',
    WAIT_OTP_ONE_HOUR: 'Wait 1 hour before requesting another PIN',
    WAIT_BEFORE_RESEND_OTP: 'Please wait before resending PIN',
    UNAUTHORIZED_DEVICE: 'Unauthorized device',
    MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED: 'Multiple SMS to same number not allowed',
    OTP_RESEND_FAILED: 'Failed to resend PIN. Please try again.',
  },

  // Generic messages
  GENERIC: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  },
} as const;

export const showToast = (
  type: (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE],
  message: string,
  position: 'top' | 'bottom' = 'bottom',
  title?: string,
  subtitle?: string
) => {
  Toast.show({
    type,
    text1: title || message,
    text2: subtitle || (title ? message : undefined),
    position,
    visibilityTime: 5000,
  });
};
