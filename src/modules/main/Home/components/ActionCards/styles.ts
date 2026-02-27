import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

type Styles = {
  container: ViewStyle;
  card: ViewStyle;
  halfWidthCard: ViewStyle;
  fullWidthCard: ViewStyle;
  cardHeader: ViewStyle;
  cardContent: ViewStyle;
  cardTitle: TextStyle;
  cardSubtitle: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(12),
    gap: scale(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    padding: scale(16),
    // Shadow properties
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3, // For Android
  },
  halfWidthCard: {
    flex: 1,
    minHeight: verticalScale(100),
  },
  fullWidthCard: {
    width: '100%',
    minHeight: verticalScale(100),
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: verticalScale(8),
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: verticalScale(4),
  },
  cardSubtitle: {
    fontSize: scale(12),
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

