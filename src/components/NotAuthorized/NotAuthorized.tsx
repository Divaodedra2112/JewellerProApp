import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';
import { styles } from './NotAuthorized.style';

const NotAuthorized = () => {
  return (
    <View style={styles.container}>
      <AppText variant={TEXT_VARIANTS.h2} style={styles.title}>Not Authorized</AppText>
      <AppText variant={TEXT_VARIANTS.h4_small} style={styles.message}>
        You don't have access to any modules. Please contact your administrator.
      </AppText>
    </View>
  );
};

export default NotAuthorized;
