import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingVertical: verticalScale(8),
  },
  swipeWrapper: {
    marginHorizontal: moderateScale(5),
    marginBottom: verticalScale(8),
    borderRadius: moderateScale(15),
    backgroundColor: colors.Gray95,
  },
  card: {
    flexDirection: 'row',
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    backgroundColor: colors.white,

    // Prevent double-shadowing
    shadowColor: 'transparent',
    elevation: 0,
  },

  imageSection: {
    flex: 3.5,
    borderRadius: moderateScale(16),
  },
  image: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(16),
    resizeMode: 'cover',
  },
  textSection: {
    flex: 6.5,
    justifyContent: 'center',
    paddingLeft: scale(12),
    backgroundColor: colors.transparent,
  },
  title: {
    fontSize: scale(16),
    color: colors.textPrimary,

    lineHeight: scale(24),
    marginBottom: scale(4),
  },
  description: {
    fontSize: scale(14),
    color: colors.textPrimary,
    lineHeight: scale(20),
  },
  swipContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(120),
    height: '100%',
    borderTopRightRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    backgroundColor: colors.divider,
  },
  swipIconWithBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.redButtonColor,
    height: '100%',
    borderTopRightRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  swipIconWithOutBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.divider,
  },
  logo: {
    width: scale(25),
    height: verticalScale(25),
  },
  commonBorder: {
    borderRadius: moderateScale(15),
  },
});

export default styles;
