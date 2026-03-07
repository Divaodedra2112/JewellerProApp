import React from 'react';
import HomeScreen from '../modules/main/Home/Home.screen';
import SettingsScreen from '../modules/main/Settings/SettingsScreen';
import QuestionsNavigator from '../navigation/QuestionsNavigator';
import UpdatesScreen from '../modules/main/Updates/UpdatesScreen';
import UpdatesIconWithBadge from '../components/BottomTabNavigation/UpdatesIconWithBadge';
import { HomeTabIcon, ChatTabIcon, SettingsTabIcon } from '../components/BottomTabNavigation/TabBarSvgIcons';
import { colors } from '../utils/theme';

export interface NavigationItem {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  icon?: (props: { color: string; focused?: boolean; size?: number }) => React.ReactNode;
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
    icon: ({ focused }) => (
      <HomeTabIcon
        color={focused ? colors.primary : '#FFFFFF'}
        size={focused ? 24 : 20}
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
  {
    id: 'Questions',
    name: 'Questions',
    component: QuestionsNavigator,
    icon: ({ focused, size: iconSize }) => (
      <ChatTabIcon
        color={focused ? colors.primary : '#FFFFFF'}
        size={iconSize ?? (focused ? 28 : 24)}
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
      <UpdatesIconWithBadge focused={focused} />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
    showBadge: true,
  },
  {
    id: 'Settings',
    name: 'Settings',
    component: SettingsScreen,
    icon: ({ focused }) => (
      <SettingsTabIcon
        color={focused ? colors.primary : '#FFFFFF'}
        size={focused ? 24 : 20}
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
];
