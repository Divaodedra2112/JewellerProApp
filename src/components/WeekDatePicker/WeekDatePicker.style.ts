// week_date_picker.style.ts
import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dateItem: {
    width: scale(55),
    height: scale(55),
    borderRadius: moderateScale(12),
    backgroundColor: colors.ScreenBGColor,
    marginHorizontal: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.Gray20,
    borderWidth: 1,
  },
  selectedDateItem: {
    borderColor: colors.Gray80,
    borderWidth: 1,
    backgroundColor: colors.gray1100,
  },
  dayName: {
    fontSize: scale(10),
    fontWeight: '800',
    color: colors.Gray40,
    fontFamily:Fonts.extra_bold
  },
  dayNumber: {
    marginTop: verticalScale(2),
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.Gray80,
    fontFamily:Fonts.bold
  },
  selectedDayText: {
    fontSize: scale(10),
    fontWeight: '800',
    color: colors.Gray80,
    fontFamily:Fonts.extra_bold
  },
  selectedDateText: {
    marginTop: verticalScale(2),
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.Gray80,
    fontFamily:Fonts.bold
  },
});

export default styles;
