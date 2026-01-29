import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    // avoid forcing full height; let content size itself similar to the screenshot
    paddingHorizontal: moderateScale(8),
  },

  // Card baseline to match screenshot
  card: {
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(1),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: colors.gray300,
  },

  // Selected ring/border (thin, primary)
  cardSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: colors.black,
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    fontFamily: Fonts.medium,
    fontWeight: '600',
  },
  itemContainer: {
    flex: 8,
  },
  selectItemContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
