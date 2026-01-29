import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: colors.background,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: moderateScale(16),
  },
  message: {
    fontSize: moderateScale(16),
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
