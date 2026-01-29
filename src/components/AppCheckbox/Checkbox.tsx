import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox as UIKittenCheckbox, CheckBoxProps } from '@ui-kitten/components';
import { verticalScale } from '../../utils/Responsive';

interface CustomCheckboxProps extends CheckBoxProps {
  error?: string;
}

export const Checkbox = ({ style, ...props }: CustomCheckboxProps) => {
  return (
    <UIKittenCheckbox
      style={[styles.checkbox, style]}
      status={props.error ? 'danger' : 'basic'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginVertical: verticalScale(8),
  },
});
