import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDashboardData } from '../../modules/main/Home/HomeActions';
import { HomeState } from '../../modules/main/Home/HomeTypes';

const initialState: HomeState = {
  dashboardData: null,
  loading: false,
  error: null,
  refreshing: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },
    resetHomeState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
        state.error = null;
        state.refreshing = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refreshing = false;
      });
  },
});

export const { setRefreshing, resetHomeState } = homeSlice.actions;

export default homeSlice.reducer;
