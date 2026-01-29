import { Platform, Linking, Alert, PermissionsAndroid } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PermissionResult {
  storage: boolean;
  notification: boolean;
  camera: boolean;
  writeStorage: boolean;
}

export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'unavailable';

export interface PermissionCheckResult {
  granted: boolean;
  status: PermissionStatus;
}

const PERMISSIONS_REQUESTED_KEY = '@permissions_requested';

/**
 * Clear the permission request flag (for testing)
 */
export const clearPermissionFlag = async () => {
  try {
    await AsyncStorage.removeItem(PERMISSIONS_REQUESTED_KEY);
    console.log('[Permissions] ✅ Cleared permission request flag');
  } catch (error) {
    console.error('[Permissions] Error clearing flag:', error);
  }
};

/**
 * Get the appropriate permission constants based on platform and Android version
 */
const getStoragePermission = (): Permission => {
  if (Platform.OS === 'ios') {
    return PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else {
    // Android 13+ (API 33+)
    const androidVersion = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);
    if (androidVersion >= 33) {
      return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      // Android 12 and below
      return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
  }
};

const getCameraPermission = (): Permission => {
  if (Platform.OS === 'ios') {
    return PERMISSIONS.IOS.CAMERA;
  } else {
    return PERMISSIONS.ANDROID.CAMERA;
  }
};

/**
 * Check storage permission status without requesting
 */
export const checkStoragePermissionStatus = async (): Promise<PermissionCheckResult> => {
  try {
    const permission = getStoragePermission();
    const status = await check(permission);

    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      return { granted: true, status: 'granted' };
    }
    if (status === RESULTS.BLOCKED) {
      return { granted: false, status: 'blocked' };
    }
    if (status === RESULTS.UNAVAILABLE) {
      return { granted: false, status: 'unavailable' };
    }
    return { granted: false, status: 'denied' };
  } catch (error) {
    console.error('[Permissions] Error checking storage permission:', error);
    return { granted: false, status: 'unavailable' };
  }
};

/**
 * Check camera permission status without requesting
 */
export const checkCameraPermissionStatus = async (): Promise<PermissionCheckResult> => {
  try {
    const permission = getCameraPermission();
    const status = await check(permission);

    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      return { granted: true, status: 'granted' };
    }
    if (status === RESULTS.BLOCKED) {
      return { granted: false, status: 'blocked' };
    }
    if (status === RESULTS.UNAVAILABLE) {
      return { granted: false, status: 'unavailable' };
    }
    return { granted: false, status: 'denied' };
  } catch (error) {
    console.error('[Permissions] Error checking camera permission:', error);
    return { granted: false, status: 'unavailable' };
  }
};

/**
 * Check notification permission status without requesting
 */
export const checkNotificationPermissionStatus = async (): Promise<PermissionCheckResult> => {
  try {
    if (Platform.OS === 'android') {
      const androidVersion = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);

      if (androidVersion >= 33) {
        // Android 13+ - check POST_NOTIFICATIONS
        const POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS' as any;
        const hasPermission = await PermissionsAndroid.check(POST_NOTIFICATIONS);
        return hasPermission ? { granted: true, status: 'granted' } : { granted: false, status: 'denied' };
      } else {
        // Android 12 and below - granted by default
        return { granted: true, status: 'granted' };
      }
    } else {
      // iOS - Use react-native-permissions
      const status = await check(PERMISSIONS.IOS.USER_FACING_NOTIFICATIONS);
      if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
        return { granted: true, status: 'granted' };
      }
      if (status === RESULTS.BLOCKED) {
        return { granted: false, status: 'blocked' };
      }
      return { granted: false, status: 'denied' };
    }
  } catch (error) {
    console.error('[Permissions] Error checking notification permission:', error);
    return { granted: false, status: 'unavailable' };
  }
};

/**
 * Show permission denied alert with option to open settings if blocked
 */
export const showPermissionDeniedAlert = (
  permissionType: 'camera' | 'storage' | 'gallery' | 'notification',
  onOpenSettings?: () => void
) => {
  const permissionName =
    permissionType === 'camera'
      ? 'Camera'
      : permissionType === 'storage' || permissionType === 'gallery'
      ? 'Storage/Gallery'
      : permissionType === 'notification'
      ? 'Notification'
      : 'Permission';

  const actionDescription =
    permissionType === 'camera'
      ? 'take photos'
      : permissionType === 'storage' || permissionType === 'gallery'
      ? 'access your gallery'
      : permissionType === 'notification'
      ? 'receive notifications'
      : 'use this feature';

  Alert.alert(
    'Permission Required',
    `${permissionName} permission is required to ${actionDescription}. Please enable it in your device settings.`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: async () => {
          try {
            if (onOpenSettings) {
              // If custom callback provided, use it (it should handle the async call)
              await onOpenSettings();
            } else {
              // Use default openAppSettings function
              await openAppSettings();
            }
          } catch (error) {
            console.error('[Permissions] Error in Open Settings button:', error);
            // Fallback: try opening settings directly
            try {
              await Linking.openSettings();
            } catch (fallbackError) {
              console.error('[Permissions] Fallback also failed:', fallbackError);
            }
          }
        },
      },
    ],
    { cancelable: true }
  );
};

