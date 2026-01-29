import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { defaultIconSizes } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.transparent,
  },
  titleContainer: {
    marginTop: moderateScale(13),
    marginBottom: moderateScale(13),
    justifyContent: 'center',
  },
  title: {
    color: colors.Gray80,
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    fontSize: scale(16),
    lineHeight: verticalScale(22),
  },
  searchComponent: {
    marginBottom: moderateScale(10),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
    padding: moderateScale(2),
    borderRadius: moderateScale(16),
  },
  icon: {
    width: moderateScale(20),
    height: verticalScale(20),
    marginLeft: moderateScale(10),
  },
  text: {
    color: colors.black,
    fontWeight: '500',
    fontSize: scale(16),
    lineHeight: verticalScale(22),
    fontFamily: Fonts.medium,
  },
  shadowLayer1: {
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
    padding: moderateScale(10),
    borderRadius: moderateScale(16),
  },
  content: {
    backgroundColor: colors.white,
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  productContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    borderColor: colors.black,
    borderWidth: 1,
  },
  unselectedItem: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  staffIconContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  image: {
    width: defaultIconSizes.small,
    height: defaultIconSizes.small,
  },
  titleContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.Gray80,
    lineHeight: verticalScale(24),
  },
});

export default styles;
