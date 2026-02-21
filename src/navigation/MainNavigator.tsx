import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import ProfileScreen from '../modules/main/Profile/ProfileScreen';
import SubCategoryScreen from '../modules/main/SubCategory/SubCategoryScreen';
import TopicScreen from '../modules/main/Topic/TopicScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={BottomTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
