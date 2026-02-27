import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors, Fonts } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  subtitle2: TextStyle;
  form: ViewStyle;
  timerText: TextStyle;
  resendContainer: ViewStyle;
  resendText: TextStyle;
  resendButton: ViewStyle;
  buttonContainer: ViewStyle;
  otpContainer: ViewStyle;
  error: TextStyle;
  resendActive: TextStyle;
  backgroundImage: ImageStyle;
  content: ViewStyle;
  noCodeText: TextStyle;
  disableResendText: TextStyle;
  headerContainer: ViewStyle;
  errorBox: ViewStyle;
  errorText: TextStyle;
  loaderContainer: ViewStyle;
  headerView: ViewStyle;
  authHeader: ViewStyle;
  authHeaderTitle: TextStyle;
  backButton: ViewStyle;
  logo: ImageStyle;
  resendTimerText: TextStyle;
  resendLink: TextStyle;
  resendTouch: ViewStyle;
  errorRow: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: { paddingHorizontal: moderateScale(16) },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(39),
    marginBottom: verticalScale(20),
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: verticalScale(19),
    marginBottom: verticalScale(20),
  },
  image: {
    width: scale(150),
    height: verticalScale(139),
  },
  title: {
    fontSize: scale(24),
    marginBottom: verticalScale(12),
    marginTop: verticalScale(32),
    color: colors.textPrimary,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    paddingHorizontal: scale(70),
    lineHeight: scale(24),
  },
  subtitle2: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: scale(24),
  },
  form: {
    gap: verticalScale(24),
    alignItems: 'center',
  },
  timerText: {
    textAlign: 'center',
    color: colors.gray1000,
  },
  disableResendText: {
    color: colors.gray100,
    marginTop: verticalScale(2),
    textDecorationLine: 'underline',
    fontFamily: Fonts.medium,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(12),
  },
  resendText: {
    color: colors.gray50,
    marginTop: verticalScale(2),
    textDecorationLine: 'underline',
  },
  resendActive: {
    color: colors.textPrimary,
    textDecorationLine: 'underline',
    marginTop: verticalScale(2),
  },
  resendButton: {
    padding: 0,
    margin: 0,
  },
  otpContainer: {
    marginBottom: verticalScale(15),
  },
  error: {
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    marginTop: verticalScale(20),
  },
  buttonContainer: {
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(22),
  },
  noCodeText: {
    lineHeight: scale(24),
  },
  errorBox: {
    backgroundColor: '#FFE4E6',
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(24),
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  errorText: {
    color: '#B91C1C',
    textAlign: 'center',
  },
  authHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(56),
    paddingBottom: verticalScale(8),
  },
  authHeaderTitle: {
    fontSize: scale(18),
    fontFamily: Fonts.semi_bold,
    color: colors.textPrimary,
  },
  backButton: {
    width: scale(44),
    alignItems: 'flex-start',
  },
  logo: {
    width: scale(64),
    height: verticalScale(64),
    resizeMode: 'contain' as const,
  },
  resendTimerText: {
    color: colors.gray1000,
    marginBottom: verticalScale(4),
  },
  resendLink: {
    color: '#173051',
    fontFamily: Fonts.medium,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  resendTouch: {
    padding: scale(4),
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(24),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  loaderContainer: {
    position: 'absolute',
    bottom: verticalScale(100),
    left: 0,
    right: 0,
    paddingVertical: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
