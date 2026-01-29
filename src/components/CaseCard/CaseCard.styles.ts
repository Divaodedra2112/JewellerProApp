import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { defaultImageSize } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  kanbanCardWidth: {
    width: '100%',
  },
  commonDesignForSpace: {
    backgroundColor: colors.white,
    padding: verticalScale(12),
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: colors.Gray20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(16),
    color: colors.Gray80,
    lineHeight: scale(22),
  },
  deviderContainer: {
    marginVertical: moderateScale(12),
  },
  divider: {
    backgroundColor: colors.gray100,
    height: moderateScale(1),
    width: '100%',
  },
  detailsContainer: {
    gap: moderateScale(10),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailLabel: {
    width: scale(84),

    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    color: colors.subText,
    lineHeight: scale(16),
  },
  detailValue: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    color: colors.gray1000,
    lineHeight: scale(16),
  },
  commonTwoColumnRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonTwoColumnLeft: {
    flex: 7,
  },
  commonTwoColumnRight: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  kanbanTwoColumnLeft: {
    flex: 6,
  },
  kanbanTwoColumnRight: {
    flex: 5,
  },
  commonTwoColumnRightText: {
    textAlign: 'right',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  companyAvatar: {
    width: defaultImageSize.smallx,
    height: defaultImageSize.smallx,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: defaultImageSize.smallx / 2,
    overflow: 'hidden',
  },
  companyTextContainer: {
    marginLeft: moderateScale(10),
    flexShrink: 1,
  },
  companyName: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(13),
    color: colors.gray1000,
    lineHeight: scale(18),
  },
  customerName: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(11),
    color: colors.subText,
    lineHeight: scale(14),
    marginTop: moderateScale(2),
  },
  staffTouchable: {
    minHeight: moderateScale(24),
    justifyContent: 'center',
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffAvatar: {
    width: defaultImageSize.small,
    height: defaultImageSize.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: defaultImageSize.small / 2,
    overflow: 'hidden',
  },
  staffTextContainer: {
    marginLeft: moderateScale(8),
    flexShrink: 1,
  },
  staffName: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(13),
    color: colors.gray1000,
    lineHeight: scale(18),
  },
  staffRole: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(11),
    color: colors.subText,
    lineHeight: scale(14),
    marginTop: moderateScale(2),
  },
  selectStaffButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gray1100,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectStaffButtonText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: moderateScale(11),
    color: colors.gray1000,
    lineHeight: moderateScale(14),
  },
  actionSheetContainer: {
    // kept for backwards compatibility (use `modalView` instead)
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    paddingBottom: moderateScale(8),
  },
  actionSheetIndicator: {
    // kept for backwards compatibility (use `indicator` instead)
    width: moderateScale(100),
  },
  // Match ConcernComponentVertical ActionSheet styling
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(16),
    height: '90%',
  },
  indicator: {
    width: moderateScale(100),
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateColumnLeft: {
    flex: 1,
  },
  dateColumnRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateColumnGap: {
    width: moderateScale(24),
  },
  dateHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  dateHeaderRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: moderateScale(4),
  },
  dateLabel: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    color: colors.subText,
    lineHeight: scale(16),
    marginLeft: moderateScale(8),
  },
  dateValue: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(14),
    color: colors.gray1000,
    lineHeight: scale(20),
  },
  dateValueRight: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(14),
    color: colors.gray1000,
    lineHeight: scale(20),
    textAlign: 'right',
  },
  calendarInline: {
    flex: 0,
  },
  acceptButton: {
    minWidth: scale(85),
    height: verticalScale(32),
    borderRadius: moderateScale(100),
    paddingTop: verticalScale(6),
    paddingBottom: verticalScale(6),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    borderWidth: moderateScale(1),
    borderColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    fontSize: scale(14),
    color: colors.gray1000,
    lineHeight: scale(20),
  },
});

export default styles;
