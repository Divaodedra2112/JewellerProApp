import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GenericParamList } from '../types/navigation';
import { moderateScale } from '../utils/Responsive';
import Header from '../components/Header/Header';
import { navigationModulesConfig, NavigationItem } from '../config/navigationConfig';
import GlassTabBar from '../components/BottomTabNavigation/GlassTabBar';
import { Text, View, TouchableOpacity } from 'react-native';
import { Fonts } from '../utils/theme';

const Tab = createBottomTabNavigator<GenericParamList>();

const BottomTabNavigator = () => {
  // Get all bottom tab items from navigation config (no permission filtering)
  const bottomTabs = navigationModulesConfig.filter((tab: NavigationItem) => {
    return tab.type === 'bottomTab';
  });

  if (bottomTabs.length === 0) {
    return null;
  }

  return (
    <Tab.Navigator
      tabBar={props => <GlassTabBar {...props} />}
      screenOptions={({ route }) => {
        // Find the tab config for this route
        const tab = bottomTabs.find(t => t.name === route.name);
        
        return {
          tabBarStyle: {
            display: 'none', // Hide default tab bar, GlassTabBar handles everything
          },
          tabBarIcon: ({ focused }) => {
            // Return the icon from navigation config
            // Dark blue for active, white for inactive
            const iconColor = focused ? '#173051' : '#FFFFFF';
            return tab?.icon ? tab.icon({ color: iconColor, focused }) : null;
          },
          tabBarLabel: route.name,
          header: () => <Header title={route.name} />,
        };
      }}
    >
      {bottomTabs.map((tab: NavigationItem & { component: any }) => (
        <Tab.Screen
          key={tab.id}
          name={tab.name as keyof GenericParamList}
          component={tab.component}
          options={{ headerShown: false }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
