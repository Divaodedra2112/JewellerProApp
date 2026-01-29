import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  commonFlex1: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  ccs: {
    paddingBottom: moderateScale(16),
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
  // Header (search + meta + actions)
  searchBarContainer: {
    // paddingHorizontal: moderateScale(5),
    marginBottom: verticalScale(8),
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  roadCount: {
    marginVertical: moderateScale(8),
  },
  allResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    paddingHorizontal: moderateScale(5),
  },
  refreshTouch: {
    marginLeft: verticalScale(8),
    padding: moderateScale(4),
  },
  selectAllIconTouch: {
    marginLeft: 'auto',
    padding: moderateScale(4),
  },
  selectAllTouch: {
    marginLeft: verticalScale(12),
    padding: moderateScale(4),
  },
});
