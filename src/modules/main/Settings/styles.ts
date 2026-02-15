import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors, Fonts } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  settingsList: ViewStyle;
  settingsItem: ViewStyle;
  iconContainer: ViewStyle;
  settingsItemText: TextStyle;
  chevronContainer: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50), // Increased top spacing for header
  },
  title: {
    fontSize: scale(28),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Fonts.bold,
    marginBottom: verticalScale(24),
    letterSpacing: 0.5,
  },
  settingsList: {
    gap: verticalScale(0), // Reduced gap between items
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12), // Reduced vertical padding
    paddingHorizontal: scale(4),
    minHeight: verticalScale(48), // Reduced minimum height
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: scale(16),
  },
  settingsItemText: {
    flex: 1,
    fontSize: scale(16),
    fontWeight: '400',
    color: colors.textPrimary,
    fontFamily: Fonts.regular,
    letterSpacing: 0.2,
  },
  chevronContainer: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

