import { navigationRef } from '../../navigation/navigationRef';
import { markNotificationAsRead } from './notificationService';

type NotificationData = {
  type?: string;
  id?: string | number;
  screen?: string;
  data?: {
    screen?: string;
    id?: string | number;
  };
  notificationId?: string | number;
  [key: string]: any;
};

// Track currently processing notification to prevent concurrent processing of same notification
let currentlyProcessing: { id: string | number; timestamp: number } | undefined = undefined;
const PROCESSING_WINDOW_MS = 1000; // Block concurrent processing within 1 second

export const handleNotificationNavigation = async (data: NotificationData) => {
  console.log('[NOTIFICATION HANDLER] handleNotificationNavigation called!', data);
  
  const id = (data as any).id ?? (data.data as any)?.id;
  const screen = (data.data as any)?.screen || (data as any).screen;
  const type = (data as any).type ?? (data.data as any)?.type;
  
  const notificationId =
    (data as any).notificationId ??
    (data.data as any)?.notificationId ??
    `${screen || ''}_${id || ''}_${type || ''}`;

  // Check if same notification is currently being processed
  const now = Date.now();
  if (
    currentlyProcessing &&
    currentlyProcessing.id === notificationId &&
    now - currentlyProcessing.timestamp < PROCESSING_WINDOW_MS
  ) {
    console.log('[NOTIFICATION HANDLER] Skipping - same notification already processing');
    return;
  }
  
  currentlyProcessing = { id: notificationId, timestamp: now };
  
  setTimeout(() => {
    if (currentlyProcessing?.id === notificationId) {
      currentlyProcessing = undefined;
    }
  }, PROCESSING_WINDOW_MS);

  // Mark notification as read if notificationId is valid
  if (
    notificationId &&
    ((typeof notificationId === 'string' && notificationId.trim() !== '') ||
      typeof notificationId === 'number')
  ) {
    try {
      await markNotificationAsRead(notificationId);
    } catch (e) {
      console.error('Failed to mark notification as read:', e);
    }
  }

  // Navigate to screen if provided
  if (screen) {
    console.log('[NOTIFICATION HANDLER] Navigating to screen:', screen, 'with id:', id);
    (navigationRef.current as any)?.navigate(screen, id ? { id } : {});
    return;
  }

  // Map notification types to screens (legacy fallback)
  const screenMapping: { [key: string]: string } = {
    // Add your notification type to screen mappings here
  };

  const targetScreen = screenMapping[type ?? ''];

  if (!targetScreen) {
    console.log('[NOTIFICATION HANDLER] No screen mapping found for type:', type);
    return;
  }

  console.log('[NOTIFICATION HANDLER] Navigating to:', {
    screen: targetScreen,
    params: { id },
  });

  navigationRef.current?.navigate(targetScreen as any, { id });
};
