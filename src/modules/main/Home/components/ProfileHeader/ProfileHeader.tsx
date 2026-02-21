import React from 'react';
import { View, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { ProfilIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale, verticalScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { MainStackParamList } from '../../../../../types/navigation';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface ProfileHeaderProps {
  userName?: string;
  userPhoto?: string;
  onPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userPhoto,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  
  // Calculate safe top padding (status bar height + extra padding)
  const statusBarHeight = Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight || 0);
  const topPadding = statusBarHeight + verticalScale(16);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('Profile');
    }
  };

  const displayName = userName || 'User';
  const welcomeText = `Hi, Welcome 👋`;

  return (
    <TouchableOpacity
      style={[styles.container, { paddingTop: topPadding }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.welcomeText}>
            {welcomeText}
          </AppText>
          <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.userName}>
            {displayName}
          </AppText>
        </View>
        <View style={styles.avatarContainer}>
          {userPhoto ? (
            <Image
              source={{ uri: userPhoto }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <ProfilIcon
                width={scale(32)}
                height={scale(32)}
                color={colors.gray400}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

