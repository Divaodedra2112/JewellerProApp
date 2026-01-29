import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: moderateScale(10),
  },
  message: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    color: colors.textSecondary,
    lineHeight: moderateScale(25),
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default styles;
