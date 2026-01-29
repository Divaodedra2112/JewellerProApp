import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import {defaultImageSize} from '../../utils/CommonStyles';

const styles = StyleSheet.create({
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




  imageSection: {
    width: moderateScale(defaultImageSize.medium),
    height: moderateScale(defaultImageSize.medium),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  imageCard: {
    width: moderateScale(defaultImageSize.medium),
    height: moderateScale(defaultImageSize.medium),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },

});

export default styles;
