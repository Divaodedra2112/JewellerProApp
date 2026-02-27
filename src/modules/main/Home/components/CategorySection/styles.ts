import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  seeAllText: TextStyle;
  scrollContent: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: scale(14),
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: scale(10),
    paddingRight: scale(20),
  },
});

