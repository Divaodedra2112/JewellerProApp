import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: moderateScale(24),
    backgroundColor: colors.ScreenBGColor,
    borderRadius: moderateScale(24),
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: verticalScale(24),
  },
  title: {
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: verticalScale(16),
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(16),
    width: '80%',
  },
});

export default styles;
