import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(10),
    marginTop: moderateScale(40),
  },
  leftContainer: {
    alignItems: 'flex-start',
    flex: 1.5,
  },
  titleContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1.5,
  },
  /** Fixed-size touch area for each right-side icon to prevent overlap (no hitSlop overflow) */
  headerIconTouchable: {
    width: moderateScale(44),
    height: moderateScale(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(16),
    fontFamily: Fonts.semi_bold,
  },
  subtitle: {
    fontSize: scale(12),
    fontFamily: Fonts.regular,
    color: colors.black,
    marginTop: moderateScale(2),
  },
});
