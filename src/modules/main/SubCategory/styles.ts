import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  contentContainer: ViewStyle;
  loadingContainer: ViewStyle;
  errorContainer: ViewStyle;
  emptyContainer: ViewStyle;
  card: ViewStyle;
  cardContent: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  chevronContainer: ViewStyle;
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
    padding: scale(16),
    paddingBottom: verticalScale(20),
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(12),
    // Shadow properties
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
  },
  textContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  title: {
    fontSize: scale(16),
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: scale(14),
    color: colors.textSecondary,
    lineHeight: scale(20),
  },
  chevronContainer: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

