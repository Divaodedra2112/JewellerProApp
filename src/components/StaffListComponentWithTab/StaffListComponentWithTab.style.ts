import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { defaultIconSizes, defaultImageSize } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  title: {
    color: colors.Gray80,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    fontSize: scale(18),
    lineHeight: verticalScale(24),
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(12),
    padding: moderateScale(2),
    borderRadius: moderateScale(16),
    width: '75%',
  },
  nameLabel: {
    color: colors.Gray80,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    fontSize: scale(16),
    lineHeight: verticalScale(22),
  },
  roleLabel: {
    color: colors.subText,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: scale(14),
    lineHeight: verticalScale(20),
  },
  shadowLayer1: {
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
    padding: moderateScale(10),
    borderRadius: moderateScale(16),
  },
  imageSection: {
    width: moderateScale(defaultImageSize.medium),
    height: verticalScale(defaultImageSize.medium),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  imageCard: {
    width: moderateScale(defaultImageSize.medium),
    height: verticalScale(defaultImageSize.medium),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },
  searchComponent: {
    marginBottom: moderateScale(10),
  },
  staffItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  staffContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 8,
  },
  staffIconContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  selectedItem: {
    borderColor: colors.black,
    borderWidth: 1,
  },
  unselectedItem: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  image: {
    width: defaultIconSizes.small,
    height: defaultIconSizes.small,
  },
  loadingFooter: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
});

export default styles;
