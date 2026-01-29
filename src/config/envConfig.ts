import DeviceInfo from 'react-native-device-info';

// TODO: Replace with your API URLs
// Environment configuration based on bundle ID
const ENV_CONFIG = {
  local: {
    API_URL: 'https://your-api-local.example.com',
  },
  dev: {
    API_URL: 'https://your-api-dev.example.com',
  },
  qa: {
    API_URL: 'https://your-api-qa.example.com',
  },
  prod: {
    API_URL: 'https://your-api-prod.example.com',
  },
};

// TODO: Update with your bundle IDs
// Bundle ID to environment mapping
const BUNDLE_ID_TO_ENV: Record<string, keyof typeof ENV_CONFIG> = {
  'com.yourapp.local': 'local',
  'com.yourapp.dev': 'dev',
  'com.yourapp.qa': 'qa',
  'com.yourapp': 'prod',
};

/**
 * Get the current environment based on bundle ID
 */
const getCurrentEnvironment = (): keyof typeof ENV_CONFIG => {
  try {
    const bundleId = DeviceInfo.getBundleId();
    const env = BUNDLE_ID_TO_ENV[bundleId];

    if (env) {
      console.log(`[EnvConfig] Detected environment: ${env} (bundleId: ${bundleId})`);
      return env;
    }

    // Fallback: try to detect from bundle ID pattern
    if (bundleId.includes('.local')) {
      console.log(`[EnvConfig] Fallback to local (bundleId: ${bundleId})`);
      return 'local';
    }
    if (bundleId.includes('.dev')) {
      console.log(`[EnvConfig] Fallback to dev (bundleId: ${bundleId})`);
      return 'dev';
    }
    if (bundleId.includes('.qa')) {
      console.log(`[EnvConfig] Fallback to qa (bundleId: ${bundleId})`);
      return 'qa';
    }

    // Default to dev for safety
    console.warn(`[EnvConfig] Unknown bundleId: ${bundleId}, defaulting to dev`);
    return 'dev';
  } catch (error) {
    console.error('[EnvConfig] Error detecting environment:', error);
    return 'dev'; // Default to dev for safety
  }
};

// Get current environment
const currentEnv = getCurrentEnvironment();
const config = ENV_CONFIG[currentEnv];

// Export environment variables
export const API_URL = config.API_URL;
export const ENVIRONMENT = currentEnv;

// Log configuration on load
console.log('[EnvConfig] Loaded configuration:', {
  environment: currentEnv,
  API_URL,
});
