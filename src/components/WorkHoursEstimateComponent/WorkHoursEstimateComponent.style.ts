import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.Gray80,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  circleText: {
    fontSize: 24,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 60,
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    textAlign: 'center',
    color: colors.Gray80,
    marginHorizontal: 20,
  },
  unit: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: colors.Gray80,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.white,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semi_bold,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.gray1000,
  },
  disabledCircle: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#888',
  },
  fullWidthButton: {
    width: '100%',
    marginBottom: moderateScale(12),
  },
  fullWidthButto2: {
    width: '100%',
    marginBottom: moderateScale(12),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
  },

  disabledButton: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
  },
});

export default styles;
