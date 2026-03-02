import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../../store';
import { EmptyState } from '../../../components';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { JewellerProAppCard } from './components/JewellerProAppCard/JewellerProAppCard';
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
import { Images } from '../../../utils';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

/**
 * Home Screen - Displays user profile, banners, and categories
 */
const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { homeData, loading, error, refreshing } = useSelector(
    (state: RootState) => state.home
  );

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
  const categories = homeData?.categories || [];
  const links = homeData?.links;
  const zoomMeeting =
    homeData?.zoomMeeting ||
    (links?.zoomMeetingUrl ? { linkUrl: links.zoomMeetingUrl } : undefined);

  const handleSeeAllCategories = useCallback(() => {
    navigation.navigate('Questions');
  }, [navigation]);

  // Loading state - show skeleton during initial load
  // Show skeleton when loading and not refreshing (pull-to-refresh uses RefreshControl)
  if (loading && !refreshing) {
    return <HomeSkeleton />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Profile Header - Hi Welcome + user name + avatar */}
        <ProfileHeader
          userName={user?.name}
          userPhoto={user?.photo}
        />

        {/* Jeweller Pro App info card (Figma) */}
        <JewellerProAppCard />

        {/* Categories - grid 3 columns, See All */}
        <CategorySection
          categories={categories}
          onCategoryPress={handleCategoryPress}
          onSeeAllPress={handleSeeAllCategories}
        />

        {/* Get the Latest Updates */}
        <UpdatesButton />

        {/* Action Cards - Verify Pan Card + Join the Meeting (from API data.links) */}
        <ActionCards
          zoomMeeting={zoomMeeting}
          zoomMeetingUrl={links?.zoomMeetingUrl}
          panCardLinkUrl={links?.panCardVerifyUrl}
        />

        {/* Banners from API (image.url, navigateUrl) */}
        <BannerCarousel
          banners={banners}
          localImage={Images.HOME_BANNER}
          localImages={[Images.HOME_BANNER_1, Images.HOME_BANNER_2, Images.HOME_BANNER_3]}
          onBannerPress={handleBannerPress}
        />
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
