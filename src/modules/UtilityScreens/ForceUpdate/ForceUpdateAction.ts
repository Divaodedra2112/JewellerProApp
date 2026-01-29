import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkVersionApi } from './ForceUpdate.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast, TOAST_TYPE } from '../../../utils/toast';
import { RootState } from '../../../store/reducers';

const getErrorMessage = (error: any) => {
  return error?.response?.data?.message || error?.message || 'Failed to check version';
};

export const checkVersion = createAsyncThunk(
  'forceUpdate/checkVersion',
  async (_, { rejectWithValue }) => {
    try {
      const needsUpdate = await checkVersionApi();
      return needsUpdate;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      showToast(TOAST_TYPE.ERROR, errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const useForceUpdate = () => {
  const dispatch = useDispatch();
  const { isUpdateRequired, loading, error } = useSelector((state: RootState) => state.forceUpdate);

  const handleUpdate = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/your-app-id',
      android: 'https://play.google.com/store/apps/details?id=your.app.id',
    });

    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  useEffect(() => {
    dispatch(checkVersion());
  }, [dispatch]);

  return {
    isUpdateRequired,
    loading,
    error,
    handleUpdate,
  };
};
