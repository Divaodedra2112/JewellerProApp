import React, { ReactNode } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';
import { styles } from './styles';
import { colors } from '../../utils/theme';
import { scale, verticalScale } from '../../utils/Responsive';

interface AppInputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const AppInputField: React.FC<AppInputFieldProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  return (
    <View style={styles.wrapper}>
      {label && (
        <AppText variant={TEXT_VARIANTS.h4_large} style={[styles.label, labelStyle]}>
          {label}
        </AppText>
      )}
      <View style={[styles.inputContainer, containerStyle]}>
        <TextInput
          {...textInputProps}
          placeholderTextColor={colors.inputLabel}
          style={[styles.input, inputStyle]}
          cursorColor={colors.black}
          selectionColor={colors.black}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <AppText style={styles.errorText} variant={TEXT_VARIANTS.h4_small}>
          {error}
        </AppText>
      )}
    </View>
  );
};

