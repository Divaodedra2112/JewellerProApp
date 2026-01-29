import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  concernTitle: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(22),
    color: colors.Gray80,
  },
  deviderContainer: {
    marginVertical: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: colors.Gray20,
    height: moderateScale(1),
    width: '95%',
  },
  container: {
    backgroundColor: colors.white,
    // paddingHorizontal: moderateScale(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(6),
    alignContent: 'center',
  },
  bullet: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(22),
    marginRight: moderateScale(10),
    color: colors.gray1000,
    // marginTop: moderateScale(2),
  },
  itemText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(22),
    color: colors.gray1000,
  },
});
