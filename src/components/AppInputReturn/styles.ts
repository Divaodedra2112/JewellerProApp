import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';

import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  input: {
    height: verticalScale(56),
    borderRadius: moderateScale(124),
    borderWidth: 2,
    backgroundColor: colors.white,
    // backgroundColor: colors.red,
    borderColor: colors.gray100,
  },
  textStyle: {
    fontWeight: '400',
    fontSize: moderateScale(20),
    fontFamily: Fonts.regular,
    height: moderateScale(40),
    lineHeight: moderateScale(25),
  },
});
