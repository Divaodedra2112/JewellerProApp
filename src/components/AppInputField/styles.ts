import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

type Styles = {
  wrapper: ViewStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  rightIconContainer: ViewStyle;
  errorText: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: scale(14),
    fontWeight: '500',
    marginLeft: scale(8),
    color: colors.inputLabel,
    fontFamily: Fonts.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    minHeight: verticalScale(60),
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.gray100,
    borderTopWidth: 0,
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
    gap: scale(10),
    // Shadow properties matching Login screen: X: 0, Y: 1, Blur: 2, Spread: 0, Color: #000000, Opacity: 8%
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
  },
  input: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textPrimary,
    fontFamily: Fonts.regular,
    paddingVertical: 0,
  },
  rightIconContainer: {
    padding: scale(8),
  },
  errorText: {
    color: colors.error,
    fontSize: scale(14),
    textAlign: 'left',
    marginTop: verticalScale(4),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
  },
});

