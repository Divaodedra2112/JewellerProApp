// src/constants/NotificationListData.ts

import { ImageSourcePropType } from 'react-native';

export interface NotificationType {
  type: string;
  imageFile: ImageSourcePropType;
}

export const NotificationListData: NotificationType[] = [
  {
    type: 'order',
    // imageFile: require('../../assets/icons/order.png'),
  },
  {
    type: 'message',
    // imageFile: require('../../assets/icons/message.png'),
  },
  {
    type: 'system',
    // imageFile: require('../../assets/icons/system.png'),
  },
];

export const staticNotifications = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'You have received a new order #12345',
    type: 'order',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Message from Support',
    message: 'Your recent inquiry has been answered',
    type: 'message',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'System Update',
    message: 'New concern tuype added',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    title: 'Branch created',
    message: 'New features have been added to the app',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '5',
    title: 'New Road added',
    message: 'New features have been added to the app',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];
