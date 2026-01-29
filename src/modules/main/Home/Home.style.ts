import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/theme';
import { moderateScale, verticalScale } from '../../../utils/Responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.ScreenBGColor,
    paddingHorizontal: moderateScale(11),
  },
  statCard: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginBottom: verticalScale(14),
  },
  commonFlex: {
    flex: 1,
  },
});
