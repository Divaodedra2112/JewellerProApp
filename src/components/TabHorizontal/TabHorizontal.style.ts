import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.gray1100,
    padding: moderateScale(6),
    borderRadius: moderateScale(999),
    width: '100%',
    alignSelf: 'stretch',
  },

  pill: {
    flex: 1,
    height: verticalScale(40),
    borderRadius: moderateScale(999),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(0),
    minWidth: 0,
  },

  pillPressed: { opacity: 0.7 },

  pillSelected: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: moderateScale(0), height: verticalScale(4) },
    shadowRadius: moderateScale(10),
    elevation: 3,
  },

  label: {
    fontWeight: '600',
    fontSize: scale(14),
    lineHeight: verticalScale(20),
    textAlign: 'center',
    color: colors.gray1000,
    fontFamily: Fonts.semi_bold,
  },

  labelSelected: {
    fontWeight: '600',
    fontSize: scale(14),
    lineHeight: verticalScale(20),
    textAlign: 'center',
    color: colors.Gray80,
    fontFamily: Fonts.semi_bold,
  },
});
