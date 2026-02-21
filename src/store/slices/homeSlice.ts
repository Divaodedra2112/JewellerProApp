import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHomeData } from '../../modules/main/Home/HomeActions';
import { HomeState, HomeData } from '../../modules/main/Home/HomeTypes';

const initialState: HomeState = {
  homeData: null,
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
      .addCase(fetchHomeData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action: PayloadAction<HomeData>) => {
        state.loading = false;
        state.homeData = action.payload;
        state.error = null;
        state.refreshing = false;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refreshing = false;
      });
  },
});

export const { setRefreshing, resetHomeState } = homeSlice.actions;

export default homeSlice.reducer;
