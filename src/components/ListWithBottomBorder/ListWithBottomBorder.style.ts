import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
  },
  itemContainer: {
    paddingVertical: moderateScale(10),
  },
  itemText: {
    fontSize: moderateScale(14),
    color: colors.Gray80,
  },
  separator: {
    height: 1,
    backgroundColor: colors.Gray20,
  },
});
