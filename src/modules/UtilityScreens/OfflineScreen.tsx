import React from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Layout } from '@ui-kitten/components';
import { AppText, TEXT_VARIANTS } from '../../components/AppText/AppText';
import { AppButton, AppImage } from '../../components';
import styles from './OfflineScreen.styles';
import { Images } from '../../utils';

const handleRetryConnection = (onPress?: () => void) => {
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      Alert.alert('Connected', 'You are back online.');
      if (onPress) {
        onPress();
      }
    } else {
      Alert.alert('Still offline', 'Please check your internet connection and try again.');
    }
  });
};

const OfflineScreen = ({ onPress }: { onPress?: () => void }) => (
  <Layout style={styles.container} level="1">
    <AppImage image={Images.NO_INTERNET_IMAGE} mainStyle={styles.image} resizeMode="contain" />
    <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
      You're Offline
    </AppText>
    <AppText variant={TEXT_VARIANTS.h3_large} style={styles.subtitle}>
      Please check your internet connection and try again.
    </AppText>

    <AppButton onPress={() => handleRetryConnection(onPress)} style={styles.button}>
      Retry
    </AppButton>
  </Layout>
);

export default OfflineScreen;
