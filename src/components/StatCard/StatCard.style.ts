import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(32),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: moderateScale(132),
    borderRadius: moderateScale(24),
  },
  numberText: {
    fontSize: moderateScale(36),
    fontFamily: Fonts.semi_bold,
    color: colors.gray1000,
    lineHeight: moderateScale(44),
    textAlign: 'center',
  },
  titleText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.semi_bold,
    color: colors.Gray80,
    lineHeight: moderateScale(20),
    textAlign: 'center',
  },
});
