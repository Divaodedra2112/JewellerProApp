import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(100),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
  },
  priorityText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  NoPriorityText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    textAlign: 'center',
    color: colors.gray1000,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(16),
    minHeight: moderateScale(300),
  },
  titleContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(32),
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: colors.Gray80,
  },
});

export default styles;
