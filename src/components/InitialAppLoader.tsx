import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';
import Images from '../utils/Images';

interface InitialAppLoaderProps {
  isLoading: boolean;
  loadercolor?: string; // Deprecated: Always uses black now
}

export const InitialAppLoader: React.FC<InitialAppLoaderProps> = ({
  isLoading,
  loadercolor: _loadercolor, // Keep for backward compatibility but ignore
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={Images.APP_LOGO} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator size="small" color={colors.black} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
