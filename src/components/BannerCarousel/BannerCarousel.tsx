import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { BannerCard } from '../BannerCard/BannerCard';
import { Banner } from '../../modules/main/Home/HomeTypes';
import { ImageSourcePropType } from 'react-native';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';

interface BannerCarouselProps {
  banners?: Banner[];
  localImage?: ImageSourcePropType; // Fallback static image (single)
  localImages?: ImageSourcePropType[]; // Multiple fallback static images for testing
  onBannerPress?: (banner?: Banner) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// For paging, we use screen width as the snap interval
// BannerCard is 95% width with 10px margin on each side
const BANNER_WIDTH = SCREEN_WIDTH;

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
    title: '',
    description: '',
    imageUrl: '',
    linkUrl: `https://jewellerpro.in/banner-${index + 1}`,
    order: index + 1,
    status: 'ACTIVE' as const,
  }));

  const displayBanners = banners.length > 0 ? banners : mockBanners;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveIndex(index);
  };

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
      >
        {displayBanners.map((banner, index) => (
          <View 
            key={banners.length === 0 ? `banner-static-${index}` : `banner-${banner.id}-${index}`} 
            style={[
              styles.bannerWrapper,
              index === displayBanners.length - 1 && styles.lastBannerWrapper
            ]}
          >
            {/* Use static images if no banners from API */}
            {banners.length === 0 && staticImages.length > 0 ? (
              <BannerCard
                localImage={staticImages[index % staticImages.length]}
                title={banner.title}
                description={banner.description}
                linkUrl={banner.linkUrl}
                onPress={onBannerPress}
              />
            ) : (
              <BannerCard
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
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  scrollContent: {
    // paddingLeft: SCREEN_WIDTH * 0.025, // Left padding to center first card
    // paddingRight: SCREEN_WIDTH * 0.025, // Right padding for last card
  },
  bannerWrapper: {
    width: SCREEN_WIDTH, // Each wrapper takes full screen width for proper paging
    alignItems: 'center', // Center the banner card within the wrapper
    // marginRight: scale(10), // Add right margin after each banner
  },
  lastBannerWrapper: {
    marginRight: 0, // Remove margin from last banner as it has paddingRight from scrollContent
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

