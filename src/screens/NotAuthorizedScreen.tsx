import React from 'react';
import { View } from 'react-native';
import { AppText } from '../components/AppText/AppText';

const NotAuthorizedScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText>You are not authorized to access this content.</AppText>
    </View>
  );
};

export default NotAuthorizedScreen;
