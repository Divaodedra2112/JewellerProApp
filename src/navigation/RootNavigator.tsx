import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { RootStackParamList } from '../types/navigation';
import AuthNavigator from '../navigation/AuthNavigator';
import MainNavigator from '../navigation/MainNavigator';
import OfflineScreen from '../modules/UtilityScreens/OfflineScreen';
import UpdateRequiredScreen from '../modules/UtilityScreens/ForceUpdate/forceUpdateScreen';
import { useNetworkConnectivity } from '../hooks/useNetworkConnectivity';
import { View, AppState } from 'react-native';
import { useForceUpdate } from '../modules/UtilityScreens/ForceUpdate/ForceUpdateAction';
import { InitialAppLoader } from '../components/InitialAppLoader';
import { initializeAppData } from '../services/InitializationService';
import { setNavigationState, clearNavigationState } from '../store/slices/navigationSlice';
import { navigationRef } from './navigationRef';
import { logger } from '../utils/logger';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  onNavigationReady?: () => void;
};

const RootNavigator: React.FC<RootNavigatorProps> = ({ onNavigationReady }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { navigationState } = useSelector((state: RootState) => state.navigation);
  const isConnected = useNetworkConnectivity();
  const dispatch = useDispatch();
  const { isUpdateRequired, loading: versionCheckLoading } = useForceUpdate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  // Clear navigation state when logging out
  useEffect(() => {
    if (!token) {
      dispatch(clearNavigationState());
    }
  }, [token, dispatch]);

  useEffect(() => {
    // Token restoration is handled in App.tsx
    // We just need to mark as initialized here
    setIsInitialized(true);
  }, []);

  // Initialize app data when token changes
  useEffect(() => {
    if (token) {
      initializeAppData(dispatch);
    }
  }, [token, dispatch]);

  // Handle app state changes with debounced refresh
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active' && token) {
        logger.debug('App came to foreground');
        initializeAppData(dispatch);
      }
      if (nextAppState.match(/inactive|background/)) {
        logger.debug('App went to background');
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, token, dispatch, user]);

  const screenOptions = useCallback(
    () => ({
      headerShown: false,
      freezeOnBlur: true,
      lazy: false,
    }),
    []
  );

  // Show loader while checking version and initializing
  if (versionCheckLoading || !isInitialized) {
    return <InitialAppLoader isLoading={true} />;
  }

  // Show update screen if update is required
  if (isUpdateRequired) {
    return <UpdateRequiredScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      {!isConnected && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          <OfflineScreen />
        </View>
      )}
      <NavigationContainer
        ref={navigationRef}
        initialState={navigationState || undefined}
        onReady={onNavigationReady}
        onStateChange={state => {
          if (state) {
            dispatch(setNavigationState(state));
          }
        }}
      >
        <Stack.Navigator screenOptions={screenOptions}>
          {token ? (
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{
                gestureEnabled: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                gestureEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default RootNavigator;
