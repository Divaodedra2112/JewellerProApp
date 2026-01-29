import React from 'react';
import { Input as UIKittenInput, InputProps } from '@ui-kitten/components';
import { styles } from './styles';
import { colors } from '../../utils/theme';
import { showToast, TOAST_TYPE } from '../../utils/toast';

interface CustomInputProps extends InputProps {
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  minLength?: number;
}

export const InputReturn = ({
  style,
  returnKeyType = 'done',
  onSubmitEditing,
  value,
  onChangeText,
  error,
  minLength = 3,
  ...props
}: CustomInputProps) => {
  const handleSubmit = () => {
    if (value.length < minLength) {
      showToast(TOAST_TYPE.ERROR, `Please enter at least ${minLength} characters`);
      return;
    }
    onSubmitEditing?.();
  };

  return (
    <UIKittenInput
      style={[styles.input, style]}
      status={error ? 'danger' : 'basic'}
      caption={error}
      textStyle={styles.textStyle}
      returnKeyType={returnKeyType}
      onSubmitEditing={handleSubmit}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.gray1000}
      cursorColor={colors.black}
      selectionColor={colors.black}
      {...props}
      maxLength={20}
    />
  );
};
