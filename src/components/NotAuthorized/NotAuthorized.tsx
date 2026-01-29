import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';
import { styles } from './NotAuthorized.style';

const NotAuthorized = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not Authorized</Text>
      <Text style={styles.message}>
        You don't have access to any modules. Please contact your administrator.
      </Text>
    </View>
  );
};

NotAuthorized;

export default NotAuthorized;
