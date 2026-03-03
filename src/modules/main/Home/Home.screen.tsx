import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../../store';
import { EmptyState } from '../../../components';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { BannerCarousel } from '../../../components/BannerCarousel/BannerCarousel';
import { CategorySection } from './components/CategorySection/CategorySection';
import { UpdatesButton } from './components/UpdatesButton/UpdatesButton';
import { ActionCards } from './components/ActionCards/ActionCards';
import { HomeSkeleton } from './components/HomeSkeleton/HomeSkeleton';
import { fetchHomeData } from './HomeActions';
import { setRefreshing } from '../../../store/slices/homeSlice';
import { MainStackParamList } from '../../../types/navigation';
import { Category } from './HomeTypes';
import { colors } from '../../../utils/theme';
import { scale, verticalScale } from '../../../utils/Responsive';
import { logger } from '../../../utils/logger';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

/**
 * Home Screen - Displays user profile, banners, and categories
 */
// Bottom tab bar height (GlassTabBar: ~70) + bottom offset (8) + extra spacing
const BOTTOM_TAB_BAR_HEIGHT = 90;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { homeData, loading, error, refreshing } = useSelector(
    (state: RootState) => state.home
  );

  const [scrollY, setScrollY] = useState(0);

  const topSafeArea = { paddingTop: insets.top };
  const scrollContentPadding = {
    paddingBottom: insets.bottom + verticalScale(BOTTOM_TAB_BAR_HEIGHT),
  };

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  }, []);

  // Fetch home data on mount
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  // Handle pull to refresh
  const handleRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(fetchHomeData());
  }, [dispatch]);

  // Handle category press
  const handleCategoryPress = useCallback(
    (category: Category) => {
      logger.info('Home Screen - Category pressed', {
        categoryId: category.id,
        categoryTitle: category.title,
        hasSubCategory: category.hasSubCategory,
      });

      if (category.hasSubCategory) {
        // Navigate to SubCategory screen
        navigation.navigate('SubCategory', {
          categoryId: category.id,
          categoryTitle: category.title,
        });
      } else {
        // Navigate directly to Topic screen
        navigation.navigate('Topic', {
          id: category.id,
          title: category.title,
          type: 'category',
        });
      }
    },
    [navigation]
  );

  // Handle banner press
  const handleBannerPress = useCallback((banner: any) => {
    logger.info('Home Screen - Banner pressed', { bannerId: banner?.id });
    // BannerCard handles URL opening internally
  }, []);

  const banners = homeData?.banners || [];
  const promotionalBanners = homeData?.promotionalBanners || [];
  const categories = homeData?.categories || [];
  const links = homeData?.links;
  const zoomMeeting =
    homeData?.zoomMeeting ||
    (links?.zoomMeetingUrl ? { linkUrl: links.zoomMeetingUrl } : undefined);

  // Loading state - show skeleton during initial load
  // Show skeleton when loading and not refreshing (pull-to-refresh uses RefreshControl)
  if (loading && !refreshing) {
    return <HomeSkeleton />;
  }

  return (
    <View style={[styles.container, topSafeArea]}>
      {/* Sticky header – stays fixed while content scrolls */}
      <ProfileHeader
        userName={user?.name}
        userPhoto={user?.photo}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, scrollContentPadding]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Spacer: no gap when at top, space when scrolled (below sticky header) */}
        <View style={{ height: scrollY > 0 ? verticalScale(12) : 0 }} />
        {banners.length > 0 && (
          <BannerCarousel
            banners={banners}
            onBannerPress={handleBannerPress}
          />
        )}

        {/* Categories - grid 3 columns, See All */}
        <CategorySection
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />

        {/* Get the Latest Updates */}
        <UpdatesButton />

        {/* Action Cards - Verify Pan Card + Join the Meeting (from API data.links) */}
        <ActionCards
          zoomMeeting={zoomMeeting}
          zoomMeetingUrl={links?.zoomMeetingUrl}
          panCardLinkUrl={links?.panCardVerifyUrl}
        />

        {/* Optional promotional banners at bottom – only when API provides data.promotionalBanners */}
        {promotionalBanners.length > 0 && (
          <BannerCarousel
            banners={promotionalBanners}
            onBannerPress={handleBannerPress}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: verticalScale(20),
  },
});

export default HomeScreen;
