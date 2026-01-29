import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationState as NavigationStateType } from '@react-navigation/native';

interface NavigationState {
  navigationState: NavigationStateType | null;
}

const initialState: NavigationState = {
  navigationState: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationState: (state, action: PayloadAction<NavigationStateType>) => {
      state.navigationState = action.payload;
    },
    clearNavigationState: state => {
      state.navigationState = null;
    },
  },
});

export const { setNavigationState, clearNavigationState } = navigationSlice.actions;
export default navigationSlice.reducer;
