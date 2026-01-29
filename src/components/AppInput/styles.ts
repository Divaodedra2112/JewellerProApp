import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';

import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  input: {
    minHeight: moderateScale(40),
    borderRadius: moderateScale(124),
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.gray100,
    // textAlignVertical: 'center',
    // paddingLeft: 0,
  },
  textStyle: {
    fontWeight: '400',
    fontSize: moderateScale(20),
    fontFamily: Fonts.regular,
    height: moderateScale(40),
    lineHeight: moderateScale(25),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  prefix: {
    fontSize: 16,
    // marginRight: 8,
    color: '#000',
  },

  inputWithPrefix: {
    flex: 1,
    borderWidth: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
});
