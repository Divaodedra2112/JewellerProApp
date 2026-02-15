import { Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, Permission, PermissionStatus } from 'react-native-permissions';

export type PermissionStatusResult = {
  status: PermissionStatus;
  blocked: boolean;
};

// Camera Permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }) as Permission;

    if (!permission) return false;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

export const checkCameraPermissionStatus = async (): Promise<PermissionStatusResult> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
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
    console.error('Error checking camera permission:', error);
    return { status: RESULTS.DENIED, blocked: false };
  }
};

// Storage Permissions
export const requestStoragePermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }) as Permission;

    if (!permission) return false;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting storage permission:', error);
    return false;
  }
};

export const checkStoragePermissionStatus = async (): Promise<PermissionStatusResult> => {
  try {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
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
    console.error('Error checking storage permission:', error);
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
    console.error('Error requesting notification permission:', error);
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
    console.error('Error checking notification permission:', error);
    return { status: RESULTS.DENIED, blocked: false };
  }
};

// Open App Settings
export const openAppSettings = async (): Promise<void> => {
  try {
    await Linking.openSettings();
  } catch (error) {
    console.error('Error opening app settings:', error);
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

