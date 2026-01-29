import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.transparentBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(40),
    right: moderateScale(20),
    zIndex: 2,
    backgroundColor: colors.black,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  modalImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
