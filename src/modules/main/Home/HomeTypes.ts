/**
 * Dashboard/Home data structure
 * TODO: Customize this interface for your app's dashboard data
 */
export interface DashboardData {
  // Example fields - customize as needed
  totalItems?: number;
  // Add more dashboard fields as needed
}

/**
 * Home API response structure
 */
export interface HomeResponse {
  data: DashboardData;
  success: boolean;
  message?: string;
}

/**
 * Home state interface for Redux
 */
export interface HomeState {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}
