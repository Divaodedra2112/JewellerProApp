export interface ChatParticipant {
  userId: string | number;
  name: string;
  mobileNo?: string;
  email?: string | null;
  avatar?: string | null;
  role?: { roleType: string; roleName: string };
  fcmToken?: string | string[] | null;
  isDeleted?: string;
  isAdmin?: string | boolean;
  road?: { id: number; name: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatListItem {
  id?: number; // chat group id (backend)
  name?: string; // group name
  chatId: string; // chat room key; we use id as string by default
  lastMessage: string;
  lastMessageTime: string; // ISO 8601 or numeric string
  unreadCount: number;
  status?: 'OPEN' | 'CLOSED';
  participants: ChatParticipant[];
  lastMessageSender?: string;
  profileImage?: string | null;
  isDeleted?: string | boolean;
  type?: string; // SYSTEM or CUSTOM
  metaData?: { roadId?: number; companyId?: number };
}

export interface ChatMessage {
  id: string;
  sender?: string;
  senderId?: string;
  time: string | number;
  message: string;
  isRead?: { [userId: string]: boolean } | boolean; // Support both object (regular messages) and boolean (thread messages)
  type: 'text' | 'image' | 'video' | 'audio' | 'pdf' | 'system';
  thumbnail?: string;
  fileSize?: string;
  fileName?: string;
  duration?: string;
  replyTo?: string; // ID of the message being replied to
  status?: 'sending' | 'sent' | 'failed'; // Message status for optimistic UI
  pending?: boolean; // Legacy field for backward compatibility
  uploadProgress?: number; // Upload progress percentage (0-100)
  retryCount?: number; // Number of retry attempts
}
