import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: verticalScale(24),
  },
  title: {
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  subtitle: {
    color: colors.gray1000,
    marginBottom: verticalScale(16),
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: scale(24),
  },
  goToListText: {
    color: Colors.black,
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(16),
    width: '100%',
  },
  secondaryButton: {
    marginTop: verticalScale(8),
    width: '100%',
    backgroundColor: colors.transparent,
  },
  secondaryButtonText: {
    color: colors.gray1000,
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    lineHeight: scale(22),
  },
  goToListButton: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharePinButton: {
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
});

export default styles;
