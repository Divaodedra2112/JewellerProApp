import { StyleSheet, ViewStyle } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale, scale } from '../../utils/Responsive';

const BUTTON_COLOR = '#173051';

export const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: verticalScale(50),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    flexDirection: 'row',
    gap: scale(8),
    marginTop: verticalScale(8),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  primary: {
    backgroundColor: BUTTON_COLOR,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: BUTTON_COLOR,
  },
  disabled: {
    backgroundColor: BUTTON_COLOR,
    opacity: 0.6,
  },
  text: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
  },
  disabledText: {
    color: colors.white,
    opacity: 0.6,
  },
  secondaryText: {
    color: BUTTON_COLOR,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
