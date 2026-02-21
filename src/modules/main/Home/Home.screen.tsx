import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../../store';
import { EmptyState } from '../../../components';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { BannerCard } from '../../../components/BannerCard/BannerCard';
import { CategoryGrid } from '../../../components/CategoryGrid/CategoryGrid';
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
    logger.info('Home Screen - Banner pressed', { bannerId: banner.id, bannerTitle: banner.title });
    // BannerCard handles URL opening internally
  }, []);

  // Get banners from homeData
  const banners = homeData?.banners || [];
  const firstBanner = banners.length > 0 ? banners[0] : null;
  const secondBanner = banners.length > 1 ? banners[1] : null;
  const categories = homeData?.categories || [];

  // Loading state or error state - show skeleton instead of empty page
  if ((loading && !homeData) || (error && !homeData)) {
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
        {/* Profile Header */}
        <ProfileHeader
          userName={user?.name}
          userPhoto={user?.photo}
        />

        {/* First Banner - Show static banner if API doesn't provide one */}
        {firstBanner ? (
          <BannerCard
            banner={firstBanner}
            onPress={handleBannerPress}
            style={styles.banner}
          />
        ) : (
          <BannerCard
            localImage={Images.HOME_BANNER}
            onPress={handleBannerPress}
            style={styles.banner}
          />
        )}

        {/* Category Grid */}
        <CategoryGrid
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />

        {/* Second Banner (optional) */}
        {secondBanner && (
          <BannerCard
            banner={secondBanner}
            onPress={handleBannerPress}
            style={styles.banner}
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
  banner: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
});

export default HomeScreen;
