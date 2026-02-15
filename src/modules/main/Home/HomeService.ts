import { get } from '../../../services/api';
import { HomeResponse } from './HomeTypes';
import { logger } from '../../../utils/logger';

export const getDashboardData = async () => {
  try {
    const response = await get<HomeResponse>('/dashboard');

    if (!response) {
      throw new Error('No response received from server');
    }

    return response.data;
  } catch (error: any) {
    logger.error('Home Service - Error fetching dashboard data', error as Error, {
      endpoint: '/dashboard',
      method: 'GET',
    });
    throw error;
  }
};
