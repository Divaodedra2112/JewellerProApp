import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  swipeContentList: {
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(5),
  },
  content: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: 'transparent',
    elevation: 0,
  },
  swipContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(120),
    height: '100%',
    borderTopRightRadius: moderateScale(16),
    borderBottomRightRadius: moderateScale(16),
  },
  imageSection: {
    flex: 3,
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: moderateScale(1),
    borderColor: colors.transparent,
  },
  image: {
    width: scale(90),
    height: scale(90),
    backgroundColor: colors.imageBackground,
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: colors.transparent,
    overflow: 'hidden',
  },
  textSection: {
    flex: 6.5,
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  subTitle: {
    fontSize: scale(12),
    fontWeight: '500',
    color: colors.subText,
    lineHeight: scale(24),
    backgroundColor: colors.transparent,
    fontFamily: Fonts.medium,
  },
  title: {
    fontSize: scale(18),
    fontWeight: '500',
    color: colors.Gray80,
    lineHeight: scale(24),
    fontFamily: Fonts.medium,
  },
  description: {
    fontSize: scale(16),
    fontWeight: '500',
    color: colors.subText,
    lineHeight: scale(22),
    fontFamily: Fonts.medium,
  },
  sampleText: {
    fontSize: scale(12),
    color: colors.greenColor,
    fontWeight: '500',
    lineHeight: scale(24),
    fontFamily: Fonts.medium,
    marginLeft: verticalScale(2),
  },
  sampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  sampleIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(6),
  },
  logo: {
    width: scale(25),
    height: verticalScale(25),
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
  imageSize: {
    height: 100,
    width: 100,
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
  commonMarginBottom: {
    marginBottom: verticalScale(6),
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginTop: verticalScale(4),
  },
  pill: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.Gray20,
    borderRadius: 999,
  },
  showAllBtnContainer: {
    marginLeft: 'auto',
    marginTop: verticalScale(6),
  },
  showAllBtn: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(6),
  },
  pillText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.gray1000,
    lineHeight: scale(20),
    fontFamily: Fonts.medium,
  },
  expandBtnText: {
    fontSize: scale(12),
    fontWeight: '500',
    color: colors.gray1000,
    lineHeight: scale(16),
    fontFamily: Fonts.medium,
  },
  firstItemMarginTop: {
    marginTop: verticalScale(10),
  },
});
export default styles;
