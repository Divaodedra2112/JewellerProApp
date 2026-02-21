/**
 * SubCategory data structure from API
 */
export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  icon?: string | null;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
}

/**
 * SubCategory API response structure
 */
export interface SubCategoryResponse {
  success: boolean;
  data: {
    subCategories: SubCategory[];
  };
  message?: string;
}

/**
 * SubCategory state interface for Redux
 */
export interface SubCategoryState {
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;
  categoryId: string | null;
  categoryTitle: string | null;
}

