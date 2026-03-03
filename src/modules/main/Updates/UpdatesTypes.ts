/**
 * Update item from GET /api/v1/app/updates
 */
export type UpdateTypeApi = 'REGULATORY' | 'CIRCULAR' | 'REMINDER' | 'NOTICE';

export interface Update {
  id: string;
  updateType: UpdateTypeApi;
  title: string;
  description: string | null;
  content: string | null;
  /** Optional URL for "Learn More" – when present, show link and open on press */
  linkUrl?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatesResponse {
  success: boolean;
  data: Update[];
  message?: string;
}
