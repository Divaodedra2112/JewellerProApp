import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, SafeAreaView, Platform } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { MainStackParamList } from '../../types/navigation';
import { useDrawerMenu } from '../../navigation/buildDynamicMenu';
import { showToast, TOAST_MESSAGES, TOAST_TYPE } from '../../utils/toast';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

import { Avatar } from '@kolking/react-native-avatar';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { styles } from './styles';
import {
  LogoutDrawerIcon,
  LogoutSVGIcon,
  MasterMenu,
  OpenMasterMenu,
  CloseMasterMenu,
} from '../../assets/icons/svgIcons/appSVGIcons';
import ConfirmPopup from '../Popup/Popup';
import { defaultAlertIconSize, defaultImageSize } from '../../utils/CommonStyles';
import packageJson from '../../../package.json';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const firstItemLayout = useRef<{ y: number; height: number } | null>(null);
  const lastItemLayout = useRef<{ y: number; height: number } | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user-=-=-=-=-', user);
  const { width, height } = defaultAlertIconSize;
  const { smallx } = defaultImageSize;

  // JSON-driven items with icons merged from static config
  const allDrawerItems = useDrawerMenu();

  // Separate Master sub-items from other items
  const masterSubItems = ['Category', 'GradeScreen', 'Road', 'concernType', 'products'];
  const parentItems = allDrawerItems.filter(item => !masterSubItems.includes(item.id));
  const subItems = allDrawerItems.filter(item => masterSubItems.includes(item.id));

  // Aggregate log: which drawer modules are allowed
  try {
    const ids = allDrawerItems.map(i => i.id);
    const names = allDrawerItems.map(i => i.name);
    console.log('**********[Drawer]*********', JSON.stringify({ ids, names }));
  } catch {}

  const handleLogout = () => setShowModal(true);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const confirmLogout = async () => {
    try {
      setShowModal(false);
      await dispatch(logout());

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    } catch (error) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.AUTH.LOGOUT_FAILED);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.header}>
          {/* <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View pointerEvents="none">
              <HamburgerMenuIcon width={24} height={24} color={colors.white} />
            </View>
          </TouchableOpacity> */}

          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Avatar
                  {...((user as any)?.profileImage || user?.photo
                    ? { source: { uri: (user as any)?.profileImage || user?.photo } }
                    : {})}
                  name={
                    `${(user as any)?.firstName || ''} ${(user as any)?.lastName || ''}`.trim() ||
                    user?.name ||
                    ''
                  }
                  size={Platform.OS === 'android' ? moderateScale(56) : moderateScale(60)}
                  colorize={true}
                  style={styles.avatar}
                />
              </View>
            </View>

            <View style={styles.profileTextContainer}>
              <AppText variant={TEXT_VARIANTS.h2} style={styles.userName}>
                {user?.firstName || user?.name?.split(' ')[0] || 'User'}
              </AppText>
              {user?.roles?.[0]?.roleType && (
                <AppText variant={TEXT_VARIANTS.h4_small} style={styles.userRole}>
                  {user.roles[0].roleType}
                </AppText>
              )}
              <AppText variant={TEXT_VARIANTS.h4_small} style={styles.userMobile}>
                {user?.mobile || (user as any)?.mobileNo || ''}
              </AppText>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Drawer Items */}
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {/* Master Parent Item with Expand/Collapse */}
          {subItems.length > 0 && (
            <>
              <TouchableOpacity style={styles.masterItem} onPress={() => toggleExpand('master')}>
                <View style={styles.masterItemContent}>
                  <MasterMenu width={24} height={24} color={colors.Gray40} />
                  <AppText style={styles.masterLabel}>Master</AppText>
                </View>
                {expandedItems.master ? (
                  <CloseMasterMenu width={24} height={24} color={colors.Gray40} />
                ) : (
                  <OpenMasterMenu width={24} height={24} color={colors.Gray40} />
                )}
              </TouchableOpacity>

              {/* Sub-menu items with vertical line */}
              {expandedItems.master && (
                <View style={styles.subMenuContainer}>
                  {lineHeight > 0 && (
                    <View style={[styles.lineContainer, { top: lineTop, height: lineHeight }]}>
                      <View style={styles.verticalLine} />
                    </View>
                  )}
                  <View style={styles.subMenuItems}>
                    {subItems.map((item, index) => {
                      const isFirst = index === 0;
                      const isLast = index === subItems.length - 1;
                      return (
                        <View
                          key={item.id}
                          onLayout={event => {
                            if (isFirst || isLast) {
                              const { y, height: itemHeight } = event.nativeEvent.layout;
                              if (isFirst) {
                                firstItemLayout.current = { y, height: itemHeight };
                              }
                              if (isLast) {
                                lastItemLayout.current = { y, height: itemHeight };
                              }
                              // Calculate line when we have both measurements
                              if (firstItemLayout.current && lastItemLayout.current) {
                                const firstIconCenterY =
                                  firstItemLayout.current.y + firstItemLayout.current.height / 2;
                                const lastIconCenterY =
                                  lastItemLayout.current.y + lastItemLayout.current.height / 2;
                                setLineTop(firstIconCenterY);
                                setLineHeight(lastIconCenterY - firstIconCenterY);
                              }
                            }
                          }}
                        >
                          <DrawerItem
                            label={item.name}
                            onPress={() => props.navigation.navigate(item.id)}
                            icon={({ color }) => (item.icon ? item.icon({ color }) : null)}
                            labelStyle={styles.drawerLabel}
                            style={styles.subMenuItem}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </>
          )}

          {/* Other Drawer Items */}
          {parentItems.map(item => (
            <DrawerItem
              key={item.id}
              label={item.name}
              onPress={() => props.navigation.navigate(item.id)}
              icon={({ color }) => (item.icon ? item.icon({ color }) : null)}
              labelStyle={styles.drawerLabel}
            />
          ))}
        </View>

        {/* Logout - Scrollable with menu */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogoutDrawerIcon width={smallx} height={smallx} color={colors.redButtonColor} />
            <AppText style={styles.logoutText}>Sign Out</AppText>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* App Version - Fixed at Bottom */}
      <View style={styles.versionFooter}>
        <AppText style={styles.versionText} variant={TEXT_VARIANTS.h4_small}>
          Version {packageJson.version}
        </AppText>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <ConfirmPopup
            visible={true}
            icon={<LogoutSVGIcon width={width} height={height} color={colors.red} />}
            title="Sure to end your session?"
            message="This will sign you out from your current session.You can always come back and log in again."
            onOk={confirmLogout}
            onCancel={() => setShowModal(false)}
            positiveActionText="Yes, log me out"
            negativeActionText="No, keep me in"
          />
        </View>
      </Modal>
    </View>
  );
};

export default DrawerContent;
