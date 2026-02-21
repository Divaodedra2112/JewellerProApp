import { createAsyncThunk } from '@reduxjs/toolkit';
import { getHomeData } from './HomeService';
import { logger } from '../../../utils/logger';

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHomeData();
      return response;
    } catch (error: any) {
      logger.error('Home Actions - Fetch Error', error as Error);

      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch home data'
      );
    }
  }
);
