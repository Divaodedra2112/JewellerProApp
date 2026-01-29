import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { defaultImageSize } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(10),
    marginHorizontal: moderateScale(1),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(10),
  },
  rowTop: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  titleContainer: {
    flex: 8,
  },
  titleText: {
    fontWeight: '500',
    fontSize: scale(14),
    lineHeight: verticalScale(20),
    color: colors.Gray80,
    fontFamily: Fonts.medium,
  },
  selectIconContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  rowMiddle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleLabelContainer: {
    flex: 1,
  },
  middleLabelText: {
    fontWeight: '500',
    fontSize: scale(10),
    lineHeight: verticalScale(14),
    color: colors.Gray80,
    fontFamily: Fonts.medium,
  },
  middleValueContainer: {
    flex: 9,
    marginLeft: scale(3),
  },
  middleValueText: {
    fontWeight: '500',
    fontSize: scale(10),
    lineHeight: verticalScale(14),
    color: colors.Gray80,
    fontFamily: Fonts.medium,
  },
  rowBranch: {
    flex: 1,
    flexDirection: 'row',
  },
  branchNameContainer: {
    flex: 1,
  },
  branchNameText: {
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: verticalScale(16),
    color: colors.subText,
    fontFamily: Fonts.medium,
  },
  branchCodeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  branchCodeText: {
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: verticalScale(16),
    color: colors.subText,
    fontFamily: Fonts.medium,
  },
  rowBottom: {
    flex: 1,
    flexDirection: 'row',
  },
  dueDateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dueDateText: {
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: verticalScale(16),
    color: colors.gray1000,
    fontFamily: Fonts.regular,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusText: {
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: verticalScale(16),
    color: colors.gray1000,
    fontFamily: Fonts.regular,
  },
  deviderContainer: {
    marginVertical: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: colors.Gray20,
    height: moderateScale(1),
    width: '100%',
  },
  companyImageSection: {
    width: moderateScale(defaultImageSize.xsmall),
    height: moderateScale(defaultImageSize.xsmall),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  companyImageCard: {
    width: moderateScale(defaultImageSize.xsmall),
    height: moderateScale(defaultImageSize.xsmall),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },
});

export default styles;
