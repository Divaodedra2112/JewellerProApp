import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { handleNotificationNavigation } from './NotificationHandler';
import { Platform } from 'react-native';

const QUEUE_STORAGE_KEY = '@notification_queue';
const LOGS_STORAGE_KEY = '@notification_logs';

export interface QueuedNotification {
  title: string;
  body: string;
  data: any;
  timestamp: number;
  type?: string;
  imageUrl?: string;
}

interface NotificationLog {
  message: string;
  timestamp: number;
  type: 'info' | 'error' | 'warn';
  data?: any;
}

export const useNotificationQueue = () => {
  const [queue, setQueue] = useState<QueuedNotification[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<NotificationLog[]>([]);

  // Persistent logging function
  const addLog = useCallback(
    async (message: string, type: 'info' | 'error' | 'warn' = 'info', data?: any) => {
      const log: NotificationLog = {
        message,
        timestamp: Date.now(),
        type,
        data,
      };

      setLogs(prevLogs => {
        const newLogs = [...prevLogs, log].slice(-100);
        return newLogs;
      });

      try {
        const storedLogs = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
        const currentLogs = storedLogs ? JSON.parse(storedLogs) : [];
        const updatedLogs = [...currentLogs, log].slice(-100);
        await AsyncStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
      } catch (error) {
        console.error('Error saving logs:', error);
      }

      if (__DEV__) {
        switch (type) {
          case 'error':
            console.error(`[NotificationQueue] ${message}`, data);
            break;
          case 'warn':
            console.warn(`[NotificationQueue] ${message}`, data);
            break;
          default:
            console.log(`[NotificationQueue] ${message}`, data);
        }
      }
    },
    []
  );

  // Load logs on mount
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const storedLogs = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
        if (storedLogs) {
          setLogs(JSON.parse(storedLogs));
        }
      } catch (error) {
        console.error('Error loading logs:', error);
      }
    };
    loadLogs();
  }, []);

  // Create Android channel once
  useEffect(() => {
    (async () => {
      try {
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
        await addLog('Notification channel created');
      } catch (e) {
        await addLog('Channel creation error', 'error', e);
      }
    })();
  }, [addLog]);

  // Initialize queue from AsyncStorage
  useEffect(() => {
    const initializeQueue = async () => {
      try {
        const storedQueue = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
        if (storedQueue) {
          const parsedQueue: QueuedNotification[] = JSON.parse(storedQueue);
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          const filteredQueue = parsedQueue.filter(item => item.timestamp > sevenDaysAgo);
          await addLog(`Loaded ${filteredQueue.length} notifications from storage`);
          setQueue(filteredQueue);
          await saveQueue(filteredQueue);
        }
      } catch (error) {
        await addLog('Error loading queue', 'error', error);
      }
    };

    initializeQueue();
  }, [addLog]);

  // Stable saveQueue to AsyncStorage
  const saveQueue = useCallback(
    async (updatedQueue: QueuedNotification[]) => {
      try {
        await AsyncStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
      } catch (error) {
        await addLog('Error saving queue', 'error', error);
      }
    },
    [addLog]
  );

  // Add notification to queue
  const addToQueue = async (notification: QueuedNotification) => {
    try {
      const newNotification: QueuedNotification = {
        ...notification,
        timestamp: notification.timestamp || Date.now(),
      };

      setQueue(prevQueue => {
        const updatedQueue = [...prevQueue, newNotification];
        saveQueue(updatedQueue);

        console.log('🔔 [NOTIFICATION QUEUED] Added notification to queue:', {
          title: notification.title,
          body: notification.body,
          type: notification.type,
          totalInQueue: updatedQueue.length,
          timestamp: new Date(notification.timestamp).toISOString(),
        });

        addLog(`Added notification to queue. Total in queue: ${updatedQueue.length}`, 'info', {
          title: notification.title,
          type: notification.type,
        });
        return updatedQueue;
      });

      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        processQueue();
      } else {
        await addLog('Device is offline, notification queued', 'info', {
          title: notification.title,
          type: notification.type,
        });
      }
    } catch (error) {
      await addLog('Error adding to queue', 'error', error);
    }
  };

  // Process all queued notifications
  const processQueue = async () => {
    if (isProcessing || queue.length === 0) return;

    setIsProcessing(true);
    await addLog(`Starting to process ${queue.length} notifications`);

    try {
      const currentQueue = [...queue]; // take snapshot
      const remainingQueue: QueuedNotification[] = [];

      for (let i = 0; i < currentQueue.length; i++) {
        const notification = currentQueue[i];
        try {
          await addLog(`Processing notification ${i + 1}`, 'info', {
            title: notification.title,
            type: notification.type,
            timestamp: new Date(notification.timestamp).toISOString(),
          });

          console.log('🔔 [NOTIFICATION DISPLAY] Showing notification to user:', {
            title: notification.title,
            body: notification.body,
            type: notification.type,
            timestamp: new Date(notification.timestamp).toISOString(),
          });

          await notifee.displayNotification({
            title: notification.title,
            body: notification.body,
            data: notification.data,
            android: {
              channelId: 'default',
              pressAction: { id: 'default' },
              smallIcon: 'ic_launcher',
              importance: AndroidImportance.HIGH,
              showTimestamp: true,
              sound: 'default',
              lights: ['#FF0000', 300, 500],
              ...(notification.imageUrl && {
                largeIcon: notification.imageUrl,
              }),
            },
            ios: {
              foregroundPresentationOptions: {
                alert: true,
                badge: true,
                sound: true,
              },
              ...(notification.imageUrl && {
                attachments: [{ url: notification.imageUrl }],
              }),
            },
          });

          console.log('🔔 [NOTIFICATION DISPLAY] Notification displayed successfully!');

          if (notification.data) {
            handleNotificationNavigation(notification.data);
          }

          await addLog(`Processed notification ${i + 1}`, 'info', {
            title: notification.title,
          });
        } catch (e) {
          await addLog(`Failed to process notification ${i + 1}`, 'error', {
            error: e,
            notification,
          });
          remainingQueue.push(notification); // retry later
        }
      }

      // Save remaining queue (if any)
      setQueue(remainingQueue);
      await saveQueue(remainingQueue);
      await addLog(`Finished processing. Remaining: ${remainingQueue.length}`);
    } catch (error) {
      await addLog('Error during queue processing', 'error', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear the queue manually
  const clearQueue = async () => {
    setQueue([]);
    await saveQueue([]);
    await addLog('Queue cleared manually');
  };

  // Get logs
  const getLogs = () => logs;

  return {
    addToQueue,
    processQueue,
    clearQueue,
    getQueueLength: () => queue.length,
    getQueuedNotifications: () => [...queue],
    getLogs,
  };
};

export default useNotificationQueue;
