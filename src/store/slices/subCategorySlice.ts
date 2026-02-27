import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubCategories } from '../../modules/main/SubCategory/SubCategoryActions';
import { SubCategoryState, SubCategory } from '../../modules/main/SubCategory/SubCategoryTypes';

const initialState: SubCategoryState = {
  subCategories: [],
  loading: false,
  error: null,
  categoryId: null,
  categoryTitle: null,
};

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {
    setCategoryInfo: (
      state,
      action: PayloadAction<{ categoryId: string; categoryTitle: string }>
    ) => {
      state.categoryId = action.payload.categoryId;
      state.categoryTitle = action.payload.categoryTitle;
    },
    resetSubCategoryState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubCategories.fulfilled,
        (
          state,
          action: PayloadAction<{ subCategories: SubCategory[]; categoryId: string }>
        ) => {
          state.loading = false;
          state.subCategories = action.payload.subCategories;
          state.categoryId = action.payload.categoryId;
          state.error = null;
        }
      )
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategoryInfo, resetSubCategoryState } = subCategorySlice.actions;

export default subCategorySlice.reducer;

