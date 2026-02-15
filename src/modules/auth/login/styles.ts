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
    justifyContent: 'space-between',
    paddingBottom: verticalScale(20),
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
    width: scale(64),
    height: verticalScale(64),
    resizeMode: 'contain' as const,
  },
  title: {},
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phonePrefix: {
    fontSize: scale(16),
    marginRight: scale(8),
    color: colors.black,
  },

  form: {
    width: '100%',
    paddingHorizontal: scale(24),
    gap: verticalScale(0),
  },
  inputLabel: {
    fontSize: scale(14),
    fontWeight: '500',
    marginLeft: scale(8),
    color: colors.inputLabel,
    fontFamily: Fonts.medium,
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
    minHeight: verticalScale(60),
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.gray100,
    borderTopWidth: 0,
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
    gap: scale(10),
    // Shadow properties: X: 0, Y: 1, Blur: 2, Spread: 0, Color: #000000, Opacity: 8%
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
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
    marginTop: 'auto',
    paddingTop: verticalScale(20),
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
    fontSize: scale(24),
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
    minHeight: verticalScale(56),
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
