import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(68, 64, 60, 0.7)', // Same color with 90% opacity
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    width: moderateScale(343), // Moderate scale for width
    padding: moderateScale(20), // Moderate scale for padding
    backgroundColor: colors.white,
    borderRadius: moderateScale(32), // Moderate scale for border-radius
    elevation: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: moderateScale(24), // Moderate scale for font size
    // marginBottom: verticalScale(10), // Vertical scale for margin
    marginTop: verticalScale(24), // Vertical scale for margin
    textAlign: 'center',
    color: colors.Gray80,
  },
  message: {
    fontWeight: '400',
    marginTop: verticalScale(12), // Vertical scale for margin
    fontSize: moderateScale(16), // Moderate scale for font size
    marginBottom: verticalScale(20), // Vertical scale for margin
    color: colors.gray1000,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(10),
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
  },
  button: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.transparent,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.gray100,
    marginBottom: moderateScale(10),
  },
  buttonBorder: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.redButtonColor,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  buttonText2: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  uploadButtonIcon: {
    width: scale(40), // Scaling icon width
    height: scale(40), // Scaling icon height
    resizeMode: 'contain',
  },
  iconStyle: {
    alignItems: 'center',
    marginTop: moderateScale(35),
  },
});

export default styles;
