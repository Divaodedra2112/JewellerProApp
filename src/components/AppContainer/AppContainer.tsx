import React from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import CommonStyles from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppContainerProps {
  isTopSafeArea?: boolean;
  isBottomSafeArea?: boolean;
  bottomColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  noPadding?: boolean;
  noHorizontalPadding?: boolean;
}

const AppContainer = (props: AppContainerProps) => {
  const {
    children,
    isTopSafeArea = true,
    isBottomSafeArea = false,
    bottomColor = '',
    backgroundColor = colors.transparent,
    style = {},
    noPadding = false,
    noHorizontalPadding = false,
  } = props;

  return (
    <SafeAreaView
      style={[CommonStyles.flex, { backgroundColor }]}
      edges={isTopSafeArea ? ['left', 'right'] : ['top', 'left', 'right']}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Layout style={[CommonStyles.flex, style]}>{children}</Layout>
    </SafeAreaView>
  );
};

export default AppContainer;
