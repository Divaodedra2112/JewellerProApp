import { StyleSheet, Dimensions } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: moderateScale(20),
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  mainButton: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.commonShadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionItemContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    zIndex: 1001,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: moderateScale(48),
  },
  actionButton: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.commonShadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(24),
    marginRight: moderateScale(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: SCREEN_WIDTH * 0.35,
    maxWidth: SCREEN_WIDTH * 0.5,
    borderWidth: 0.5,
    borderColor: colors.Gray20,
  },
  actionLabel: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: colors.Gray80,
    textAlign: 'center',
    flexShrink: 1,
  },
  overlay: {
    position: 'absolute',
    top: -5000,
    left: -5000,
    right: -5000,
    bottom: -5000,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});

export default styles;
