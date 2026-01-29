import { get } from '../../../services/api';
import { HomeResponse } from './HomeTypes';

export const getDashboardData = async () => {
  try {
    const response = await get<HomeResponse>('/dashboard');

    if (!response) {
      throw new Error('No response received from server');
    }

    return response.data;
  } catch (error: any) {
    console.error('❌ Home Service - Error:', {
      endpoint: '/dashboard',
      method: 'GET',
      error: {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        stack: error?.stack,
      },
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
};
