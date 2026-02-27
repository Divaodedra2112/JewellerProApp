import { get } from '../../../services/api';
import { TopicResponse, Topic } from './TopicTypes';
import { logger } from '../../../utils/logger';

export const getTopic = async (id: string): Promise<Topic> => {
  try {
    const response = await get<TopicResponse>(`/topic?id=${id}`);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch topic');
    }

    return response.data;
  } catch (error: any) {
    logger.error('Topic Service - Error fetching topic', error as Error, {
      endpoint: '/topic',
      id,
      method: 'GET',
    });
    throw error;
  }
};

