import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { defaultImageSize } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  commonFlexRow: {
    flexDirection: 'row',
  },
  commonFlex1: {
    flex: 1,
  },
  commonDesignForSpace: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(2),
    marginBottom: moderateScale(14),
    borderRadius: moderateScale(10),
  },
  deviderContainer: {
    marginVertical: moderateScale(12),
  },
  commonColumn: {
    flexDirection: 'column',
  },
  divider: {
    backgroundColor: colors.gray100,
    height: moderateScale(1),
    width: '100%',
  },
  commonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  taskTitle: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: colors.Gray80,
    lineHeight: moderateScale(22),
    flex: 8,
  },
  priorityText: {
    flex: 2,
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: colors.mediumCyan,
    backgroundColor: colors.lightAqua,
    textAlign: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(100),
  },

  commonFlexColumn: {
    flexDirection: 'column',
  },
  commonSpaceBetween: {
    justifyContent: 'space-between',
  },
  commonAlignCenter: {
    alignItems: 'center',
  },
  marginBottom12: {
    marginBottom: moderateScale(12),
  },

  techImageSection: {
    width: moderateScale(defaultImageSize.small),
    height: moderateScale(defaultImageSize.small),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  techImageCard: {
    width: moderateScale(defaultImageSize.small),
    height: moderateScale(defaultImageSize.small),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },
  techniciansName: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    color: colors.Gray80,
    marginLeft: moderateScale(6),
    lineHeight: moderateScale(20),
  },
  techniciansNameState: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(10),
    color: colors.subText,
    marginLeft: moderateScale(6),
    lineHeight: moderateScale(14),
  },
  statusText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.goldenOrange,
    textAlign: 'center',
    marginLeft: moderateScale(4),
  },

  companyImageSection: {
    width: moderateScale(defaultImageSize.smallx),
    height: moderateScale(defaultImageSize.smallx),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    overflow: 'hidden',
  },
  companyImageCard: {
    width: moderateScale(defaultImageSize.smallx),
    height: moderateScale(defaultImageSize.smallx),
    borderRadius: moderateScale(25),
    resizeMode: 'cover',
  },
  companyName: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: colors.Gray80,
    marginLeft: moderateScale(6),
    flexShrink: 1,
  },
  companyEmailAddress: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.subText,
    marginLeft: moderateScale(6),
  },

  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(16),
    height: '90%',
  },
  loaderOverlay: {
    alignItems: 'flex-end',
    marginBottom: verticalScale(10),
  },
  // Newly added extracted styles
  priorityUpdatingLoader: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityPicker: {
    flex: 2,
  },
  staffTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffUpdatingLoader: {
    flex: 1,
    justifyContent: 'center',
  },
  statusUpdatingLoader: {
    flex: 4,
    justifyContent: 'center',
  },
  statusPicker: {
    // Removed flex to prevent status from growing
  },
  actionSheetIndicator: {
    width: 100,
  },
  commonDirectionColumn: {
    flexDirection: 'column',
  },
  commonProductStyle: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: colors.gray1000,
    lineHeight: moderateScale(20),
  },
  indicator: {
    width: moderateScale(100),
  },
  linkSampleRequestButton: {
    backgroundColor: colors.gray1100,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: 999,
  },
  linkButtonTouchable: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSampleRequestButtonText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(11),
    color: colors.gray1000,
    lineHeight: moderateScale(14),
  },
  createdAtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdAtText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.subText,
    flex: 1,
  },
  appButtonPending: {
    width: moderateScale(100),
    padding: moderateScale(8),
  },
  acceptButtonLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonContainer: {
    width: '40%',
    alignItems: 'flex-end',
  },
  // New styles for inline styles
  companySection: {
    width: '60%',
    flexShrink: 1,
  },
  statusSection: {
    width: '40%',
  },
  statusSectionInner: {
    alignItems: 'flex-end',
  },
  staffContainer: {
    flexDirection: 'row',
  },
  staffSection: {
    flex: 1,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRowItem: {
    flex: 1,
  },
  staffNameContainer: {
    flexDirection: 'column',
    marginRight: moderateScale(15),
  },
});

export default styles;
