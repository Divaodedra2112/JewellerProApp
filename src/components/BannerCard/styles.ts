import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

type Styles = {
  container: ViewStyle;
  image: ViewStyle;
  placeholder: ViewStyle;
  placeholderText: TextStyle;
  overlay: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    width: '95%',
    height: verticalScale(180),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginHorizontal: scale(10),
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
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray100,
  },
  placeholderText: {
    color: colors.gray400,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(16),
    backgroundColor: 'transparent',
  },
  title: {
    color: colors.white,
    fontSize: scale(20),
    fontWeight: '700',
    marginBottom: verticalScale(4),
  },
  description: {
    color: colors.white,
    fontSize: scale(14),
    opacity: 0.95,
    marginBottom: verticalScale(8),
    lineHeight: scale(20),
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    gap: scale(6),
    marginTop: verticalScale(8),
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: scale(14),
    fontWeight: '600',
  },
});

