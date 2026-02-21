import 'react-native-reanimated';
import 'react-native-gesture-handler';
import './src/config/i18n'; // Initialize i18n

// Import Reactotron only in development
if (__DEV__) {
  require('./ReactotronConfig').default;
}

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store, { persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppContainer } from './src/components';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreToken, setInitializing } from './src/store/slices/authSlice';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loadLanguage } from './src/store/slices/languageSlice';
import i18n from './src/config/i18n';
import { logger } from './src/utils/logger';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Load saved language preference
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage && ['en', 'gu', 'hi'].includes(savedLanguage)) {
          store.dispatch(loadLanguage(savedLanguage as 'en' | 'gu' | 'hi'));
          i18n.changeLanguage(savedLanguage);
        }

        const token = await AsyncStorage.getItem('access_token');
        // Only restore token if it exists and has valid format
        // Token expiration will be validated by API on first call
        if (token && token.trim().length > 0) {
          // Basic validation: check if token looks like a JWT (has 3 parts separated by dots)
          const tokenParts = token.split('.');
          if (tokenParts.length === 3 && tokenParts[1].length > 0) {
            // Token format is valid, restore it
            // API will handle expiration validation on first request
            store.dispatch(restoreToken(token));
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

  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        logger.error('App Error Boundary caught error', error, {
          componentStack: errorInfo.componentStack,
        });
      }}>
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
    </ErrorBoundary>
  );
};

export default App;
