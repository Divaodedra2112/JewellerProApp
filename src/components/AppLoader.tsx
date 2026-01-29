import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

interface AppLoaderProps {
  isLoading: boolean;
  text?: string;
  style?: ViewStyle; // Add style prop
  loadercolor?: string; // Deprecated: Always uses black now
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  isLoading,
  text = 'Loading...',
  style,
  loadercolor: _loadercolor, // Keep for backward compatibility but ignore
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundColor: colors.ScreenBGColor,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        },
        style, // Apply passed style
      ]}
    >
      <ActivityIndicator size="small" color={_loadercolor || colors.black} />
      {/* <Text style={{ marginTop: 10, color: colors.primary }}>{text}</Text> */}
    </View>
  );
};
