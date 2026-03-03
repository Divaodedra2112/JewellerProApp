import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
import { BannerCard } from '../BannerCard/BannerCard';
import { Banner } from '../../modules/main/Home/HomeTypes';
import { ImageSourcePropType } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { SCREEN_PADDING_HORIZONTAL } from '../../utils/layoutConstants';

interface BannerCarouselProps {
  banners?: Banner[];
  localImage?: ImageSourcePropType; // Fallback when API returns no banners
  localImages?: ImageSourcePropType[]; // Multiple fallback images when no API banners
  onBannerPress?: (banner?: Banner) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 2 * SCREEN_PADDING_HORIZONTAL;
const BANNER_HEIGHT = verticalScale(180);

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners = [],
  localImage,
  localImages,
  onBannerPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // If no banners from API, use static images for testing
  // Priority: localImages array > localImage single > empty array
  const staticImages = localImages && localImages.length > 0 
    ? localImages 
    : localImage 
    ? [localImage] 
    : [];

  // Create mock banners from static images if no API banners
  const mockBanners: Banner[] = staticImages.map((_, index) => ({
    id: `static-banner-${index}`,
    image: {
      url: '',
      objectName: `static-banner-${index}.png`,
    },
    navigateUrl: `https://jewellerpro.in/banner-${index + 1}`,
    order: index + 1,
    status: 'ACTIVE' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const displayBanners = banners.length > 0 ? banners : mockBanners;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveIndex(index);
  };

  const cardStyle = { width: BANNER_WIDTH, height: BANNER_HEIGHT };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        snapToAlignment="start"
        nestedScrollEnabled={Platform.OS === 'android'}
      >
        {displayBanners.map((banner, index) => (
          <View 
            key={banners.length === 0 ? `banner-static-${index}` : `banner-${banner.id}-${index}`} 
            style={styles.bannerWrapper}
          >
            {banners.length === 0 && staticImages.length > 0 ? (
              <BannerCard
                style={cardStyle}
                localImage={staticImages[index % staticImages.length]}
                linkUrl={banner.navigateUrl}
                onPress={onBannerPress}
              />
            ) : (
              <BannerCard
                style={cardStyle}
                banner={banner}
                onPress={onBannerPress}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {displayBanners.length > 1 && (
        <View style={styles.pagination}>
          {displayBanners.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_PADDING_HORIZONTAL,
    marginBottom: verticalScale(16),
  },
  scrollContent: {
    // paddingLeft: SCREEN_WIDTH * 0.025, // Left padding to center first card
    // paddingRight: SCREEN_WIDTH * 0.025, // Right padding for last card
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: colors.gray200,
  },
});

export default BannerCarousel;

