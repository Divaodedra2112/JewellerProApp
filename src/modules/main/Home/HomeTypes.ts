/**
 * Dashboard/Home data structure
 */
export interface DashboardData {
  totalRoutes: number;
  totalCompanies: number;
  totalConcerns: number;
  totalSampleRequests: number;
  totalStaff: number;
  totalMissedDueDate: number;
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
