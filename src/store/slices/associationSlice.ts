import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAssociationInfo, AssociationInfo } from '../../services/associationService';

/**
 * Async thunk to fetch association information
 */
export const fetchAssociationInfo = createAsyncThunk(
  'association/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      const info = await getAssociationInfo();
      return info;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch association information');
    }
  }
);

interface AssociationState {
  info: AssociationInfo | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: AssociationState = {
  info: null,
  loading: false,
  error: null,
  lastFetched: null,
};

const associationSlice = createSlice({
  name: 'association',
  initialState,
  reducers: {
    clearAssociationInfo: (state) => {
      state.info = null;
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssociationInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssociationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAssociationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch association information';
      });
  },
});

export const { clearAssociationInfo } = associationSlice.actions;
export default associationSlice.reducer;


