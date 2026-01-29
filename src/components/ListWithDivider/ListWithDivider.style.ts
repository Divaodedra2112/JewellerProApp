import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(24),
    padding: moderateScale(16),
    marginBottom: verticalScale(20),
    shadowColor: colors.commonShadowColor,
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(10),
    elevation: 5,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(18),
    color: colors.Gray80,
    fontWeight: '700',
    lineHeight: moderateScale(24),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  divider: {
    height: 1,
    backgroundColor: colors.Gray20,
    marginVertical: verticalScale(4),
    marginHorizontal: 0,
  },
  itemName: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(16),
    color: colors.commonShadowColor,
    fontWeight: '500',
    lineHeight: moderateScale(22),
    marginTop: verticalScale(6),
  },
  showAllBtnContainer: {
    alignItems: 'flex-end',
    marginTop: verticalScale(12),
  },
  showAllBtn: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
  },
  expandBtnText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.gray1000,
    fontFamily: Fonts.medium,
  },
});
