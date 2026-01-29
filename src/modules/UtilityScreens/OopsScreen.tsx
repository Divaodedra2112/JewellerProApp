import React from 'react';
import { Layout } from '@ui-kitten/components';
import { Image } from 'react-native';
import { AppText, TEXT_VARIANTS } from '../../components/AppText/AppText';
import { Button } from '../../components/AppButton/Button';
import styles from './OopsScreen.styles';
import { Images } from '../../utils';
import { AppButton, AppImage } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const OopsScreen = ({ onPress }: { onPress?: () => void }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackToHome = () => {
    navigation.navigate('Drawer', {
      screen: 'MainTabs',
    });
  };

  return (
    <Layout style={styles.container} level="1">
      <AppImage image={Images.OOPS_IMAGE} mainStyle={styles.image} resizeMode="contain" />
      <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
        Oops! Something went wrong.
      </AppText>
      <AppText variant={TEXT_VARIANTS.h3_large} style={styles.subtitle}>
        We ran into an issue. Try again in a moment.
      </AppText>
      <AppButton onPress={handleBackToHome} style={styles.button}>
        Back to Home
      </AppButton>
    </Layout>
  );
};

export default OopsScreen;
