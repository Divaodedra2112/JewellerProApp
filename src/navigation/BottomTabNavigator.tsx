import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GenericParamList } from '../types/navigation';
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
          overflow: 'visible', // Allow active tab to show
        },
        tabBarButton: (props) => {
          const { children, onPress, accessibilityState } = props;
          const focused = accessibilityState?.selected ?? false;
          
          if (focused) {
            // Active tab - background is rendered separately in CustomTabBar
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: moderateScale(8),
                  paddingHorizontal: moderateScale(4),
                  zIndex: 2, // Ensure content is above background
                  elevation: 2,
                }}
              >
                {children}
              </TouchableOpacity>
            );
          }

          // Inactive tabs - no background
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: moderateScale(8),
                paddingHorizontal: moderateScale(4),
                backgroundColor: 'transparent',
              }}
            >
              {children}
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
          // Use dark gray/blue for focused, white for unfocused (matching Figma exactly)
          const iconColor = focused ? '#4B5563' : '#FFFFFF';
          return (
            <View 
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 0,
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
          margin: 0,
          backgroundColor: 'transparent', // Ensure no background override
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
