import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  icon: ViewStyle;
  iconPlaceholder: ViewStyle;
  iconText: TextStyle;
  textContainer: ViewStyle;
  title: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    padding: scale(16),
    minHeight: verticalScale(120),
    // Shadow properties
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
  },
  content: {
    flex: 1,
  },
  icon: {
    width: scale(40),
    height: scale(40),
    marginBottom: verticalScale(12),
  },
  iconPlaceholder: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  iconText: {
    color: colors.white,
    fontSize: scale(18),
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: scale(16),
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

