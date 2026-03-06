import { get } from '../../../services/api';
import { SubCategoryResponse, SubCategory } from './SubCategoryTypes';
import { logger } from '../../../utils/logger';

/** App subcategories endpoint: GET /api/v1/app/subcategories/:categoryId */
const SUBCATEGORIES_PATH = '/app/subcategories';

/** Normalize a raw API item to SubCategory (supports name/title, _id/id, etc.) */
function normalizeSubCategory(raw: any, index: number): SubCategory {
  return {
    id: raw?.id ?? raw?._id ?? raw?.subcategoryId ?? String(index),
    title: raw?.title ?? raw?.name ?? raw?.subcategoryName ?? raw?.label ?? '',
    description: raw?.description ?? raw?.desc ?? raw?.details ?? undefined,
    icon: raw?.icon ?? null,
    order: typeof raw?.order === 'number' ? raw.order : raw?.sortOrder ?? index,
    status: raw?.status === 'INACTIVE' || raw?.status === 'inactive' ? 'INACTIVE' : 'ACTIVE',
  };
}

export const getSubCategories = async (categoryId: string): Promise<SubCategory[]> => {
  try {
    const response = await get<SubCategoryResponse>(`${SUBCATEGORIES_PATH}/${categoryId}`);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (response.success === false) {
      throw new Error(response.message || 'Failed to fetch subcategories');
    }

    // Support multiple response shapes
    const res = response as any;
    const data = res.data;
    const list =
      data?.subCategories ??
      data?.SubCategories ??
      data?.results ??
      data?.items ??
      data?.subcategories ??
      (Array.isArray(data) ? data : null) ??
      (Array.isArray(res) ? res : null) ??
      [];
    const arr = Array.isArray(list) ? list : [];
    return arr.map((item: any, index: number) => normalizeSubCategory(item, index));
  } catch (error: any) {
    logger.error('SubCategory Service - Error fetching subcategories', error as Error, {
      endpoint: `${SUBCATEGORIES_PATH}/${categoryId}`,
      categoryId,
      method: 'GET',
    });
    throw error;
  }
};

