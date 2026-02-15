import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={BottomTabNavigator} />
      {/* Add your custom screens here */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
