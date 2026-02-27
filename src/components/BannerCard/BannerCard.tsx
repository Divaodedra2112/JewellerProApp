import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { Banner } from '../../modules/main/Home/HomeTypes';
import { ArrowRightIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { styles } from './styles';

interface BannerCardProps {
  banner?: Banner;
  onPress?: (banner?: Banner) => void;
  style?: ViewStyle;
  // Support for static/local images
  localImage?: ImageSourcePropType;
  title?: string;
  description?: string;
  linkUrl?: string;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  banner,
  onPress,
  style,
  localImage,
  title,
  description,
  linkUrl,
}) => {
  // Use banner props if provided, otherwise use direct props
  const displayTitle = title; // Banner from API doesn't have title
  const displayDescription = description; // Banner from API doesn't have description
  const displayLinkUrl = banner?.navigateUrl || linkUrl;
  const displayImageUrl = banner?.image?.url;

  const handlePress = async () => {
    if (onPress) {
      onPress(banner);
    } else if (displayLinkUrl) {
      // Handle external URL
      const canOpen = await Linking.canOpenURL(displayLinkUrl);
      if (canOpen) {
        await Linking.openURL(displayLinkUrl);
      }
    }
  };

  const handleViewButtonPress = async (e: any) => {
    e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
    if (displayLinkUrl) {
      const canOpen = await Linking.canOpenURL(displayLinkUrl);
      if (canOpen) {
        await Linking.openURL(displayLinkUrl);
      }
    }
  };

  return (
    <TouchableOpacity
      style={style}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {localImage ? (
        <Image
          source={localImage}
          resizeMode="cover"
        />
      ) : displayImageUrl ? (
        <Image
          source={{ uri: displayImageUrl }}
          resizeMode="cover"
        />
      ) : null}
      {/* View Button - Only show if linkUrl is available */}
      {displayLinkUrl && (
        <TouchableOpacity
          style={styles.viewButton}
          onPress={handleViewButtonPress}
          activeOpacity={0.8}
        >
          <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.viewButtonText}>
            View
          </AppText>
          <ArrowRightIcon width={scale(16)} height={scale(16)} color={colors.primary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

