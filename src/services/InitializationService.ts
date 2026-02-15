import { setUnreadCount } from '../store/slices/notificationSlice';
import { getNotifications } from '../modules/notification/notificationService';
import { logger } from '../utils/logger';

type AppDispatch = any;

export const prefetchNotifications = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const res = await getNotifications();
      const unread = typeof res?.unreadCount === 'number' ? res.unreadCount : 0;
      dispatch(setUnreadCount(unread));
    } catch (err) {
      logger.warn('prefetchNotifications failed', err as Error);
    }
  };
};

export const initializeAppData = (dispatch: AppDispatch): void => {
  // Prefetch notifications (first page) so unread badge is ready immediately
  dispatch(prefetchNotifications());
};
