import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';
import { defaultIconSizes } from '../../utils/CommonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ScreenBGColor,
    paddingHorizontal: moderateScale(16),
  },
  commonMarginBottom: {
    marginBottom: verticalScale(13),
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
  searchComponent: {
    marginBottom: verticalScale(12),
  },
  image: {
    width: defaultIconSizes.small,
    height: defaultIconSizes.small,
  },
  listContiner: {
    height: '70%',
  },
  list: {
    flex: 1,
    minHeight: verticalScale(200),
  },
  renderEmpty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  renderEmptyText: {
    color: colors.gray900,
  },
  renderItemContent: {
    margin: moderateScale(8),
    padding: moderateScale(16),
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    borderWidth: 0,
  },
  itemContent: {
    flexDirection: 'row',
    width: '100%',
  },
  itemLeftColumn: {
    flex: 1,
    flexDirection: 'column',
    flexShrink: 1,
    paddingRight: moderateScale(12),
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexShrink: 0,
  },
  itemLabel: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(16),
    lineHeight: moderateScale(16),
    letterSpacing: scale(16) * -0.005, // -0.5% of font size
    color: colors.gray1000,
    marginBottom: moderateScale(6),
  },
  itemLabelText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: moderateScale(16),
    letterSpacing: scale(12) * -0.005, // -0.5% of font size
    color: '#78716C',
  },
  itemCategory: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: moderateScale(16),
    letterSpacing: scale(12) * -0.005, // -0.5% of font size
    color: colors.gray1000,
    marginBottom: moderateScale(6),
  },
  itemTitle: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: moderateScale(16),
    letterSpacing: scale(12) * -0.005, // -0.5% of font size
    color: colors.gray1000,
    marginBottom: moderateScale(6),
  },
  countText: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: moderateScale(16),
    letterSpacing: scale(12) * -0.005, // -0.5% of font size
    color: colors.gray1000,
  },
  itemProduct: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: moderateScale(16),
    letterSpacing: scale(12) * -0.005, // -0.5% of font size
    color: colors.gray1000,
    marginBottom: moderateScale(6),
  },
  itemButton: {
    fontSize: scale(12),
    color: colors.subText,
    fontWeight: '500',
    lineHeight: scale(26),
  },
  linkButtonBase: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(999),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: moderateScale(70),
  },
  linkedButton: {
    backgroundColor: colors.gray1100,
  },
  unlinkedButton: {
    backgroundColor: colors.Gray80,
  },
  linkedText: {
    color: colors.subText,
  },
  unlinkedText: {
    color: colors.white,
  },
  bottomCommonView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  resetButton1: {
    flex: 1,
    backgroundColor: colors.transparent,
    borderWidth: moderateScale(1),
    borderColor: colors.black,
    borderRadius: moderateScale(50),
    paddingVertical: verticalScale(12),
  },
  resetButtonText1: {
    color: colors.black,
    fontWeight: '600',
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: Fonts.semi_bold,
  },
  applyButton1: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: moderateScale(50),
    paddingVertical: verticalScale(12),
  },
  buttonText1: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: Fonts.semi_bold,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(4),
    paddingTop: moderateScale(8),
  },
  footerContainer: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  renderFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default styles;
