import React, { type ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils/theme';

interface AppScrollViewProps extends KeyboardAwareScrollViewProps {
  children: ReactNode;
}

const IS_IOS = Platform.OS === 'ios';

const AppScrollView = (props: AppScrollViewProps) => {
  const { children, style, ...restProps } = props;

  return (
    <KeyboardAwareScrollView
      {...restProps}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      enableOnAndroid
      enableAutomaticScroll={IS_IOS}
      style={[styles.scrollView, { backgroundColor: colors.white }, style]}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default AppScrollView;
