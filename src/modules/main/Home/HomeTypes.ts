/**
 * Category data structure from API
 */
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  hasSubCategory: boolean;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

/**
 * Banner data structure from API
 */
export interface Banner {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
}

/**
 * Home data structure containing categories and optional banners
 */
export interface HomeData {
  categories: Category[];
  banners?: Banner[]; // Optional - may not always be present
}

/**
 * Home API response structure
 */
export interface HomeResponse {
  success: boolean;
  data: HomeData;
  message?: string;
}

/**
 * Home state interface for Redux
 */
export interface HomeState {
  homeData: HomeData | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}
