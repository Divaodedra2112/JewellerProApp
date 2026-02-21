import { get } from '../../../services/api';
import { HomeResponse, HomeData } from './HomeTypes';
import { logger } from '../../../utils/logger';

export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await get<HomeResponse>('/home');

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch home data');
    }

    return response.data;
  } catch (error: any) {
    logger.error('Home Service - Error fetching home data', error as Error, {
      endpoint: '/home',
      method: 'GET',
    });
    throw error;
  }
};
