/**
 * Image/Icon object structure from API
 */
export interface ImageObject {
  url: string;
  objectName: string;
}

/**
 * Category data structure from API
 */
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: ImageObject;
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
  image: ImageObject;
  navigateUrl: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

/**
 * Zoom Meeting data structure (used for ActionCards when link from API)
 */
export interface ZoomMeeting {
  id?: string;
  title?: string;
  linkUrl: string;
  meetingTime?: string;
  order?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

/**
 * Links from home API (data.links)
 */
export interface HomeLinks {
  panCardVerifyUrl?: string;
  zoomMeetingUrl?: string;
  latestUpdatesUrl?: string;
}

/**
 * Home data structure from API (data.categories, data.banners, data.links, data.promotionalBanners)
 */
export interface HomeData {
  categories: Category[];
  banners?: Banner[];
  /** Optional promotional banners shown at the bottom of Home when provided by API */
  promotionalBanners?: Banner[];
  links?: HomeLinks;
  /** @deprecated Use links.zoomMeetingUrl and build ZoomMeeting in UI */
  zoomMeeting?: ZoomMeeting;
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
