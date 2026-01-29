import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
    backgroundColor: colors.ScreenBGColor,
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(120),
    marginBottom: verticalScale(24),
  },
  title: {
    marginBottom: verticalScale(8),
    textAlign: 'center',
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: verticalScale(16),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(16),
    width: '100%',
  },
});

export default styles;
