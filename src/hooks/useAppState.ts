import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { logger } from '../utils/logger';

interface UseAppStateOptions {
  onForeground?: () => void;
  onBackground?: () => void;
  onChange?: (state: AppStateStatus) => void;
}

/**
 * Hook to monitor app state changes (foreground/background)
 * 
 * @example
 * ```tsx
 * useAppState({
 *   onForeground: () => {
 *     // App came to foreground
 *     refreshData();
 *   },
 *   onBackground: () => {
 *     // App went to background
 *     saveData();
 *   },
 * });
 * ```
 */
export const useAppState = (options: UseAppStateOptions = {}) => {
  const { onForeground, onBackground, onChange } = options;
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      const previousState = appState.current;
      appState.current = nextAppState;

      // Log state change
      logger.debug('App state changed', {
        from: previousState,
        to: nextAppState,
      });

      // Call onChange if provided
      onChange?.(nextAppState);

      // Handle foreground
      if (previousState.match(/inactive|background/) && nextAppState === 'active') {
        logger.info('App came to foreground');
        onForeground?.();
      }

      // Handle background
      if (previousState === 'active' && nextAppState.match(/inactive|background/)) {
        logger.info('App went to background');
        onBackground?.();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onForeground, onBackground, onChange]);
};

/**
 * Hook to check if app is in foreground
 */
export const useIsAppForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(
    AppState.currentState === 'active'
  );

  useAppState({
    onChange: (state) => {
      setIsForeground(state === 'active');
    },
  });

  return isForeground;
};

