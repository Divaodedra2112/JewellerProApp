import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(100),
  },
  priorityText: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    marginLeft: moderateScale(4),
    flexShrink: 1,
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
  indicatorStyle: {
    width: 100,
  },
});

export default styles;
