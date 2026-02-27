import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: verticalScale(16),
    gap: verticalScale(10),
  },
  input: {
    width: scale(70),
    height: verticalScale(70),
    borderWidth: verticalScale(2),
    borderRadius: verticalScale(12),
    textAlign: 'center',
    fontSize: verticalScale(40),
    borderColor: colors.gray100,
    backgroundColor: colors.white,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: colors.Gray80,
  },
  focusedInput: {
    borderColor: colors.gray100,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: verticalScale(2),
  },
});
