import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors, Fonts } from '../../../utils/theme';

type Styles = {
  container: ViewStyle;
  keyboardView: ViewStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
  content: ViewStyle;
  profilePictureContainer: ViewStyle;
  profilePictureWrapper: ViewStyle;
  profilePicture: ViewStyle;
  profilePicturePlaceholder: ViewStyle;
  editPictureButton: ViewStyle;
  form: ViewStyle;
  inputLabel: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  saveButton: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(20),
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(32),
  },
  profilePictureWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(60),
    backgroundColor: colors.gray100,
  },
  profilePicturePlaceholder: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(60),
    backgroundColor: colors.gray1100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    paddingHorizontal: scale(0),
    gap: verticalScale(0),
  },
  inputLabel: {
    fontSize: scale(14),
    fontWeight: '500',
    marginLeft: scale(8),
    color: colors.inputLabel,
    fontFamily: Fonts.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    minHeight: verticalScale(60),
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.gray100,
    borderTopWidth: 0.3,
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
    gap: scale(10),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(1),
    elevation: 0.5,
  },
  input: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textPrimary,
    fontFamily: Fonts.regular,
    paddingVertical: 0,
  },
  saveButton: {
    marginTop: verticalScale(32),
    width: '100%',
  },
});

