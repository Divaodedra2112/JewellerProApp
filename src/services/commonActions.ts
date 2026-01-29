import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStatusAndPriority,
  getCompetitorCompanyList,
  resetStaffPinApi,
} from './commonServices';
import { TypesRequestCode } from './commonTypes';

export const fetchStatusAndPriority = createAsyncThunk(
  'task/task-type-details',
  async (params?: TypesRequestCode) => {
    try {
      const response = await getStatusAndPriority(params);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCompetitorCompanyList = createAsyncThunk(
  'competitor-company/list',
  async (params?: {
    sortBy: string;
    order: string;
    page: number;
    limit: number;
    filter: Record<string, unknown>;
  }) => {
    try {
      const response = await getCompetitorCompanyList(params);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const resetStaffPin = createAsyncThunk(
  'staff/resetPin',
  async (staffId: number, { rejectWithValue }) => {
    try {
      const response = await resetStaffPinApi(staffId);
      if (response.isSuccess) {
        return response;
      } else {
        return rejectWithValue(response.code);
      }
    } catch (error: any) {
      if (error.response?.data?.code) {
        return rejectWithValue(error.response.data.code);
      }
      return rejectWithValue(error.message || 'Failed to reset staff PIN');
    }
  }
);
