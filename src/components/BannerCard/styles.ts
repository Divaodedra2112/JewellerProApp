import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

type Styles = {
  card: ViewStyle;
  cardImage: ImageStyle;
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: moderateScale(12),
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  viewButton: {
    position: 'absolute',
    bottom: verticalScale(26),
    left: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    gap: scale(6),
    zIndex: 10,
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: scale(14),
    fontWeight: '600',
  },
});

