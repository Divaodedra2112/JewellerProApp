import React from 'react';
import { Icon } from '@ui-kitten/components';
import { moderateScale } from '../utils/Responsive';

interface TabBarIconProps {
  name: string;
  color: string;
  focused?: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, focused = false }) => (
  <Icon
    name={name}
    fill={color}
    style={{
      width: moderateScale(focused ? 24 : 20),
      height: moderateScale(focused ? 24 : 20),
      opacity: focused ? 1 : 0.7,
    }}
  />
);

export default TabBarIcon;
