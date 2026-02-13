import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors, Fonts } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  logoContainer: ViewStyle;
  logo: ViewStyle;
  title: TextStyle;
  form: ViewStyle;
  inputLabel: TextStyle;
  input: ViewStyle;
  infoText: TextStyle;
  errorText: TextStyle;
  phoneRow: ViewStyle;
  phonePrefix: TextStyle;

  backgroundImage: ViewStyle;
  phoneInputContainer: ViewStyle;
  countryCode: TextStyle;
  phoneInput: ViewStyle;
  fixedBackgroundContainer: ViewStyle;
  fixedBackgroundImage: ViewStyle;
  foregroundContent: ViewStyle;
  versionContainer: ViewStyle;
  versionText: TextStyle;
  titleText: TextStyle;
  signInButton: ViewStyle;
  signInButtonText: TextStyle;
  signInButtonDisabled: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // make sure background can be absolutely positioned inside
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    marginBottom: verticalScale(10),
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: verticalScale(150),
    marginBottom: verticalScale(32),
  },
  logo: {
    width: scale(110),
    height: verticalScale(110),
    resizeMode: 'contain',
  },
  title: {},
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phonePrefix: {
    fontSize: 16,
    marginRight: 8,
    color: colors.black,
  },

  form: {
    width: '100%',
    paddingHorizontal: scale(24),
    gap: verticalScale(0),
  },
  inputLabel: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: scale(8),
    marginBottom: verticalScale(8),
    color: colors.textPrimary,
    fontFamily: Fonts.semi_bold,
  },
  input: {
    width: '100%',
    // height: verticalScale(44),
    borderRadius: moderateScale(50),
    fontSize: scale(16),
    // borderWidth: 1,
    // borderColor: colors.gray100,
    backgroundColor: colors.white,
    marginTop: verticalScale(4),
  },
  infoText: {
    fontSize: scale(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(32),
    lineHeight: scale(24),
  },
  errorText: {
    color: colors.error,
    fontSize: scale(14),
    textAlign: 'left',
    marginTop: verticalScale(4),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    minHeight: 60,
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.gray100,
    paddingHorizontal: scale(20),
    marginTop: verticalScale(8),
    gap: scale(10),
  },
  countryCode: {
    fontSize: scale(16),
    color: colors.textPrimary,
    fontFamily: Fonts.regular,
  },
  phoneInput: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textPrimary,
    fontFamily: Fonts.regular,
    paddingVertical: 0,
  },
  fixedBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  fixedBackgroundImage: {
    width: '100%',
    height: '100%',
  },

  foregroundContent: {
    flex: 1,
    zIndex: 1,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  versionText: {
    fontFamily: Fonts.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(14) * 1.6,
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.gray1000,
  },
  titleText: {
    fontSize: scale(28),
    fontWeight: '700',
    color: '#173051',
    fontFamily: Fonts.bold,
    marginTop: verticalScale(20),
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  signInButton: {
    backgroundColor: '#173051',
    borderRadius: moderateScale(50),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(32),
    gap: scale(10),
    minHeight: 56,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
});
