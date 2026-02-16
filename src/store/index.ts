import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

// Import Reactotron for Redux integration (only in dev)
let Reactotron: any = null;
if (__DEV__) {
  try {
    Reactotron = require('../../ReactotronConfig').default;
  } catch (e) {
    // Reactotron not available
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation', 'permission'], // exclude volatile state like permissions
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: getDefaultEnhancers => {
    if (__DEV__ && Reactotron && typeof Reactotron.createEnhancer === 'function') {
      return getDefaultEnhancers().concat(Reactotron.createEnhancer());
    }
    return getDefaultEnhancers();
  },
});

// Set up Reactotron store connection
if (__DEV__ && Reactotron && typeof Reactotron.setReduxStore === 'function') {
  Reactotron.setReduxStore(store);
}

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
