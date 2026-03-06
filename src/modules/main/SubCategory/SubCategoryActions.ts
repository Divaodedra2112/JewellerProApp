import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSubCategories } from './SubCategoryService';
import { logger } from '../../../utils/logger';
import { getApiErrorMessage, TOAST_MESSAGES } from '../../../utils/toast';

export const fetchSubCategories = createAsyncThunk(
  'subCategory/fetchSubCategories',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const subCategories = await getSubCategories(categoryId);
      return { subCategories, categoryId };
    } catch (error: any) {
      logger.error('SubCategory Actions - Fetch Error', error as Error);
      const message = getApiErrorMessage(error, TOAST_MESSAGES.SUBCATEGORY.FETCH_FAILED);
      return rejectWithValue(message);
    }
  }
);

