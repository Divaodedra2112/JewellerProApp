import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData } from './HomeService';

export const fetchDashboardData = createAsyncThunk(
  'home/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardData();
      return response;
    } catch (error: any) {
      console.error('❌ Home Actions - Fetch Error:', {
        error: error?.response?.data || error?.message || error,
        timestamp: new Date().toISOString(),
      });

      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch dashboard data'
      );
    }
  }
);
