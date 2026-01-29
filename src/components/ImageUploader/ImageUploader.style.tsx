import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale, widthPx } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.ScreenBGColor,
  },
  mainTitle: {
    fontSize: moderateScale(14), // Moderate scaling for font size
    fontWeight: '700',
    lineHeight: verticalScale(20), // Vertical scale for line height
    fontFamily: Fonts.bold,
    color: colors.Gray80,
    marginBottom: verticalScale(12), // Vertical scale for margin
    alignSelf: 'flex-start',
  },
  mainTitleUploadImageList: {
    fontSize: moderateScale(16), // Moderate scaling for font size
    fontWeight: '700',
    lineHeight: verticalScale(20), // Vertical scale for line height
    fontFamily: Fonts.bold,
    color: colors.Gray80,
    marginTop: verticalScale(12), // V
    marginBottom: verticalScale(12), // Vertical scale for margin
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: moderateScale(16), // Moderate scaling for font size
    fontWeight: '600',
    lineHeight: verticalScale(22), // Vertical scale for line height
    textAlign: 'center',
    fontFamily: Fonts.semi_bold,
    color: colors.gray1000,
    marginTop: verticalScale(16), // Vertical scale for margin
  },
  uploadArea: {
    width: '100%',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: moderateScale(32), // Moderate scale for border-radius
    paddingVertical: verticalScale(25), // Vertical scale for padding
    paddingHorizontal: widthPx(4), // Width-based padding
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom: verticalScale(20), // Vertical scale for margin
  },
  subtitle: {
    color: colors.Gray40,
    fontSize: moderateScale(14), // Moderate scaling for font size
    fontWeight: '400',
    fontFamily: Fonts.regular,
    marginTop: verticalScale(8), // Vertical scale for margin
  },
  uploadButton: {
    backgroundColor: colors.red,
    paddingVertical: verticalScale(14), // Vertical scale for padding
    paddingHorizontal: widthPx(5), // Width-based padding
    borderRadius: moderateScale(100), // Moderate scale for border-radius
    marginTop: verticalScale(20), // Vertical scale for margin
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: moderateScale(14), // Moderate scaling for font size
    fontWeight: '400',
    fontFamily: Fonts.regular,
    lineHeight: verticalScale(20), // Vertical scale for line height
    marginRight: widthPx(2), // Width-based margin
  },
  uploadButtonIcon: {
    width: scale(16), // Scaling icon width
    height: scale(16), // Scaling icon height
    resizeMode: 'contain',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: moderateScale(32), // Make the width slightly larger to wrap images properly
  },
  imageWrapper: {
    position: 'relative',
    margin: moderateScale(5), // Moderate scale for margin
    borderRadius: moderateScale(12), // Moderate scale for border radius
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.transparent,
    backgroundColor: colors.white,
  },
  image: {
    width: scale(100), // Scale image width based on screen width
    height: scale(100), // Scale image height based on screen width
    borderRadius: moderateScale(12), // Moderate scale for border radius
  },
  closeButton: {
    position: 'absolute',
    top: verticalScale(10), // Vertical scale for positioning
    right: widthPx(2), // Width-based positioning
    backgroundColor: colors.white,
    borderRadius: moderateScale(12), // Moderate scale for border radius
    width: scale(20), // Scale button width
    height: scale(20), // Scale button height
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  closeButtonText: {
    color: '#333',
    fontSize: moderateScale(14), // Moderate scaling for font size
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: verticalScale(20), // Vertical scale for margin
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(14), // Moderate scaling for font size
  },
  description: {
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: scale(24),
    color: colors.gray1000,
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
});

export default styles;
