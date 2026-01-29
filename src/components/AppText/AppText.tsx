import React from 'react';
import { Text as UIKittenText, TextProps } from '@ui-kitten/components';
import { moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const TEXT_VARIANTS = {
  h1: 'h1',
  h2: 'h2',
  h3_medium: 'h3_medium',
  h3_large: 'h3_large',
  h4_small: 'h4_small',
  h4_medium: 'h4_medium',
  h4_large: 'h4_large',
  h5_medium: 'h5_medium',
  h5_small: 'h5_small',
  h6_small: 'h6_small',
  h6_medium: 'h6_medium',
} as const;

export type TextVariantsTypes = typeof TEXT_VARIANTS;

interface AppTextProps extends TextProps {
  variant?: keyof TextVariantsTypes;
  style?: any;
}

const getTextStyle = (variant: keyof TextVariantsTypes) => {
  switch (variant) {
    case 'h1':
      return {
        fontFamily: Fonts.extra_bold,
        fontSize: moderateScale(32),
        color: colors.ascent,
      };
    case 'h2':
      return {
        fontFamily: Fonts.bold,
        fontSize: moderateScale(18),
        color: colors.ascent,
      };
    case 'h3_medium':
      return {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(16),
        color: colors.ascent,
      };
    case 'h3_large':
      return {
        fontFamily: Fonts.extra_large,
        fontSize: moderateScale(16),
        color: colors.ascent,
      };
    case 'h4_small':
      return {
        fontFamily: Fonts.regular,
        fontSize: moderateScale(14),
        color: colors.ascent,
      };
    case 'h4_medium':
      return {
        fontFamily: Fonts.bold,
        fontSize: moderateScale(14),
        color: colors.ascent,
      };
    case 'h4_large':
      return {
        fontFamily: Fonts.semi_bold,
        fontSize: moderateScale(14),
        color: colors.ascent,
      };
    case 'h5_medium':
      return {
        fontFamily: Fonts.regular,
        fontSize: moderateScale(12),
        color: colors.ascent,
      };
    case 'h5_small':
      return {
        fontFamily: Fonts.regular,
        fontSize: moderateScale(12),
        color: colors.ascent,
      };
    case 'h6_medium':
      return {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(10),
        color: colors.ascent,
      };
    case 'h6_small':
      return {
        fontFamily: Fonts.regular,
        fontSize: moderateScale(10),
        color: colors.ascent,
      };
    default:
      return {
        fontFamily: Fonts.regular,
        fontSize: moderateScale(14),
        color: colors.ascent,
      };
  }
};

export const AppText: React.FC<AppTextProps> = ({ variant = 'h4_medium', style, ...props }) => {
  const textStyle = getTextStyle(variant);

  return <UIKittenText style={[textStyle, style]} {...props} />;
};
