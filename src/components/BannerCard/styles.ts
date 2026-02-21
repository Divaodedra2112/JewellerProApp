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
};

export const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(180),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    marginVertical: verticalScale(12),
    backgroundColor: colors.gray50,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    opacity: 0.9,
  },
});

