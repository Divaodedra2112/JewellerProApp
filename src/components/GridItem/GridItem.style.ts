import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  selected: {
    borderColor: colors.black,
    borderWidth: 2,
  },
  card: {
    backgroundColor: colors.white, // Card background
    padding: moderateScale(16), // Padding inside the card
    margin: moderateScale(8), // Margin between cards
    borderRadius: moderateScale(10), // Round corners for card
    shadowColor: colors.black, // Shadow color for card
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: moderateScale(6), // Shadow radius
    elevation: 5, // Shadow for Android
    borderWidth: 1, // Border width
    borderColor: colors.transparent, // Transparent border color
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: colors.textPrimary,
    flexWrap: 'wrap',
    lineHeight: verticalScale(22),
  },
});
