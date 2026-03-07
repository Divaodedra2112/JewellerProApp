import Toast from 'react-native-toast-message';

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
} as const;

export const TOAST_MESSAGES = {
  // Auth – validation (client-side)
  AUTH: {
    PHONE_NUMBER_REQUIRED: 'Please enter your phone number',
    PHONE_NUMBER_INVALID: 'Please enter a valid 10-digit phone number',
    MOBILE_NUMBER_REQUIRED: 'Mobile number is required',
    INVALID_MOBILE_NUMBER: 'Invalid mobile number. Please enter a valid 10-digit number.',
    NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',

    // API error codes (auth flow guide)
    AUTH_INVALID_CRED: 'Only member or super admin accounts can sign in through the app.',
    AUTH_ALREADY_LOGGED_IN: 'You are already logged in on another device. Please logout from that device first.',
    INVALID_OTP: 'Incorrect Code! Please try again!',
    OTP_MAX_ATTEMPTS: 'Maximum OTP attempts exceeded. Please request a new OTP.',
    OTP_RATE_LIMIT: 'Please wait before requesting another OTP.',
    OTP_MAX_REQUESTS_TRY_AFTER: 'Maximum OTP requests reached. Try again later.',
    INVALID_OR_EXPIRED_TOKEN: 'Your session has expired. Please login again.',

    // Legacy / alternate codes
    MOBILE_NOT_REGISTERED: 'Mobile number not registered',
    WAIT_OTP_ONE_MIN: 'Please wait 30 seconds before requesting another OTP.',
    WAIT_OTP_ONE_HOUR: 'Wait 1 hour before requesting another OTP.',
    WAIT_BEFORE_RESEND_OTP: 'Please wait before resending OTP.',
    OTP_RESEND_FAILED: 'Failed to resend OTP. Please try again.',
    OTP_EXPIRED: 'OTP has expired. Please request a new one.',
    PIN_INVALID: 'Incorrect Code! Please try again!',
    OTP_REQUIRED: 'Please enter the 4-digit code.',
  },

  GENERIC: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  },

  // SubCategory & Topic (app content)
  SUBCATEGORY: {
    FETCH_FAILED: 'Failed to load subcategories. Please try again.',
  },
  TOPIC: {
    FETCH_FAILED: 'Failed to load topic. Please try again.',
  },

  // Profile (GET /app/profile, PATCH /app/profile)
  PROFILE: {
    FETCH_FAILED: 'Failed to load profile. Please try again.',
    UPDATE_SUCCESS: 'Profile updated successfully.',
    UPDATE_FAILED: 'Failed to update profile. Please try again.',
    VALIDATION_ONE_NAME_REQUIRED: 'Please enter at least first name or last name.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
  },
} as const;

/**
 * Get user-facing error message from API/axios error.
 * Prefers server message, then network error, then generic fallback.
 */
export function getApiErrorMessage(error: any, fallback?: string): string {
  const generic = fallback || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
  if (!error) return generic;
  const isNetworkError =
    (error as any)?.isNetworkError ||
    !error?.response ||
    error?.code === 'ERR_NETWORK' ||
    error?.code === 'ECONNABORTED' ||
    error?.message === 'Network Error';
  if (isNetworkError) return TOAST_MESSAGES.GENERIC.NETWORK_ERROR;
  const serverMessage =
    error?.response?.data?.message ||
    (typeof error?.response?.data?.error === 'string' ? error.response.data.error : null);
  if (serverMessage && String(serverMessage).trim()) return String(serverMessage).trim();
  if (error?.message && String(error.message).trim()) return String(error.message).trim();
  return generic;
}

/** Get user-facing message for auth API error code. Prefer serverMessage when provided. */
export function getAuthErrorMessage(
  code: string,
  serverMessage?: string
): string {
  if (serverMessage && serverMessage.trim()) {
    return serverMessage.trim();
  }
  const map: Record<string, string> = {
    AUTH_INVALID_CRED: TOAST_MESSAGES.AUTH.AUTH_INVALID_CRED,
    INVALID_OTP: TOAST_MESSAGES.AUTH.INVALID_OTP,
    OTP_MAX_ATTEMPTS: TOAST_MESSAGES.AUTH.OTP_MAX_ATTEMPTS,
    OTP_RATE_LIMIT: TOAST_MESSAGES.AUTH.OTP_RATE_LIMIT,
    OTP_MAX_REQUESTS_TRY_AFTER: TOAST_MESSAGES.AUTH.OTP_MAX_REQUESTS_TRY_AFTER,
    INVALID_OR_EXPIRED_TOKEN: TOAST_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN,
    MOBILE_NOT_FOUND: TOAST_MESSAGES.AUTH.MOBILE_NOT_REGISTERED,
    MOBILE_NOT_REGISTERED: TOAST_MESSAGES.AUTH.MOBILE_NOT_REGISTERED,
  };
  return map[code] || serverMessage || code || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
}

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
