import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

const CATEGORY_BLUE = '#173051';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  icon: ViewStyle;
  iconPlaceholder: ViewStyle;
  iconText: TextStyle;
  title: TextStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    width: scale(100),
    height: scale(100),
    backgroundColor: CATEGORY_BLUE,
    borderRadius: moderateScale(16),
    marginRight: scale(12),
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(12),
  },
  icon: {
    width: scale(40),
    height: scale(40),
    marginBottom: verticalScale(8),
    tintColor: colors.white,
  },
  iconPlaceholder: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconText: {
    color: colors.white,
    fontSize: scale(18),
    fontWeight: '700',
  },
  title: {
    fontSize: scale(12),
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
});

