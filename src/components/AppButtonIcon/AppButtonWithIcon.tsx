import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import { colors } from '../../utils/theme';
import { ArrowRightIcon } from '../../assets/icons/svgIcons/appSVGIcons';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  children: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  rightSideIcon?: React.ReactNode;
  leftSideIcon?: React.ReactNode;
  color?: string;
  size?: 'small' | 'large';
}

export const AppButtonWithIcon = ({
  variant = 'primary',
  style,
  textStyle,
  disabled,
  children,
  onPress,
  loading = false,
  rightSideIcon,
  leftSideIcon,
  color = colors.white,
  size = 'small',
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
        <ActivityIndicator size={size} color={color} />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.iconLeftContainer}>
            {leftSideIcon && <View style={styles.iconLeftContainer}>{leftSideIcon}</View>}
          </View>

          <Text
            style={[
              styles.text,
              variant === 'secondary' && styles.secondaryText,
              textStyle,
              disabled && styles.disabledText,
            ]}
          >
            {children}
          </Text>
          <View style={styles.iconContainer}>
            {rightSideIcon && <View style={styles.iconContainer}>{rightSideIcon}</View>}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
