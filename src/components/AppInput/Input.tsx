import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { Input as UIKittenInput, InputProps } from '@ui-kitten/components';
import { styles } from './styles';
import { AppText } from '../AppText/AppText';
import { colors } from '../../utils/theme';

interface CustomInputProps extends InputProps {
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  showPrefix?: boolean; // optional flag to show "+91"
  autoFocus?: boolean; // prop to control auto focus
  showBackText?: boolean;
}

export const Input = forwardRef<any, CustomInputProps>(
  (
    {
      style,
      returnKeyType = 'done',
      showPrefix = false,
      autoFocus = false,
      showBackText = false,
      ...props
    },
    ref
  ) => {
    return (
      <View style={showBackText && styles.inputWrapper}>
        {showPrefix && <Text style={styles.prefix}>+91</Text>}
        <UIKittenInput
          ref={ref}
          style={[styles.input, showPrefix && styles.inputWithPrefix, style]}
          status={props.error ? 'danger' : 'basic'}
          caption={props.error}
          textStyle={styles.textStyle}
          autoFocus={autoFocus}
          cursorColor={colors.black}
          selectionColor={colors.black}
          {...props}
        />
        {showBackText && <AppText>KG</AppText>}
      </View>
    );
  }
);
