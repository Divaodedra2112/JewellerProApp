import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: Math.round(moderateScale(16)),
    marginRight: moderateScale(12),
  },
  track: {
    // keep for future border/shadow tweaks
  },
  knob: {
    // iOS shadow
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(2),
    shadowOffset: { width: 0, height: 1 },
    // Android
    elevation: 2,
  },
});
