import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.gray1100,
    borderRadius: moderateScale(30),
    padding: moderateScale(4),
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(30),
  },
  selectedOption: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontFamily: Fonts.semi_bold,
    color: colors.gray1000,
    fontSize: moderateScale(14),
  },
  selectedText: {
    fontFamily: Fonts.semi_bold,
    color: colors.Gray80,
    fontSize: moderateScale(14),
  },
});
