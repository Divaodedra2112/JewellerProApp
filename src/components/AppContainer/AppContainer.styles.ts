import { StatusBar, StyleSheet } from 'react-native';

import { type ColorType } from '../../theme/Theme';
import CommonStyles from '../../utils/CommonStyles';

export const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    mainContainer: {
      ...CommonStyles.flex,
      paddingTop: StatusBar.currentHeight,
    },
  });
};