/**
 * Request write storage permission for downloading/saving files
 * Note: For Android 11+ (API 30+), WRITE_EXTERNAL_STORAGE is not needed for app-specific directories
 * but may be needed for saving to shared storage like Downloads folder
 */
export const requestWriteStoragePermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // iOS doesn't need explicit permission for app directories
      // Only needed if saving to photo library (handled separately)
      return true;
    }

    // Android
    const androidVersion = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);

    // Android 11+ (API 30+) uses scoped storage - no permission needed for app directories
    if (androidVersion >= 30) {
      console.log('[Permissions] Android 11+: Write permission not required for app directories');
      // If you need to save to shared storage (Downloads), you might need MANAGE_EXTERNAL_STORAGE
      // but that requires special approval from Google Play
      return true;
    }

    // Android 10 and below - need WRITE_EXTERNAL_STORAGE
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (hasPermission) {
        console.log('[Permissions] ✅ Write storage permission already granted');
        return true;
      }

      console.log('[Permissions] 🔔 Requesting write storage permission...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs permission to save downloaded files to your device.',
          buttonPositive: 'OK',
        }
      );

      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      console.log('[Permissions] Write storage permission granted?', isGranted);
      return isGranted;
    } catch (error) {
      console.error('[Permissions] ❌ Error requesting write storage permission:', error);
      return false;
    }
  } catch (error) {
    console.error('[Permissions] ❌ Error in requestWriteStoragePermission:', error);
    return false;
  }
};

/**
 * Request storage/gallery permission
 * Shows native system dialog
 */
export const requestStoragePermission = async (): Promise<boolean> => {
  try {
    const permission = getStoragePermission();
    console.log('[Permissions] Checking storage permission:', permission);
    console.log('[Permissions] Platform:', Platform.OS);

    // Check current status
    const status = await check(permission);
    console.log('[Permissions] Storage permission status:', status);
    console.log('[Permissions] Status values:', {
      UNAVAILABLE: RESULTS.UNAVAILABLE,
      DENIED: RESULTS.DENIED,
      BLOCKED: RESULTS.BLOCKED,
      GRANTED: RESULTS.GRANTED,
      LIMITED: RESULTS.LIMITED,
    });

    // If already granted, return true
    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      console.log('[Permissions] ✅ Storage permission already granted');
      return true;
    }

    // If blocked, can't request again (user must go to settings)
    if (status === RESULTS.BLOCKED) {
      console.log('[Permissions] ⚠️ Storage permission blocked - user must enable in settings');
      // Don't show alert here - let calling code handle it with proper context
      return false;
    }

    // If unavailable, can't request
    if (status === RESULTS.UNAVAILABLE) {
      console.log('[Permissions] ⚠️ Storage permission unavailable on this device');
      return false;
    }

    // If denied or not determined, we can request (will show native dialog)
    // DENIED means not requested yet or denied but still requestable
    console.log('[Permissions] 🔔 Requesting storage permission (status was:', status, ')...');
    console.log('[Permissions] Calling request() for permission:', permission);
    const requestStatus = await request(permission);
    console.log('[Permissions] Storage permission request result:', requestStatus);

    const isGranted = requestStatus === RESULTS.GRANTED || requestStatus === RESULTS.LIMITED;
    console.log('[Permissions] Storage permission granted?', isGranted);

    // Don't show alert here - let calling code handle it with proper context
    // The calling code should check status after request to show appropriate alert

    return isGranted;
  } catch (error) {
    console.error('[Permissions] ❌ Error requesting storage permission:', error);
    console.error('[Permissions] Error stack:', error instanceof Error ? error.stack : String(error));
    return false;
  }
};

