import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors, Fonts } from '../../../../../utils/theme';
import { SCREEN_PADDING_HORIZONTAL } from '../../../../../utils/layoutConstants';

type Styles = {
  container: ViewStyle;
  gradient: ViewStyle;
  touchable: ViewStyle;
  text: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(5.5),
    marginVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: scale(4),
    elevation: 3,
    width: '100%',
    alignSelf: 'stretch',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    backgroundColor: 'transparent',
    gap: scale(12),
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: Fonts.semi_bold,
  },
});

