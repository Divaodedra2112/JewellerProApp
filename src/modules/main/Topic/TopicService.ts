import { get } from '../../../services/api';
import { TopicResponse, Topic } from './TopicTypes';
import { logger } from '../../../utils/logger';

/** App topics endpoint: GET /api/v1/app/topics/:id */
const TOPICS_PATH = '/app/topics';

export const getTopic = async (id: string): Promise<Topic> => {
  try {
    const response = await get<TopicResponse>(`${TOPICS_PATH}/${id}`);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch topic');
    }

    return response.data;
  } catch (error: any) {
    logger.error('Topic Service - Error fetching topic', error as Error, {
      endpoint: `${TOPICS_PATH}/${id}`,
      id,
      method: 'GET',
    });
    throw error;
  }
};

