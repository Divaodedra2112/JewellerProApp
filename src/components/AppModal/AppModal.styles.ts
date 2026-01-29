import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: 'center',
    elevation: 5,
  },
  iconStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginBottom: moderateScale(15),
  },
  message: {
    textAlign: 'center',
    marginBottom: moderateScale(25),
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  button: {
    flex: 1,
    backgroundColor: '#E5E5EA',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#65A30D',
  },
  primaryButtonText: {
    color: '#fff',
  },
});

export default styles;
