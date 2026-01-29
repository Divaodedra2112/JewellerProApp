import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  scrollView: {
    maxHeight: 100,
    flexGrow: 0,
  },
  text: {
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: moderateScale(25.6),
    color: colors.gray1000,
    fontFamily: Fonts.regular,
  },
});
