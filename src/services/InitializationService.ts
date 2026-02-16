import { setUnreadCount } from '../store/slices/notificationSlice';
import { logger } from '../utils/logger';

type AppDispatch = any;

export const prefetchNotifications = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Dynamically import notification service to avoid breaking if module doesn't exist
      const notificationModule = await import('../modules/notification/notificationService');
      const { getNotifications } = notificationModule;
      
      if (getNotifications) {
        const res = await getNotifications();
        const unread = typeof res?.unreadCount === 'number' ? res.unreadCount : 0;
        dispatch(setUnreadCount(unread));
      }
    } catch (err) {
      // Silently fail if notification service doesn't exist yet
      logger.warn('prefetchNotifications failed', err as Error);
    }
  };
};

export const initializeAppData = (dispatch: AppDispatch): void => {
  // Prefetch notifications (first page) so unread badge is ready immediately
  dispatch(prefetchNotifications());
};
