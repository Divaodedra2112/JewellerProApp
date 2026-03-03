import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
import { BannerCard } from '../BannerCard/BannerCard';
import { Banner } from '../../modules/main/Home/HomeTypes';
import { scale, verticalScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { SCREEN_PADDING_HORIZONTAL } from '../../utils/layoutConstants';

interface BannerCarouselProps {
  banners: Banner[];
  onBannerPress?: (banner?: Banner) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 2 * SCREEN_PADDING_HORIZONTAL;
const BANNER_HEIGHT = verticalScale(180);

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  onBannerPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayBanners = banners;

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
          <View key={`banner-${banner.id}-${index}`} style={styles.bannerWrapper}>
            <BannerCard
              style={cardStyle}
              banner={banner}
              onPress={onBannerPress}
            />
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
    marginTop: 0,
    marginBottom: verticalScale(10),
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

