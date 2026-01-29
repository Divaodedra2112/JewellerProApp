import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './NotificationScreenStyle';
import { getNotifications, markNotificationAsRead } from './notificationService';
import { HamburgerMenuIcon, NotificationIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { setUnreadCount } from '../../store/slices/notificationSlice';
import CustomHeader from '../../components/CustomHeader/Header';
import { AppLoader } from '../../components/AppLoader';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import { useFloatingActions } from '../../hooks/useFloatingActions';
import NoResultsFoundScreen from '../UtilityScreens/NoResultsFoundScreen';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  screen?: string;
  isRead: boolean;
  createdAt: string;
  data?: {
    id?: string;
    [key: string]: any;
  };
  userData?: Record<string | number, boolean>;
}

const formatNotificationTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'Now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString();
  }
};

type RootStackParamList = {
  ProductDetailScreen: { id: string };
  StaffProfile: { id: string };
  RoadScreen: { id: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const notificationEvents = {
  listeners: new Set<(count: number) => void>(),
  _lastCount: 0,
  emit(count: number) {
    this._lastCount = count;
    this.listeners.forEach(listener => listener(count));
  },
  subscribe(listener: (count: number) => void) {
    this.listeners.add(listener);
    listener(this._lastCount);
    return () => this.listeners.delete(listener);
  },
};

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;
  const userId = useSelector((state: any) => state.auth.user?.id);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selected, setSelected] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const floatingActions = useFloatingActions();

  const fetchNotifications = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      }
      try {
        const result = await getNotifications(pageNum, 10); // Load 10 items per page
        if (pageNum === 1) {
          setNotifications(result.notifications);
        } else {
          setNotifications(prev => [...prev, ...result.notifications]);
        }
        setHasMore(result.currentPage < result.totalPages);
        dispatch(setUnreadCount(result.unreadCount));
      } catch (e) {
        console.error('Failed to fetch notifications:', e);
      } finally {
        setLoading(false);
        if (isRefresh) {
          setRefreshing(false);
        }
      }
    },
    [dispatch]
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchNotifications(1, true);
  };

  const handlePress = async (item: Notification) => {
    if (!item.isRead) {
      try {
        await markNotificationAsRead(item.id);
      } catch (e) {
        console.error('Failed to mark notification as read:', e);
      }
    }

    // Use the screen property from the notification's data object
    const screen = item.data?.screen;
    const id = item.data?.id;

    if (screen) {
      if (id) {
        navigation.navigate(screen, { id });
      } else {
        navigation.navigate(screen);
      }
    }
  };

  const getIcon = (type: string) => {
    return <NotificationIcon color="#A8A29E" width={24} height={24} />;
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        setPage(1);
        fetchNotifications(1);
      }
    });
    return () => sub.remove();
  }, [fetchNotifications]);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchNotifications(1);
    }, [fetchNotifications])
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: moderateScale(11) }}>
        <CustomHeader
          title="Notification"
          showBackButton={true}
          backIcon={<HamburgerMenuIcon width={24} height={24} color={colors.Gray80} />}
          onBackPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          loading ? (
            <View style={styles.emptyStateContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 30, height: 30, marginRight: 12 }}>
                  <AppLoader isLoading={true} />
                </View>
                <Text style={styles.emptyStateText}>Loading your notification...</Text>
              </View>
            </View>
          ) : (
            <NoResultsFoundScreen
              hasActiveFilters={false}
              onResetFilters={() => {}}
              title="No notifications yet"
              subtitle="You don't have any notifications yet."
            />
          )
        }
        renderItem={({ item }) => {
          // Determine read/unread using userData and userId
          const isRead =
            item.userData && userId !== undefined && userId !== null
              ? Boolean(item.userData[userId])
              : false;
          return (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={[styles.card, isRead ? styles.read : styles.unread]}
            >
              <View style={styles.row}>
                <View style={styles.title}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>

                <View style={styles.timeView}>
                  <Text style={styles.date}>{formatNotificationTime(item.createdAt)}</Text>
                  {!isRead && <View style={styles.unreadDot} />}
                </View>
              </View>

              <Text style={styles.description}>{item.message}</Text>
            </TouchableOpacity>
          );
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {/* Floating Action Button */}
      <FloatingActionButton actions={floatingActions} />
    </View>
  );
};

export default NotificationScreen;
