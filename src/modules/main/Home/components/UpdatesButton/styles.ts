import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors, Fonts } from '../../../../../utils/theme';

type Styles = {
  container: ViewStyle;
  touchable: ViewStyle;
  text: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(20),
    marginVertical: verticalScale(12),
    borderRadius: moderateScale(12),
    overflow: 'hidden', // Ensure gradient respects border radius
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
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  text: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: Fonts.bold,
  },
});

