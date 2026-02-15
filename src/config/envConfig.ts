/**
 * Environment Configuration
 * 
 * TODO: Replace with your API URLs
 * You can use environment variables or hardcode based on your needs
 */
import { Platform } from 'react-native';
import { logger } from '../utils/logger';

// API Configuration
// For Android Emulator: Use 10.0.2.2 (maps to host machine's localhost)
// For iOS Simulator: Use localhost (works directly)
// For Physical Devices: Replace with your machine's IP address (e.g., 'http://192.168.1.100:7878')
// To find your IP: Mac: System Settings → Network → Wi-Fi → IP address
//                   Or run: ipconfig getifaddr en0
const getDevelopmentApiUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator uses 10.0.2.2 to access host machine's localhost
    return 'http://10.0.2.2:7878';
  } else {
    // iOS simulator can use localhost
    return 'http://localhost:7878';
  }
};

export const API_BASE_URL = __DEV__
  ? getDevelopmentApiUrl() // Development API - auto-detects platform
  : 'https://api.example.com'; // Production API - TODO: Replace with actual production URL

export const API_TIMEOUT = 30000; // 30 seconds

// App Configuration
export const APP_NAME = 'ReactNativeBoilerplate';
export const APP_VERSION = '1.0.0';

// Feature Flags
export const ENABLE_LOGGING = __DEV__;
export const ENABLE_ANALYTICS = !__DEV__;

// Environment
export const ENVIRONMENT = __DEV__ ? 'development' : 'production';

// Log configuration in development
if (__DEV__) {
  logger.debug('EnvConfig - Configuration loaded', {
    API_BASE_URL,
    ENVIRONMENT,
    ENABLE_LOGGING,
  });
}