/**
 * Request notification permission
 * Uses react-native-permissions for both Android and iOS
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    console.log('[Permissions] Checking notification permission...');
    console.log('[Permissions] Platform:', Platform.OS, Platform.Version);

    if (Platform.OS === 'android') {
      // For Android 13+ (API 33+), use PermissionsAndroid for POST_NOTIFICATIONS
      const androidVersion = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);

      if (androidVersion >= 33) {
        // Android 13+ requires explicit POST_NOTIFICATIONS permission
        console.log('[Permissions] Android 13+: Using POST_NOTIFICATIONS permission');

        try {
          // Use string constant for POST_NOTIFICATIONS (Android 13+)
          const POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS' as any;

          // Check if permission is already granted
          const hasPermission = await PermissionsAndroid.check(POST_NOTIFICATIONS);

          if (hasPermission) {
            console.log('[Permissions] ✅ Notification permission already granted');
            return true;
          }

          // Request permission (will show native dialog)
          console.log('[Permissions] 🔔 Requesting notification permission (Android 13+)...');
          const granted = await PermissionsAndroid.request(POST_NOTIFICATIONS, {
            title: 'Notification Permission',
            message: 'This app needs notification permission to send you updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          });

          console.log('[Permissions] Notification permission request result:', granted);
          const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
          console.log('[Permissions] Notification permission granted?', isGranted);

          // If denied, check if we should show alert (but don't show here - let calling code handle it)
          if (!isGranted && granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('[Permissions] ⚠️ Notification permission blocked (NEVER_ASK_AGAIN)');
          }

          return isGranted;
        } catch (error) {
          console.error('[Permissions] ❌ Error requesting Android notification permission:', error);
          return false;
        }
      } else {
        // Android 12 and below - notifications are granted by default
        console.log('[Permissions] Android 12 and below - notifications granted by default');
        return true;
      }
    } else {
      // iOS - Use react-native-permissions
      const currentStatus = await check(PERMISSIONS.IOS.USER_FACING_NOTIFICATIONS);
      console.log('[Permissions] Notification permission status (iOS):', currentStatus);

      // If already granted or limited, return true
      if (currentStatus === RESULTS.GRANTED || currentStatus === RESULTS.LIMITED) {
        console.log('[Permissions] ✅ Notification permission already granted');
        return true;
      }

      // If blocked, can't request again (user must go to settings)
      if (currentStatus === RESULTS.BLOCKED) {
        console.log('[Permissions] ⚠️ Notification permission blocked - user must enable in settings');
        return false;
      }

      // Request permission (will show native dialog)
      console.log('[Permissions] 🔔 Requesting notification permission (iOS)...');
      const authStatus = await request(PERMISSIONS.IOS.USER_FACING_NOTIFICATIONS);
      console.log('[Permissions] Notification permission request result:', authStatus);

      const isGranted = authStatus === RESULTS.GRANTED || authStatus === RESULTS.LIMITED;
      console.log('[Permissions] Notification permission granted?', isGranted);
      return isGranted;
    }
  } catch (error) {
    console.error('[Permissions] ❌ Error requesting notification permission:', error);
    console.error('[Permissions] Error stack:', error instanceof Error ? error.stack : String(error));
    return false;
  }
};

/**
 * Request camera permission
 * Shows native system dialog
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const permission = getCameraPermission();
    console.log('[Permissions] Checking camera permission:', permission);
    console.log('[Permissions] Platform:', Platform.OS);

    // Check current status
    const status = await check(permission);
    console.log('[Permissions] Camera permission status:', status);
    console.log('[Permissions] Status values:', {
      UNAVAILABLE: RESULTS.UNAVAILABLE,
      DENIED: RESULTS.DENIED,
      BLOCKED: RESULTS.BLOCKED,
      GRANTED: RESULTS.GRANTED,
      LIMITED: RESULTS.LIMITED,
    });

    // If already granted, return true
    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      console.log('[Permissions] ✅ Camera permission already granted');
      return true;
    }

    // If blocked, can't request again (user must go to settings)
    if (status === RESULTS.BLOCKED) {
      console.log('[Permissions] ⚠️ Camera permission blocked - user must enable in settings');
      // Don't show alert here - let calling code handle it with proper context
      return false;
    }

    // If unavailable, can't request
    if (status === RESULTS.UNAVAILABLE) {
      console.log('[Permissions] ⚠️ Camera permission unavailable on this device');
      return false;
    }

    // If denied or not determined, we can request (will show native dialog)
    // DENIED means not requested yet or denied but still requestable
    console.log('[Permissions] 🔔 Requesting camera permission (status was:', status, ')...');
    console.log('[Permissions] Calling request() for permission:', permission);
    const requestStatus = await request(permission);
    console.log('[Permissions] Camera permission request result:', requestStatus);

    const isGranted = requestStatus === RESULTS.GRANTED || requestStatus === RESULTS.LIMITED;
    console.log('[Permissions] Camera permission granted?', isGranted);

    // Don't show alert here - let calling code handle it with proper context
    // The calling code should check status after request to show appropriate alert

    return isGranted;
  } catch (error) {
    console.error('[Permissions] ❌ Error requesting camera permission:', error);
    console.error('[Permissions] Error stack:', error instanceof Error ? error.stack : String(error));
    return false;
  }
};

/**
 * Request all permissions sequentially
 * Shows native system dialogs one after another
 */
