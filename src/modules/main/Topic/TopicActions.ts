import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopic } from './TopicService';
import { logger } from '../../../utils/logger';
import { getApiErrorMessage, TOAST_MESSAGES } from '../../../utils/toast';

export const fetchTopic = createAsyncThunk(
  'topic/fetchTopic',
  async (id: string, { rejectWithValue }) => {
    try {
      const topic = await getTopic(id);
      return { topic, id };
    } catch (error: any) {
      logger.error('Topic Actions - Fetch Error', error as Error);
      const message = getApiErrorMessage(error, TOAST_MESSAGES.TOPIC.FETCH_FAILED);
      return rejectWithValue(message);
    }
  }
);

