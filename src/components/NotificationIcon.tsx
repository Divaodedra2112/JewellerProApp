import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface NotificationIconProps {
  icon: React.ReactNode;
  source?: 'notifications' | 'chat';
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ icon, source = 'notifications' }) => {
  const notificationUnread = useSelector((state: RootState) => state.notifications?.unreadCount);
  const chatUnread = useSelector((state: RootState) => (state as any)?.chat?.totalUnread ?? 0);
  const unreadCount = source === 'chat' ? chatUnread : notificationUnread;

  return (
    <View style={styles.container}>
      {icon}
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 6,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 6,
    fontWeight: '600',
  },
});

export default NotificationIcon;