import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  textContainer: ViewStyle;
  welcomeText: TextStyle;
  userName: TextStyle;
  avatarContainer: ViewStyle;
  avatar: ImageStyle;
  avatarPlaceholder: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(20),
    // Safe area padding will be added dynamically
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  welcomeText: {
    fontSize: scale(16),
    color: colors.gray1000,
    marginBottom: verticalScale(4),
  },
  userName: {
    fontSize: scale(20),
    color: colors.textPrimary,
    fontWeight: '600',
  },
  avatarContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    overflow: 'hidden',
    backgroundColor: colors.gray50,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray50,
  },
});

