import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppText } from '../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { SuccessOverlay } from '../../../components/SuccessOverlay/SuccessOverlay';
import { styles } from './styles';
import {
  ProfilIcon,
  GlobeIcon,
  WarningShieldIcon,
  InfoIcon,
  LogoutSVGIcon,
  ChevronRightIcon,
} from '../../../assets/icons/svgIcons/appSVGIcons';
import { logoutAppAction } from '../../../modules/auth/login/loginActions';
import { scale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';
import { Images } from '../../../utils';
import { MainStackParamList } from '../../../types/navigation';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const SettingsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logoutAppAction());
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleLanguagePress = () => {
    // TODO: Navigate to Language screen or show language selector
    console.log('Navigate to Language');
  };

  const handleLegalPress = () => {
    // TODO: Navigate to Legal & Policies screen
    console.log('Navigate to Legal & Policies');
  };

  const handleHelpPress = () => {
    // TODO: Navigate to Help & Support screen
    console.log('Navigate to Help & Support');
  };

  const settingsItems = [
    {
      id: 'profile',
      title: t('settings.profile', 'Profile'),
      icon: ProfilIcon,
      onPress: handleProfilePress,
      isLogout: false,
    },
    {
      id: 'language',
      title: t('settings.language', 'Language'),
      icon: GlobeIcon,
      onPress: handleLanguagePress,
      isLogout: false,
    },
    {
      id: 'legal',
      title: t('settings.legal', 'Legal & Policies'),
      icon: WarningShieldIcon,
      onPress: handleLegalPress,
      isLogout: false,
    },
    {
      id: 'help',
      title: t('settings.help', 'Help & Support'),
      icon: InfoIcon,
      onPress: handleHelpPress,
      isLogout: false,
    },
    {
      id: 'logout',
      title: t('settings.logout', 'Log Out'),
      icon: LogoutSVGIcon,
      onPress: handleLogout,
      isLogout: true,
    },
  ];

  const renderSettingsItem = (item: typeof settingsItems[0]) => {
    const IconComponent = item.icon;
    const iconColor = item.isLogout ? colors.red : colors.textPrimary;
    const textColor = item.isLogout ? colors.red : colors.textPrimary;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingsItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <IconComponent
            width={scale(24)}
            height={scale(24)}
            color={iconColor}
          />
        </View>
        <AppText
          variant={TEXT_VARIANTS.h4_medium}
          style={[styles.settingsItemText, { color: textColor }]}
        >
          {item.title}
        </AppText>
        <View style={styles.chevronContainer}>
          <ChevronRightIcon
            width={scale(16)}
            height={scale(16)}
            color={item.isLogout ? colors.red : colors.gray400}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
            {t('settings.title', 'Settings')}
          </AppText>

          <View style={styles.settingsList}>
            {settingsItems.map(renderSettingsItem)}
          </View>
        </View>
      </ScrollView>

      {/* Logout Confirmation Overlay */}
      <SuccessOverlay
        visible={showLogoutModal}
        message={t('settings.logoutConfirm', 'Are you sure you want to log out?')}
        isConfirmation={true}
        onPrimaryAction={handleConfirmLogout}
        onSecondaryAction={handleCancelLogout}
        primaryLabel={t('settings.logout', 'Log Out')}
        secondaryLabel={t('common.cancel', 'Cancel')}
        primaryButtonColor={colors.red}
        iconComponent={LogoutSVGIcon}
        iconBackgroundColor={colors.textPrimary}
        iconColor={colors.white}
        autoCloseDelay={0}
      />
    </View>
  );
};

export default SettingsScreen;
