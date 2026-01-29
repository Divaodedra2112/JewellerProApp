import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { defaultImageSize } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  commonFlexRow: {
    flexDirection: 'row',
  },
  statusContainerStyle: {
    flex: 4,
    marginRight: moderateScale(10),
  },
  priorityContainerStyle: {
    flex: 4,
    marginLeft: moderateScale(10),
  },
  commonDesignForSpace: {
    marginHorizontal: moderateScale(1),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(14),
    borderRadius: moderateScale(16),
    backgroundColor: colors.white,
  },
  taskContainer: {
    flexDirection: 'column',
    marginBottom: moderateScale(12),
  },
  statusContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  taskTitle: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: colors.Gray80,
    lineHeight: moderateScale(22),
    marginBottom: moderateScale(8),
  },
  taskDetail: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: colors.gray1000,
    lineHeight: moderateScale(22),
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
    color: colors.subText,
    textAlign: 'center',
    marginLeft: moderateScale(4),
  },
  statusText2: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.mediumCyan,
    textAlign: 'center',
    marginLeft: moderateScale(4),
  },
  companyImageSection: {
    width: moderateScale(defaultImageSize.small),
    height: moderateScale(defaultImageSize.small),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  companyImageCard: {
    width: moderateScale(defaultImageSize.small),
    height: moderateScale(defaultImageSize.small),
    borderRadius: moderateScale(45),
    resizeMode: 'cover',
  },
  companyName: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(12),
    color: colors.Gray80,
    marginLeft: moderateScale(6),
  },

  branchContainer: {},
  branchTitle: {
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    fontSize: moderateScale(16),
    color: colors.Gray80,
    lineHeight: moderateScale(22),
  },
  branchCode: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    color: colors.subText,
    lineHeight: moderateScale(20),
  },
  contactPersonContainer: {},
  contactPerson: {
    fontWeight: '500',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    color: colors.Gray80,
    lineHeight: moderateScale(20),
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(16),
    height: '90%',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  // Extracted from inline styles in component
  centerContent: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  staffTouchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffUpdatingLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheetIndicator: {
    width: 100,
  },
  commonDirectionColumn: {
    flexDirection: 'column',
  },
  companyEmailAddress: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.subText,
    marginLeft: moderateScale(6),
  },
  commonProductStyle: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: colors.gray1000,
    lineHeight: moderateScale(20),
  },
  priorityUpdatingLoader: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSampleRequestButton: {
    backgroundColor: colors.gray1100,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    height: verticalScale(35),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSampleRequestButtonText: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(14),
    color: colors.gray1000,
    lineHeight: verticalScale(20),
  },
  createdAtText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    color: colors.subText,
    marginTop: moderateScale(8),
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(8),
  },
  buttonRowItem: {
    flex: 1,
  },
});

export default styles;
