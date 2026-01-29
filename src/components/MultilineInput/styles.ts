import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  input: {
    borderColor: colors.gray100,
    marginTop: moderateScale(36), // Moderate scale for margin
    marginVertical: moderateScale(16), // Moderate scale for vertical margin
    borderRadius: moderateScale(32), // Moderate scale for border-radius

    // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: verticalScale(2) }, // Vertical scale for shadow offset
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4), // Moderate scale for shadow radius
    backgroundColor: colors.white, // Needed for iOS shadow to be visible

    // Android shadow
    elevation: 4,
  },

  inputTextStyle: {
    minHeight: moderateScale(200), // Moderate scale for height
    maxHeight: moderateScale(250), // Moderate scale for max height
    textAlignVertical: 'top',
    paddingTop: moderateScale(16), // Moderate scale for padding
    paddingLeft: moderateScale(16), // Moderate scale for padding
    paddingRight: moderateScale(16), // Moderate scale for padding
    paddingBottom: moderateScale(16), // Moderate scale for padding
    fontWeight: '400',
    fontSize: moderateScale(20), // Moderate scale for font size
    lineHeight: moderateScale(32), // Moderate scale for line height
    fontFamily: Fonts.regular,
  },
  accessoryView: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  doneButton: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  doneButtonText: {
    color: colors.primary,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default styles;
