import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  contentContainer: ViewStyle;
  loadingContainer: ViewStyle;
  errorContainer: ViewStyle;
  shareIconContainer: ViewStyle;
  tagContainer: ViewStyle;
  tag: ViewStyle;
  tagText: TextStyle;
  title: TextStyle;
  contentSection: ViewStyle;
  contentText: TextStyle;
  buttonContainer: ViewStyle;
  downloadButton: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: scale(20),
    paddingBottom: verticalScale(30),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIconContainer: {
    width: scale(24),
    height: scale(24),
  },
  tagContainer: {
    marginBottom: verticalScale(16),
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gray100,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
  },
  tagText: {
    fontSize: scale(12),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: scale(24),
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: verticalScale(20),
    lineHeight: scale(32),
  },
  contentSection: {
    marginBottom: verticalScale(24),
  },
  contentText: {
    fontSize: scale(16),
    color: colors.textPrimary,
    lineHeight: scale(24),
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    paddingTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  downloadButton: {
    backgroundColor: colors.primary,
  },
});

