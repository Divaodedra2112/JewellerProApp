import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ActiveupdateTabIcon } from './TabBarSvgIcons';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

interface UpdatesIconWithBadgeProps {
  focused: boolean;
}

const UpdatesIconWithBadge: React.FC<UpdatesIconWithBadgeProps> = ({ focused }) => {
  const unreadCount = useSelector((state: RootState) => state.notifications?.unreadCount ?? 0);

  return (
    <View style={{ position: 'relative' }}>
      <ActiveupdateTabIcon
        color={focused ? colors.primary : '#FFFFFF'}
        size={focused ? 24 : 20}
      />
      {/* Notification badge - only show if there are unread notifications */}
      {unreadCount > 0 && (
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
      )}
    </View>
  );
};

export default UpdatesIconWithBadge;




