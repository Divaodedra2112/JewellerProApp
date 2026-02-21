import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopic } from './TopicService';
import { logger } from '../../../utils/logger';

export const fetchTopic = createAsyncThunk(
  'topic/fetchTopic',
  async (id: string, { rejectWithValue }) => {
    try {
      const topic = await getTopic(id);
      return { topic, id };
    } catch (error: any) {
      logger.error('Topic Actions - Fetch Error', error as Error);

      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch topic'
      );
    }
  }
);

