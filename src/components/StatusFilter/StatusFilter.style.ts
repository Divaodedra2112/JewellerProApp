import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import { colors, Fonts } from '../../utils/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
      },
      button: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(6),
        borderRadius: moderateScale(24),
        borderWidth: 1,
        minHeight: verticalScale(36),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
      },
      activeButton: {
        borderWidth:1,
        borderColor: colors.Gray80,
      },
      inactiveButton: {
        borderWidth:1,
        borderColor: colors.gray100,
      },
      activeLabel: {
        fontFamily:Fonts.semi_bold,
        fontWeight: '600',
        color: colors.Gray80,
        fontSize:moderateScale(14),
        lineHeight:moderateScale(20),
      },
      inactiveLabel: {
        fontFamily:Fonts.semi_bold,
        fontWeight: '600',
        color: colors.gray1000,
        fontSize:moderateScale(14),
        lineHeight:moderateScale(20),
      },
});
