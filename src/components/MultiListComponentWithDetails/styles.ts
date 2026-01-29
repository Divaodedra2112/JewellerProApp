import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';
import { defaultImageSize } from '../../utils/CommonStyles';

export const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.transparent,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
    padding: moderateScale(2),
    borderRadius: moderateScale(16),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: moderateScale(10),
  },
  text: {
    color: colors.black,
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    fontFamily: Fonts.medium,
  },
  shadowLayer1: {
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
    padding: moderateScale(10),
    borderRadius: moderateScale(16),
  },
  content: {
    backgroundColor: colors.white,
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  deviderContainer: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  divider: {
    backgroundColor: colors.Gray20,
    height: moderateScale(2),
    width: '100%',
  },
  companyImageSection: {
    width: moderateScale(defaultImageSize.xsmall),
    height: moderateScale(defaultImageSize.xsmall),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  companyImageCard: {
    width: moderateScale(defaultImageSize.xsmall),
    height: moderateScale(defaultImageSize.xsmall),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },
  labelStyle: {
    color: colors.Gray80,
    fontWeight: '600',
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    fontFamily: Fonts.semi_bold,
  },
  subLableStyle: {
    color: colors.gray1000,
    fontWeight: '500',
    fontSize: moderateScale(14),
    lineHeight: verticalScale(20),
    fontFamily: Fonts.medium,
  },
  fullflex: {
    flex: 9,
    marginLeft: moderateScale(12),
    marginRight: moderateScale(12),
  },
  fullFlexAddress: {
    color: colors.gray1000,
    fontWeight: '500',
    fontSize: moderateScale(14),
    lineHeight: verticalScale(20),
    fontFamily: Fonts.medium,
  },
});
