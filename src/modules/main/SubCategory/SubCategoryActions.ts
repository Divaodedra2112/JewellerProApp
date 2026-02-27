import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSubCategories } from './SubCategoryService';
import { logger } from '../../../utils/logger';

export const fetchSubCategories = createAsyncThunk(
  'subCategory/fetchSubCategories',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const subCategories = await getSubCategories(categoryId);
      return { subCategories, categoryId };
    } catch (error: any) {
      logger.error('SubCategory Actions - Fetch Error', error as Error);

      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch subcategories'
      );
    }
  }
);

