import { StyleSheet, ViewStyle } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';

type Styles = {
  container: ViewStyle;
  cardWrapper: ViewStyle;
  emptyContainer: ViewStyle;
};

export const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
  },
  cardWrapper: {
    width: '50%',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
  },
  emptyContainer: {
    paddingVertical: verticalScale(40),
  },
});

