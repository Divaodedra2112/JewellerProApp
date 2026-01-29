import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  swipContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(120),
    height: '100%',
    borderTopRightRadius: moderateScale(16),
    borderBottomRightRadius: moderateScale(16),
  },
  swipIconWithBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(68),
    height: '100%',
    backgroundColor: colors.redButtonColor,
  },
  swipIconWithOutBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(68),
    height: '100%',
    backgroundColor: colors.divider,
  },
  swipBackground: {
    marginHorizontal: moderateScale(5),
    marginBottom: verticalScale(10),
    backgroundColor: colors.ScreenBGColor,
    borderRadius: moderateScale(15),
  },
  commonBorder: {
    borderRadius: moderateScale(15),
  },
  layoutContainer: {
    flex: 1,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(5),
  },
  layoutContainerWithMarginBottom: {
    flex: 1,
    padding: moderateScale(16),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
  },
  gradeTitle: {
    fontSize: scale(16),
    fontWeight: '500',
    color: colors.Gray80,
    lineHeight: scale(22),
    fontFamily: Fonts.medium,
  },
  gradeDescription: {
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.gray1000,
    lineHeight: scale(20),
    fontFamily: Fonts.regular,
  },
  showMoreLessContainer: {
    alignItems: 'flex-end',
    marginTop: verticalScale(10),
  },
  showMoreLess: {
    fontSize: scale(12),
    fontWeight: '500',
    color: colors.gray1000,
    lineHeight: scale(20),
    fontFamily: Fonts.medium,
  },
  commonMarginBottom: {
    marginBottom: verticalScale(6),
  },
});
export default styles;
