import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
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
import { scale, verticalScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logoutAppAction());
  };

  const handleProfilePress = () => {
    // TODO: Navigate to Profile screen
    console.log('Navigate to Profile');
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
      <View style={styles.sideMargin} />
      <View style={styles.mainContent}>
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
      </View>
      <View style={styles.sideMargin} />
    </View>
  );
};

export default SettingsScreen;
