import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: moderateScale(32),
    justifyContent: 'space-between',
    padding: moderateScale(16),
  },
  container2: {
    flex: 1,
  },
  commonFlex7: {
    flex: 7,
  },
  commonFlex3: {
    flex: 3,
  },
  commonAlignRight: {
    alignItems: 'flex-end',
  },
  textStyle: {
    fontSize: moderateScale(16),
    color: colors.gray1000,
  },
  textStyle2: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: colors.gray1000,
    lineHeight: moderateScale(22),
  },
  calendarContainer: {
    padding: 10,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(16),
    minHeight: moderateScale(400),
  },
});

export default styles;
