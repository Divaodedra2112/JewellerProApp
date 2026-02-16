import React from 'react';
import { View } from 'react-native';
import HomeScreen from '../modules/main/Home/Home.screen';
import SettingsScreen from '../modules/main/Settings/SettingsScreen';
import ChatbotScreen from '../modules/main/Chatbot/ChatbotScreen';
import UpdatesScreen from '../modules/main/Updates/UpdatesScreen';
import TabIcon from '../components/BottomTabNavigation/TabIcon';
import Images from '../utils/Images';
import { moderateScale } from '../utils/Responsive';

export interface NavigationItem {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  icon?: (props: { color: string; focused?: boolean }) => React.ReactNode;
  type: 'drawer' | 'bottomTab';
  options?: any;
  permissionKey?: 'list';
  showBadge?: boolean; // For notification badge
}

// Basic navigation configuration - customize as needed
export const navigationModulesConfig: NavigationItem[] = [
  {
    id: 'Home',
    name: 'Home',
    component: HomeScreen,
    icon: ({ color, focused }) => (
      <TabIcon 
        source={Images.HOME_ICON} 
        selectedSource={Images.HOME_ICON_SELECTED}
        focused={focused} 
        size={focused ? 24 : 20} 
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
  {
    id: 'Chatbot',
    name: 'Chatbot',
    component: ChatbotScreen,
    icon: ({ color, focused }) => (
      <TabIcon 
        source={Images.CHAT_ICON} 
        selectedSource={Images.CHAT_ICON_SELECTED}
        focused={focused} 
        size={focused ? 24 : 20} 
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
  {
    id: 'Updates',
    name: 'Updates',
    component: UpdatesScreen,
    icon: ({ color, focused }) => (
      <View style={{ position: 'relative' }}>
        <TabIcon 
          source={Images.UPDATES_ICON} 
          selectedSource={Images.UPDATES_ICON_SELECTED}
          focused={focused} 
          size={focused ? 24 : 20} 
        />
        {/* Notification badge */}
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
            backgroundColor: '#FF3B30', // Red badge matching Figma
            borderWidth: 2,
            borderColor: '#FFFFFF', // White border matching Figma design
          }}
        />
      </View>
    ),
    type: 'bottomTab',
    permissionKey: 'list',
    showBadge: true,
  },
  {
    id: 'Settings',
    name: 'Settings',
    component: SettingsScreen,
    icon: ({ color, focused }) => (
      <TabIcon 
        source={Images.SETTINGS_ICON} 
        selectedSource={Images.SETTINGS_ICON_SELECTED}
        focused={focused} 
        size={focused ? 24 : 20} 
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
];
