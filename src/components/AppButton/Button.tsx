import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { colors } from '../../utils/theme';
import { AppText } from '../AppText/AppText';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  rightSideIcon?: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  style,
  textStyle,
  disabled,
  children,
  onPress,
  loading = false,
  rightSideIcon,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabled : variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      onPress={disabled || loading ? undefined : onPress}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <View style={styles.buttonContent}>
          <AppText style={[styles.text, textStyle, disabled && styles.disabledText, variant === 'secondary' && styles.secondaryText]}>
            {children}
          </AppText>
          {rightSideIcon && <View style={styles.iconContainer}>{rightSideIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};
