import React from 'react';
import { View, ViewStyle } from 'react-native';
import AppImage from '../AppImage/AppImage';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import styles from './AppEmptyData.styles';
import { Images } from '../../utils';

interface AppEmptyDataProps {
  message?: string;
  Description?: string;
  styles?: ViewStyle;
}

const AppEmptyData: React.FC<AppEmptyDataProps> = ({
  message = 'No data available',
  Description = 'No data available',
  styles: propsStyles,
}) => {
  return (
    <View style={[styles.container, propsStyles]}>
      <View style={styles.imageWrapper}>
        <AppImage image={Images.EMPTY_DATA_IMAGE} mainStyle={styles.image} resizeMode="contain" />
      </View>
      <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
        {message}
      </AppText>
      <AppText variant={TEXT_VARIANTS.h3_large} style={styles.message}>
        {Description}
      </AppText>
    </View>
  );
};

export default AppEmptyData;
