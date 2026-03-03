import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { SCREEN_PADDING_HORIZONTAL } from '../../../../../utils/layoutConstants';

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  seeAllText: TextStyle;
  grid: ViewStyle;
  gridItem: ViewStyle;
  gridItemLastInRow: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: '30%',
    marginRight: scale(12),
    marginBottom: verticalScale(12),
  },
  gridItemLastInRow: {
    marginRight: 0,
  },
});

