import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

// Figma: white card, light gray icon circle with thin black border, dark text
const ICON_CIRCLE_SIZE = scale(60);
const CARD_RADIUS = 12;
const ICON_CIRCLE_BG = '#E5E7EB';
const TEXT_DARK = '#333333';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  iconCircle: ViewStyle;
  icon: ViewStyle;
  iconPlaceholder: ViewStyle;
  iconText: TextStyle;
  title: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: scale(100),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
  },
  iconCircle: {
    width: ICON_CIRCLE_SIZE,
    height: ICON_CIRCLE_SIZE,
    borderRadius: ICON_CIRCLE_SIZE / 3,
    backgroundColor:colors.themeColor,
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  icon: {
    width: scale(34),
    height: scale(34),
  },
  iconPlaceholder: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: TEXT_DARK,
    fontSize: scale(14),
    fontWeight: '700',
  },
  title: {
    fontSize: scale(12),
    color: TEXT_DARK,
    fontWeight: '500',
    textAlign: 'center',
  },
});

