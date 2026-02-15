import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData } from './HomeService';
import { logger } from '../../../utils/logger';

export const fetchDashboardData = createAsyncThunk(
  'home/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardData();
      return response;
    } catch (error: any) {
      logger.error('Home Actions - Fetch Error', error as Error);

      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch dashboard data'
      );
    }
  }
);
