/**
 * Topic data structure from API
 */
export interface Topic {
  id: string;
  title: string;
  content: string;
  tag?: string;
  pdfUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Topic API response structure
 */
export interface TopicResponse {
  success: boolean;
  data: Topic;
  message?: string;
}

/**
 * Topic state interface for Redux
 */
export interface TopicState {
  topic: Topic | null;
  loading: boolean;
  error: string | null;
  topicId: string | null;
}

