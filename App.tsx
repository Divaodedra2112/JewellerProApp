import 'react-native-reanimated';
import 'react-native-gesture-handler';
import './src/config/i18n'; // Initialize i18n
import React, { useEffect, useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store, { persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppContainer } from './src/components';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreToken, setInitializing } from './src/store/slices/authSlice';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { AppState, AppStateStatus } from 'react-native';
import { configureRBACWithDefaultApi } from './src/rbac/configure';
import { get } from './src/services/api';
import {
  fetchPermissionCatalog,
  buildEffectivePermissions,
  setEffectivePermissions,
} from './src/rbac';
import { loadLanguage } from './src/store/slices/languageSlice';
import i18n from './src/config/i18n';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Handle app state changes
  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App came to foreground
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
          // Refresh permissions on resume if user exists
          try {
            const state: any = store.getState();
            const userPermissions = state?.auth?.user?.permissions;
            if (userPermissions) {
              await store.dispatch(fetchPermissionCatalog()).unwrap();
              const catalog = store.getState().permission.catalog;
              const effective = buildEffectivePermissions(userPermissions, catalog);
              store.dispatch(setEffectivePermissions(effective));
            }
          } catch (e) {
            console.warn('[RBAC] Permission refresh on resume failed:', e);
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    // Configure RBAC catalog fetcher once (decoupled from API layer)
    configureRBACWithDefaultApi(get);

    const checkToken = async () => {
      try {
        // Load saved language preference
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage && ['en', 'gu', 'hi'].includes(savedLanguage)) {
          store.dispatch(loadLanguage(savedLanguage as 'en' | 'gu' | 'hi'));
          i18n.changeLanguage(savedLanguage);
        }

        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          store.dispatch(restoreToken(token));

          // Try initial permission refresh if user already present (e.g., persisted)
          try {
            const state: any = store.getState();
            const userPermissions = state?.auth?.user?.permissions;
            if (userPermissions) {
              await store.dispatch(fetchPermissionCatalog()).unwrap();
              const catalog = store.getState().permission.catalog;
              const effective = buildEffectivePermissions(userPermissions, catalog);
              store.dispatch(setEffectivePermissions(effective));
            }
          } catch (e) {
            console.warn('[RBAC] Initial permission refresh failed:', e);
          }
        }
        store.dispatch(setInitializing(false));
        setIsReady(true);
      } catch (error) {
        console.error('Error checking token:', error);
        store.dispatch(setInitializing(false));
        setIsReady(true);
      }
    };

    checkToken();
  }, []);

  // Setup app state listener
  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  }, [handleAppStateChange]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
              <SafeAreaProvider>
                <SheetProvider>
                  <AppContainer>
                    <RootNavigator onNavigationReady={() => setIsNavigationReady(true)} />
                  </AppContainer>
                </SheetProvider>
              </SafeAreaProvider>
            </ApplicationProvider>
            <Toast />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
