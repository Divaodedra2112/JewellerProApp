import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

const CARD_BLUE = '#173051';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  textBlock: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
  illustrationBlock: ViewStyle;
  illustration: ImageStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
    backgroundColor: CARD_BLUE,
    borderRadius: moderateScale(18),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: scale(6),
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
  },
  textBlock: {
    flex: 1,
    maxWidth: '70%',
  },
  title: {
    fontSize: scale(24),
    color: colors.white,
    marginBottom: verticalScale(8),
  },
  description: {
    fontSize: scale(14),
    color: 'rgba(255, 255, 255, 0.92)',
    lineHeight: scale(20),
    marginBottom: verticalScale(14),
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(10),
    gap: scale(4),
  },
  viewButtonText: {
    color: colors.white,
    fontSize: scale(14),
  },
  illustrationBlock: {
    width: scale(100),
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  illustration: {
    width: scale(90),
    height: scale(70),
  },
});
