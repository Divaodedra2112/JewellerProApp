import React from 'react';
import { Layout } from '@ui-kitten/components';
import { View } from 'react-native';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { AppButton, AppImage } from '../../../components';
import { AppLoader } from '../../../components/AppLoader';
import styles from './ForceUpdateScreen.styles';
import { Images } from '../../../utils';
import { useForceUpdate } from './ForceUpdateAction';
import { showToast, TOAST_TYPE } from '../../../utils/toast';

const UpdateRequiredScreen = () => {
  const { handleUpdate, loading, error } = useForceUpdate();

  React.useEffect(() => {
    if (error) {
      showToast(TOAST_TYPE.ERROR, error || 'Failed to check version');
    }
  }, [error]);

  return (
    <Layout style={styles.container} level="1">
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <AppLoader isLoading={loading} />
        </View>
      ) : (
        <>
          <AppImage
            image={Images.FORCE_UPDATE_IMAGE}
            mainStyle={styles.image}
            resizeMode="contain"
          />
          <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
            Update Required
          </AppText>
          <AppText variant={TEXT_VARIANTS.h3_large} style={styles.subtitle}>
            A new version is available. Please update the app to continue.
          </AppText>
          <AppButton onPress={handleUpdate} style={styles.button}>
            Update Now
          </AppButton>
        </>
      )}
    </Layout>
  );
};

export default UpdateRequiredScreen;
