import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

interface AppLoaderProps {
  isLoading: boolean;
  style?: ViewStyle;
  loadercolor?: string;
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  isLoading,
  style,
  loadercolor: _loadercolor,
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
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        },
        style,
      ]}
    >
      <ActivityIndicator size="small" color={_loadercolor || colors.black} />
    </View>
  );
};