export const requestAllPermissions = async (): Promise<PermissionResult> => {
  const results: PermissionResult = {
    storage: false,
    notification: false,
    camera: false,
    writeStorage: false,
  };

  try {
    console.log('[Permissions] ===== Starting permission requests =====');
    console.log('[Permissions] Platform:', Platform.OS, Platform.Version);

    // Request storage permission first (for reading gallery/images)
    console.log('[Permissions] Step 1/4: Requesting storage permission (read)...');
    results.storage = await requestStoragePermission();
    console.log('[Permissions] Step 1/4: Storage result:', results.storage);

    // Wait 500ms before next permission
    console.log('[Permissions] Waiting 500ms before next permission...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Request notification permission
    console.log('[Permissions] Step 2/4: Requesting notification permission...');
    results.notification = await requestNotificationPermission();
    console.log('[Permissions] Step 2/4: Notification result:', results.notification);

    // If notification permission was denied, check if it's blocked and show alert
    if (!results.notification) {
      const notificationStatus = await checkNotificationPermissionStatus();
      if (notificationStatus.status === 'blocked') {
        // Show alert with option to open settings (but delay it a bit to avoid interrupting login flow)
        setTimeout(() => {
          showPermissionDeniedAlert('notification');
        }, 2000);
      }
    }

    // Wait 500ms before next permission
    console.log('[Permissions] Waiting 500ms before next permission...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Request camera permission
    console.log('[Permissions] Step 3/4: Requesting camera permission...');
    results.camera = await requestCameraPermission();
    console.log('[Permissions] Step 3/4: Camera result:', results.camera);

    // Wait 500ms before next permission
    console.log('[Permissions] Waiting 500ms before next permission...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Request write storage permission (for downloading/saving files)
    console.log('[Permissions] Step 4/4: Requesting write storage permission (download/save)...');
    results.writeStorage = await requestWriteStoragePermission();
    console.log('[Permissions] Step 4/4: Write storage result:', results.writeStorage);

    console.log('[Permissions] ===== All permissions requested =====');
    console.log('[Permissions] Final results:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('[Permissions] ❌ Error in requestAllPermissions:', error);
    console.error('[Permissions] Error stack:', error instanceof Error ? error.stack : String(error));
  }

  return results;
};

/**
 * Open app settings if permission is blocked
 */
export const openAppSettings = async () => {
  console.log('[Permissions] ===== openAppSettings called =====');
  console.log('[Permissions] Platform:', Platform.OS);

  try {
    // Use Linking.openSettings() which works on both iOS and Android
    // This opens the app's specific settings page
    console.log('[Permissions] Calling Linking.openSettings()...');
    await Linking.openSettings();
    console.log('[Permissions] ✅ Linking.openSettings() completed successfully');
  } catch (error) {
    console.error('[Permissions] ❌ Linking.openSettings() failed:', error);
    console.error('[Permissions] Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('[Permissions] Error message:', error instanceof Error ? error.message : String(error));

    // Try alternative method for Android
    if (Platform.OS === 'android') {
      try {
        console.log('[Permissions] Trying Android Intent alternative...');
        // Try opening via intent (requires react-native-android-open-settings or similar)
        // For now, just show manual instructions
        Alert.alert(
          'Open Settings Manually',
          'Please go to:\n\nSettings > Apps > [Your App Name] > Permissions\n\nThen enable the required permissions.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Try Again',
              onPress: async () => {
                try {
                  await Linking.openSettings();
                } catch (retryError) {
                  console.error('[Permissions] Retry also failed:', retryError);
                }
              },
            },
          ]
        );
      } catch (altError) {
        console.error('[Permissions] Alternative method also failed:', altError);
        Alert.alert(
          'Unable to Open Settings',
          'Please manually go to:\n\nSettings > Apps > [Your App Name] > Permissions\n\nThen enable the required permissions.',
          [{ text: 'OK' }]
        );
      }
    } else {
      // iOS fallback
      try {
        console.log('[Permissions] Trying iOS app-settings: URL...');
        const canOpen = await Linking.canOpenURL('app-settings:');
        if (canOpen) {
          await Linking.openURL('app-settings:');
          console.log('[Permissions] ✅ iOS settings opened via app-settings:');
        } else {
          throw new Error('app-settings: URL not available');
        }
      } catch (iosError) {
        console.error('[Permissions] iOS alternative also failed:', iosError);
        Alert.alert(
          'Unable to Open Settings',
          'Please manually go to:\n\nSettings > [Your App Name] > Permissions\n\nThen enable the required permissions.',
          [{ text: 'OK' }]
        );
      }
    }
  }
};
