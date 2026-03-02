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
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: scale(4),
    elevation: 3,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  text: {
    color: '#333333',
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
  },
});

