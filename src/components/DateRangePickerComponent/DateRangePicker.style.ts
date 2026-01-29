import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
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
  calendarToday: {
    borderColor: colors.gray1000,
    borderWidth: 1,
  },
  selectedRange: {
    backgroundColor: colors.gray400,
  },
  rangeDay: {
    backgroundColor: colors.gray400,
  },
  rangeMiddleLabel: {
    color: colors.white,
  },
  indicatorStyle: {
    width: 100,
  },
  doneButtonStyle: {
    marginTop: moderateScale(16),
    marginBottom: moderateScale(30),
  },
  dayLabel: {
    color: colors.black,
  },
  selectedLabel: {
    color: colors.white,
  },
  todayLabel: {
    color: colors.black,
  },
  disabledLabel: {
    color: colors.gray400,
  },
  buttonPrevImage: {
    tintColor: colors.gray400,
  },
  buttonNextImage: {
    tintColor: colors.gray400,
  },
  monthSelectorLabel: {
    color: colors.gray400,
  },
  yearSelectorLabel: {
    color: colors.gray400,
  },
  weekdayLabel: {
    color: colors.gray400,
  },
});

export default styles;
