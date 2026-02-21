import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet, ViewStyle } from 'react-native';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { Banner } from '../../modules/main/Home/HomeTypes';
import { styles } from './styles';

interface BannerCardProps {
  banner: Banner;
  onPress?: (banner: Banner) => void;
  style?: ViewStyle;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  banner,
  onPress,
  style,
}) => {
  const handlePress = async () => {
    if (onPress) {
      onPress(banner);
    } else if (banner.linkUrl) {
      // Handle external URL
      const canOpen = await Linking.canOpenURL(banner.linkUrl);
      if (canOpen) {
        await Linking.openURL(banner.linkUrl);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {banner.imageUrl ? (
        <Image
          source={{ uri: banner.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.placeholderText}>
            {banner.title || 'Banner'}
          </AppText>
        </View>
      )}
      {(banner.title || banner.description) && (
        <View style={styles.overlay}>
          {banner.title && (
            <AppText variant={TEXT_VARIANTS.h2} style={styles.title}>
              {banner.title}
            </AppText>
          )}
          {banner.description && (
            <AppText variant={TEXT_VARIANTS.h4_small} style={styles.description}>
              {banner.description}
            </AppText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

