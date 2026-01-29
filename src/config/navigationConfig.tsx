import React from 'react';
import HomeScreen from '../modules/main/Home/Home.screen';
import SettingsScreen from '../modules/main/Settings/SettingsScreen';
import NotificationScreen from '../modules/notification/NotificationScreen';
import { HomeIcon, NotificationIcon as NotificationSVGIcon } from '../assets/icons/svgIcons/appSVGIcons';
import { moderateScale } from '../utils/Responsive';
import { defaultIconSizes } from '../utils/CommonStyles';
import NotificationIcon from '../components/NotificationIcon';
import { colors } from '../utils/theme';

export interface NavigationItem {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  icon?: (props: { color: string; focused?: boolean }) => React.ReactNode;
  type: 'drawer' | 'bottomTab';
  options?: any;
  permissionKey?: 'list';
}

// Basic navigation configuration - customize as needed
export const navigationModulesConfig: NavigationItem[] = [
  {
    id: 'Home',
    name: 'Dashboard',
    component: HomeScreen,
    icon: ({ color, focused }) => (
      <HomeIcon width={focused ? 24 : 20} height={focused ? 24 : 20} color={color} />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
  {
    id: 'Settings',
    name: 'Settings',
    component: SettingsScreen,
    icon: ({ color, focused }) => (
      <HomeIcon width={focused ? 24 : 20} height={focused ? 24 : 20} color={color} />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
  {
    id: 'Notification',
    name: 'Notification',
    component: NotificationScreen,
    icon: ({ color, focused }) => (
      <NotificationIcon
        icon={
          <NotificationSVGIcon
            width={
              focused
                ? moderateScale(defaultIconSizes.xmedium)
                : moderateScale(defaultIconSizes.small)
            }
            height={
              focused
                ? moderateScale(defaultIconSizes.xmedium)
                : moderateScale(defaultIconSizes.small)
            }
            color={color}
          />
        }
      />
    ),
    type: 'bottomTab',
    permissionKey: 'list',
  },
];
