import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GenericParamList } from '../types/navigation';
import { colors } from '../utils/theme';
import { moderateScale } from '../utils/Responsive';
import Header from '../components/Header/Header';
import { navigationModulesConfig, NavigationItem } from '../config/navigationConfig';
import CustomTabBar from '../components/BottomTabNavigation/CustomTabBar';
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
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4B5563', // Dark gray for active
        tabBarInactiveTintColor: '#FFFFFF', // White for inactive
        tabBarStyle: {
          height: moderateScale(72),
          paddingBottom: moderateScale(8),
          paddingTop: moderateScale(8),
          paddingHorizontal: moderateScale(4),
          borderTopWidth: 0,
          backgroundColor: 'transparent', // Transparent to show background from CustomTabBar
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarButton: (props) => {
          const { children, onPress, accessibilityState } = props;
          const focused = accessibilityState?.selected ?? false;
          
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: moderateScale(6),
                // Active tab background - light gray/white pill matching Figma
                ...(focused && {
                  backgroundColor: '#F3F4F6', // Light gray background for active tab (matching Figma)
                  borderRadius: moderateScale(18),
                  paddingHorizontal: moderateScale(12),
                  paddingVertical: moderateScale(6),
                  marginHorizontal: moderateScale(3),
                  minHeight: moderateScale(44), // Ensure enough height for icon + text
                  // Add shadow for depth
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }),
              }}
            >
              <View 
                style={{ 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                {children}
              </View>
            </TouchableOpacity>
          );
        },
        tabBarLabel: ({ focused, color: _color }) => (
          <Text
            style={{
              fontFamily: focused ? Fonts.medium : Fonts.regular,
              fontWeight: focused ? '600' : '400',
              color: focused ? '#4B5563' : '#FFFFFF', // Dark gray for active, white for inactive (matching Figma)
              fontSize: moderateScale(11),
              marginTop: moderateScale(2), // Small spacing between icon and text
              textAlign: 'center',
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused, color: _color }) => {
          // Find the tab config for this route
          const tab = bottomTabs.find(t => t.name === route.name);
          // Use dark blue for focused, white for unfocused (matching Figma exactly)
          const iconColor = focused ? '#2563EB' : '#FFFFFF';
          return (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 0,
                width: '100%',
              }}
            >
              {tab?.icon?.({ color: iconColor, focused })}
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontFamily: 'regular',
        },
        tabBarItemStyle: {
          height: 'auto', // Let it size based on content
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingVertical: 0, // Remove default padding
          paddingHorizontal: 0,
        },
        tabBarIconStyle: {
          width: moderateScale(20),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 0,
        },
        header: () => <Header title={route.name} />,
      })}
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
