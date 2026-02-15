import api from '../../services/api';
import axios from 'axios';
import { logger } from '../../utils/logger';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  screen?: string;
  isRead: boolean;
  createdAt: string;
  data?: {
    id?: string;
    [key: string]: any;
  };
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export const getNotifications = async (page = 1, limit = 10): Promise<NotificationsResponse> => {
  try {
    const response = await api.post('/notification/list', { page, limit });
    const data = response?.data;
    return {
      notifications: data?.data || [],
      unreadCount: data?.unreadCount || 0,
      totalCount: data?.totalCount || 0,
      totalPages: data?.totalPages || 0,
      currentPage: data?.currentPage || 1,
      limit: data?.limit || limit,
    };
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (id: string | number | null | undefined) => {
  if (id === undefined || id === null) {
    return { success: true };
  }
  try {
    await api.put(`/notification/update/${id}`);
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const getStaticNotifications = () => {
  return [];
};

export const updateAndPersistNotification = async (id: string, isRead: boolean) => {
  return markNotificationAsRead(id);
};

export const sendChatNotification = async ({
  chatId,
  senderId,
  message,
  participants,
  groupName,
  mentionedUserIds,
}: {
  chatId: string | number;
  senderId: string | number;
  message: string;
  participants: { userId: string; fcmToken: string; name?: string }[];
  groupName?: string;
  mentionedUserIds?: string[];
}) => {
  try {
    // Use the deployed Cloud Function URL
    const url = 'https://sendchatnotification-gh7eew2wwq-uc.a.run.app';
    const payload = {
      chatId,
      senderId,
      message,
      participants,
      groupName,
      mentionedUserIds,
    };

    logger.debug('Sending chat notification', {
      chatId,
      senderId,
      participantsCount: participants.length,
      groupName,
    });

    const res = await axios.post(url, payload);

    try {
      const d = res.data as any;
      const meta = d?.response || d;
      logger.debug('Chat notification response', {
        successCount: meta?.successCount,
        failureCount: meta?.failureCount,
      });
    } catch {}
    return res.data;
  } catch (error) {
    logger.error('Error sending chat notification', error as Error);
    if (error.response) {
      logger.error('Chat notification response error', new Error('Response error'), error.response.data);
      console.error('[NotificationService] Response status:', error.response.status);
    }
    throw error;
  }
};

// Extract mentioned participant names from a message string
export function extractMentionedNames(message: string): string[] {
  if (!message || typeof message !== 'string') return [];
  const regex = /@([A-Za-z0-9_. \-]{1,50})/g; // basic name matcher after '@'
  const matches: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(message)) !== null) {
    const raw = (m[1] || '').trim();
    if (raw) matches.push(raw.toLowerCase());
  }
  // de-duplicate
  return Array.from(new Set(matches));
}

// Build notification recipients filtered by @mentions; fall back to all (excluding sender)
export function buildNotificationRecipients(
  message: string,
  participants: Array<{
    userId: string | number;
    name?: string;
    fcmToken?: string | string[] | null;
  }>,
  senderId: string | number
): { userId: string; fcmToken: string; name?: string }[] {
  // WhatsApp-like: notify all participants (excluding sender)
  const senderIdStr = String(senderId);
  const baseList = participants || [];
  return baseList.flatMap(p => {
    const tokens = Array.isArray(p.fcmToken) ? p.fcmToken : [p.fcmToken];
    return (tokens || [])
      .filter(t => !!t && String(p.userId) !== senderIdStr)
      .map(t => ({ userId: String(p.userId), fcmToken: String(t), name: p.name }));
  });
}

export function resolveMentionedUserIds(
  message: string,
  participants: Array<{ userId: string | number; name?: string }>
): string[] {
  const names = extractMentionedNames(message);
  if (!names.length) return [];
  const ids = (participants || [])
    .filter(p =>
      names.some(
        n => (p.name || '').toLowerCase() === n || (p.name || '').toLowerCase().startsWith(n)
      )
    )
    .map(p => String(p.userId));
  return Array.from(new Set(ids));
}
