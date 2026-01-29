import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(100),
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.white,
    height: moderateScale(50),
    justifyContent: 'center',
    alignContent: 'center',
  },
  focusedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(100),
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.white,
    height: moderateScale(50),
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.gray1000,
    fontSize: moderateScale(16),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(8),
    textAlignVertical: 'center',
    lineHeight: moderateScale(20),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  loader: {
    marginRight: moderateScale(4),
  },
  clearButton: {
    padding: moderateScale(4),
  },
});

export default styles;
