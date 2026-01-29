import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from './Responsive';
import { colors } from './theme';

export const defaultIconSizes = {
  xxsmall: moderateScale(10),
  xsmall: moderateScale(16),
  small: moderateScale(20),
  xmedium: moderateScale(24),
  medium: moderateScale(30),
  xlarge: moderateScale(38),
  large: moderateScale(40),
  xllarge: moderateScale(42),
};

export const defaultImageSize = {
  xxsmall: moderateScale(10),
  xsmall: moderateScale(20),
  smallx: moderateScale(25),
  smallTwentyEight: moderateScale(28),
  small: moderateScale(30),
  smallThirtyTwo: moderateScale(32),
  smallThirtyFour: moderateScale(34),
  smallThirtySix: moderateScale(36),
  xmedium: moderateScale(40),
  mediumFourtySeven: moderateScale(47),
  medium: moderateScale(50),
  xlarge: moderateScale(60),
  large: moderateScale(70),
  xllarge: moderateScale(80),
  xlllarge: moderateScale(96),
};

export const defaultAlertIconSize = {
  width: moderateScale(200),
  height: moderateScale(137),
};

const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: { flexDirection: 'row' },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    flex: 1,
  },
});

export default CommonStyles;

export const outerShadow = {
  backgroundColor: colors.white,
  borderRadius: moderateScale(8),
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};
export const borderRadius = {
  borderRadius: moderateScale(8),
};
export const roundedBorderRadius = {
  borderRadius: moderateScale(24),
};
