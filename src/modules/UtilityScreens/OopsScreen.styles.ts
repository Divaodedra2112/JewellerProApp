import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
    backgroundColor: '#F8F8F8',
    borderRadius: moderateScale(24),
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(120),
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
    width: '100%',
  },
});

export default styles;
