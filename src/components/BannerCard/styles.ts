import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

type Styles = {
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  viewButton: {
    position: 'absolute',
    bottom: scale(16),
    left: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    gap: scale(6),
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: scale(14),
    fontWeight: '600',
  },
});

