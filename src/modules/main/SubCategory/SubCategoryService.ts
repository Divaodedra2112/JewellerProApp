import { get } from '../../../services/api';
import { SubCategoryResponse, SubCategory } from './SubCategoryTypes';
import { logger } from '../../../utils/logger';

/** App subcategories endpoint: GET /api/v1/app/subcategories/:categoryId */
const SUBCATEGORIES_PATH = '/app/subcategories';

export const getSubCategories = async (categoryId: string): Promise<SubCategory[]> => {
  try {
    const response = await get<SubCategoryResponse>(`${SUBCATEGORIES_PATH}/${categoryId}`);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch subcategories');
    }

    // Support both { data: { subCategories: [] } } and { data: [] }
    const list = response.data?.subCategories ?? (Array.isArray(response.data) ? response.data : []);
    return list || [];
  } catch (error: any) {
    logger.error('SubCategory Service - Error fetching subcategories', error as Error, {
      endpoint: `${SUBCATEGORIES_PATH}/${categoryId}`,
      categoryId,
      method: 'GET',
    });
    throw error;
  }
};

