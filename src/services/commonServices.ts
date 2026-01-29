// services/AddProductService.ts

import { post, put } from './api';
import { TypesRequestCode, CompetitorCompanyListResponse } from './commonTypes';

export interface ResetPinResponse {
  pin: string;
  mobile: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  data?: T;
}

export const getStatusAndPriority = async (code?: TypesRequestCode) => {
  try {
    const response = (await post('/task/task-type-details', code || {})) as any;
    // Return the response directly since it already has the correct structure
    return response;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getCompetitorCompanyList = async (
  params?: Partial<{
    sortBy: string;
    order: string;
    page: number;
    limit: number;
    filter: Record<string, unknown>;
  }>
): Promise<CompetitorCompanyListResponse> => {
  try {
    const response = await post<CompetitorCompanyListResponse>(
      '/competitor-company/list',
      params || {}
    );
    if (!response) {
      throw new Error('Failed to fetch competitor company list');
    }
    return response;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const resetStaffPinApi = async (staffId: number): Promise<ApiResponse<ResetPinResponse>> => {
  try {
    const response = await put<ApiResponse<ResetPinResponse>>(`/staff/reset-pin/${staffId}`, {});
    return response;
  } catch (error: any) {
    if (error.response?.data?.isSuccess === false) {
      return error.response.data as ApiResponse<ResetPinResponse>;
    }
    throw error;
  }
};
