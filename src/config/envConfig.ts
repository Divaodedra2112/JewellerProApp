/**
 * Environment Configuration
 * 
 * TODO: Replace with your API URLs
 * You can use environment variables or hardcode based on your needs
 */
import { logger } from '../utils/logger';

// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:7878' // Development API
  : 'https://api.example.com'; // Production API

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
  logger.debug('EnvConfig - Configuration loaded', undefined, {
    API_BASE_URL,
    ENVIRONMENT,
    ENABLE_LOGGING,
  });
}
