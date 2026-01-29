import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { fetchDashboardData } from './HomeActions';
import { DashboardData } from './HomeTypes';

interface HomeContextType {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  fetchData: () => void;
  refreshData: () => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return context;
};

interface HomeProviderProps {
  children: React.ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { dashboardData, loading, error, refreshing } = useSelector(
    (state: RootState) => state.home
  );

  const fetchData = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const refreshData = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Auto-fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value: HomeContextType = {
    dashboardData,
    loading,
    error,
    refreshing,
    fetchData,
    refreshData,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
