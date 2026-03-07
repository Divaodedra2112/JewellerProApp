import { Platform, Alert, Linking, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, Permission, PermissionStatus } from 'react-native-permissions';
import { logger } from './logger';

export type PermissionStatusResult = {
  status: PermissionStatus;
  blocked: boolean;
};

// --- Android: use PermissionsAndroid to avoid E_INVALID_ACTIVITY from react-native-permissions ---
const ANDROID_CAMERA = PermissionsAndroid.PERMISSIONS.CAMERA;

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(ANDROID_CAMERA, {
        title: 'Camera Permission',
        message: 'This app needs camera access to take your profile photo.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const isGranted =
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        (typeof granted === 'object' && granted[ANDROID_CAMERA] === PermissionsAndroid.RESULTS.GRANTED);
      return !!isGranted;
    } catch (error) {
      logger.error('Error requesting camera permission (Android)', error as Error);
      return false;
    }
  }
  try {
    const permission = PERMISSIONS.IOS.CAMERA as Permission;
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    logger.error('Error requesting camera permission (iOS)', error as Error);
    return false;
  }
};

export const checkCameraPermissionStatus = async (): Promise<PermissionStatusResult> => {
  if (Platform.OS === 'android') {
    try {
      const result = await PermissionsAndroid.check(ANDROID_CAMERA);
      return {
        status: result ? RESULTS.GRANTED : RESULTS.DENIED,
        blocked: false,
      };
    } catch (error) {
      logger.error('Error checking camera permission (Android)', error as Error);
      return { status: RESULTS.DENIED, blocked: false };
    }
  }
  try {
    const permission = PERMISSIONS.IOS.CAMERA as Permission;
    const result = await check(permission);
    return {
      status: result,
      blocked: result === RESULTS.BLOCKED,
    };
  } catch (error) {
    logger.error('Error checking camera permission (iOS)', error as Error);
    return { status: RESULTS.DENIED, blocked: false };
  }
};

// Storage Permissions (for gallery / saving cropped image)
const getAndroidStoragePermission = () =>
  Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const permission = getAndroidStoragePermission();
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Photo Access',
        message: 'This app needs access to save your profile photo.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const isGranted =
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        (typeof granted === 'object' && granted[permission] === PermissionsAndroid.RESULTS.GRANTED);
      return !!isGranted;
    } catch (error) {
      logger.error('Error requesting storage permission (Android)', error as Error);
      return false;
    }
  }
  try {
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY as Permission;
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    logger.error('Error requesting storage permission (iOS)', error as Error);
    return false;
  }
};

export const checkStoragePermissionStatus = async (): Promise<PermissionStatusResult> => {
  if (Platform.OS === 'android') {
    try {
      const permission = getAndroidStoragePermission();
      const result = await PermissionsAndroid.check(permission);
      return {
        status: result ? RESULTS.GRANTED : RESULTS.DENIED,
        blocked: false,
      };
    } catch (error) {
      logger.error('Error checking storage permission (Android)', error as Error);
      return { status: RESULTS.DENIED, blocked: false };
    }
  }
  try {
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY as Permission;
    const result = await check(permission);
    return {
      status: result,
      blocked: result === RESULTS.BLOCKED,
    };
  } catch (error) {
    logger.error('Error checking storage permission (iOS)', error as Error);
    return { status: RESULTS.DENIED, blocked: false };
  }
};

// Notification Permissions
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.NOTIFICATIONS,
      android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    }) as Permission;

    if (!permission) return false;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    logger.error('Error requesting notification permission', error as Error);
    return false;
  }
};

export const checkNotificationPermissionStatus = async (): Promise<PermissionStatusResult> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.NOTIFICATIONS,
      android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    }) as Permission;

    if (!permission) {
      return { status: RESULTS.DENIED, blocked: false };
    }

    const result = await check(permission);
    return {
      status: result,
      blocked: result === RESULTS.BLOCKED,
    };
  } catch (error) {
    logger.error('Error checking notification permission', error as Error);
    return { status: RESULTS.DENIED, blocked: false };
  }
};

// Open App Settings
export const openAppSettings = async (): Promise<void> => {
  try {
    await Linking.openSettings();
  } catch (error) {
    logger.error('Error opening app settings', error as Error);
  }
};

// Show Permission Denied Alert
export const showPermissionDeniedAlert = (
  permissionType: 'camera' | 'storage' | 'notification',
  onOpenSettings?: () => void
): void => {
  const messages = {
    camera: {
      title: 'Camera Permission Required',
      message: 'Camera permission is required to take photos. Please enable it in your device settings.',
    },
    storage: {
      title: 'Storage Permission Required',
      message: 'Storage permission is required to access your gallery. Please enable it in your device settings.',
    },
    notification: {
      title: 'Notification Permission Required',
      message: 'Notification permission is required to receive updates. Please enable it in your device settings.',
    },
  };

  const { title, message } = messages[permissionType];

  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => {
          if (onOpenSettings) {
            onOpenSettings();
          } else {
            openAppSettings();
          }
        },
      },
    ]
  );
};

