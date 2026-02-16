
import { logger } from '../utils/logger';

// API Configuration
export const API_BASE_URL = 'http://3.87.123.138:8080';

export const API_TIMEOUT = 30000; // 30 seconds

// App Configuration
export const APP_NAME = 'JewellerProApp';
export const APP_VERSION = '1.0.0';

// Feature Flags
export const ENABLE_LOGGING = __DEV__;
export const ENABLE_ANALYTICS = !__DEV__;

// Log configuration in development
if (__DEV__) {
  logger.debug('EnvConfig - Configuration loaded', {
    API_BASE_URL,
    ENABLE_LOGGING,
  });
}
