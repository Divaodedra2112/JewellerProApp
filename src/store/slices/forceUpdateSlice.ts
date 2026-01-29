import { createSlice } from '@reduxjs/toolkit';
import { checkVersion } from '../../modules/UtilityScreens/ForceUpdate/ForceUpdateAction';

interface ForceUpdateState {
  isUpdateRequired: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ForceUpdateState = {
  isUpdateRequired: false,
  loading: false,
  error: null,
};

const forceUpdateSlice = createSlice({
  name: 'forceUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkVersion.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdateRequired = action.payload;
      })
      .addCase(checkVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default forceUpdateSlice.reducer;
