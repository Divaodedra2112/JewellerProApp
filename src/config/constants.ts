import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { API_BASE_URL, API_TIMEOUT } from './envConfig';

// Export API_URL as alias for API_BASE_URL for backward compatibility
export const API_URL = API_BASE_URL;
export { API_TIMEOUT };

export const API_VERSION = 'v1';

export const getApiHeaders = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  const platform = Platform.OS; // 'ios' or 'android'
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-client-info': JSON.stringify({
      bundleId: DeviceInfo.getBundleId(),
      platform,
      // ...add other dynamic info if needed
    }),
    'x-current-device-id': deviceId,
  };
};

export let isRefreshing = false;
export let failedQueue: any[] = [];

export const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const refreshApi = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: API_TIMEOUT,
});

// Add an interceptor to set headers dynamically for each request
refreshApi.interceptors.request.use(async config => {
  const deviceId = await DeviceInfo.getUniqueId();
  const platform = Platform.OS;
  config.headers['x-client-info'] = JSON.stringify({
    bundleId: DeviceInfo.getBundleId(),
    platform,
  });
  config.headers['x-current-device-id'] = deviceId;
  return config;
});

export function setIsRefreshing(value: boolean) {
  isRefreshing = value;
}

export function setFailedQueue(item: any) {
  failedQueue.push(item);
}
