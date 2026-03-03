import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { SCREEN_PADDING_HORIZONTAL } from '../../../../../utils/layoutConstants';

type Styles = {
  container: ViewStyle;
  card: ViewStyle;
  halfWidthCard: ViewStyle;
  fullWidthCard: ViewStyle;
  cardTopRow: ViewStyle;
  cardTitleWrap: ViewStyle;
  cardHeader: ViewStyle;
  cardTitle: TextStyle;
  cardSubtitle: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    marginVertical: verticalScale(12),
    gap: scale(12),
  },
  card: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    padding: scale(16),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  halfWidthCard: {
    flex: 1,
    minHeight: verticalScale(100),
  },
  fullWidthCard: {
    width: '100%',
    minHeight: verticalScale(100),
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
  },
  cardTitleWrap: {
    flex: 1,
    marginRight: scale(12),
  },
  cardHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: scale(15),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: scale(13),
    color: colors.textSecondary,
    fontWeight: '400',
    marginTop: verticalScale(2),
  },
});

