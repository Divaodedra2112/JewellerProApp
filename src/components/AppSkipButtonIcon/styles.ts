import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.primary,
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
    padding: verticalScale(14),
  },
  primary: {
    // backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.gray1100,
  },
  text: {
    color: colors.gray1000,
    fontSize: verticalScale(16),
    fontWeight: '600',
  },
  disabledText: {
    color: colors.gray100,
  },
  secondaryText: {
    color: colors.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 8,
  },
});
