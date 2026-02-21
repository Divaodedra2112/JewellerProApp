import { get } from '../../../services/api';
import { SubCategoryResponse, SubCategory } from './SubCategoryTypes';
import { logger } from '../../../utils/logger';

export const getSubCategories = async (categoryId: string): Promise<SubCategory[]> => {
  try {
    const response = await get<SubCategoryResponse>(`/sub-category?id=${categoryId}`);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch subcategories');
    }

    return response.data.subCategories || [];
  } catch (error: any) {
    logger.error('SubCategory Service - Error fetching subcategories', error as Error, {
      endpoint: '/sub-category',
      categoryId,
      method: 'GET',
    });
    throw error;
  }
};

