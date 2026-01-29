import { Platform } from 'react-native';
import { version } from '../../../../package.json';
import { compare } from 'compare-versions';
import { showToast, TOAST_TYPE } from '../../../utils/toast';
import { get } from '../../../services/api';
import DeviceInfo from 'react-native-device-info';

export interface VersionCheckResponse {
  isSuccess: boolean;
  message: string;
  data: {
    iosVersion: string;
    androidVersion: string;
    forceUpdate: boolean;
  };
}

export const checkVersionApi = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();

    const clientInfo = {
      platform: Platform.OS,
      hardware: Platform.OS,
      product: 'react-native-boilerplate',
      softwareName: Platform.OS,
      softwareVersion: version,
      version: version,
      buildNumber: '1',
    };

    const headers = {
      'x-current-device-id': deviceId,
      'x-client-info': JSON.stringify(clientInfo),
    };

    const response = await get<VersionCheckResponse>('/version/check-version', {
      headers,
    });

    if (!response?.isSuccess || !response?.data) {
      console.error('Version check failed:', response?.message);
      showToast(TOAST_TYPE.ERROR, response?.message || 'Version check failed');
      throw new Error(response?.message || 'Version check failed');
    }

    const currentVersion =
      Platform.OS === 'ios' ? response.data.iosVersion : response.data.androidVersion;

    // Validate version strings
    if (!currentVersion) {
      return false; // If no version is available, don't force update
    }

    if (typeof currentVersion !== 'string') {
      return false;
    }

    if (typeof version !== 'string' || !version) {
      return false;
    }

    // If force update is true, always return true
    if (response.data.forceUpdate) {
      return true;
    }

    // Compare versions
    const needsUpdate = compare(currentVersion, version, '>');
    return needsUpdate;
  } catch (error: any) {
    console.error('Version check error:', error);
    const errorMessage =
      error?.response?.data?.message || error?.message || 'Failed to check version';
    showToast(TOAST_TYPE.ERROR, errorMessage);
    throw error.response?.data || error;
  }
};

export const checkAppVersion = async () => {
  try {
    const deviceId = await getDeviceId();
    const currentVersion = getCurrentVersion();

    const headers = {
      'Content-Type': 'application/json',
      'Device-Id': deviceId,
    };

    const response = await api.post('/version/check', {
      version: currentVersion,
      deviceId,
    });

    if (!response.data) {
      throw new Error('No response received from server');
    }

    return {
      needsUpdate: response.data.forceUpdate,
      currentVersion,
      appVersion: response.data.version,
    };
  } catch (error) {
    throw error;
  }
};
