import React from 'react';
import { View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SkeletonLoader } from '../../../../../components/SkeletonLoader/SkeletonLoader';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

export const HomeSkeleton: React.FC = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight || 0);
  const topPadding = statusBarHeight + verticalScale(16);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Skeleton */}
        <View style={[styles.profileHeader, { paddingTop: topPadding }]}>
          <View style={styles.profileTextContainer}>
            <SkeletonLoader width={scale(150)} height={scale(16)} borderRadius={moderateScale(4)} />
            <View style={styles.profileTextSpacing} />
            <SkeletonLoader width={scale(200)} height={scale(20)} borderRadius={moderateScale(4)} />
          </View>
          <SkeletonLoader
            width={scale(56)}
            height={scale(56)}
            borderRadius={scale(28)}
          />
        </View>

        {/* Banner Skeleton */}
        <View style={styles.bannerContainer}>
          <SkeletonLoader
            width="100%"
            height={verticalScale(180)}
            borderRadius={moderateScale(16)}
          />
        </View>

        {/* Category Section Skeleton */}
        <View style={styles.categorySectionContainer}>
          {/* Header */}
          <View style={styles.categorySectionHeader}>
            <SkeletonLoader
              width={scale(100)}
              height={scale(20)}
              borderRadius={moderateScale(4)}
            />
            <SkeletonLoader
              width={scale(60)}
              height={scale(16)}
              borderRadius={moderateScale(4)}
            />
          </View>
          {/* Scrollable Category Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={styles.categorySectionCard}>
                <SkeletonLoader
                  width={scale(100)}
                  height={scale(100)}
                  borderRadius={moderateScale(16)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Updates Button Skeleton */}
        <View style={styles.updatesButtonContainer}>
          <SkeletonLoader
            width="100%"
            height={verticalScale(56)}
            borderRadius={moderateScale(12)}
          />
        </View>

        {/* Action Cards Skeleton */}
        <View style={styles.actionCardsContainer}>
          <View style={styles.actionCard}>
            <SkeletonLoader
              width="100%"
              height={verticalScale(100)}
              borderRadius={moderateScale(16)}
            />
          </View>
          <View style={styles.actionCard}>
            <SkeletonLoader
              width="100%"
              height={verticalScale(100)}
              borderRadius={moderateScale(16)}
            />
          </View>
        </View>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50), // Added top margin for status bar
    paddingBottom: verticalScale(20),
  },
  profileTextContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  profileTextSpacing: {
    height: verticalScale(8),
  },
  bannerContainer: {
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(12),
  },
  categorySectionContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  categorySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  categoryScrollContent: {
    paddingHorizontal: scale(10),
    paddingRight: scale(20),
  },
  categorySectionCard: {
    marginRight: scale(12),
  },
  updatesButtonContainer: {
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(12),
  },
  actionCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(12),
    gap: scale(12),
  },
  actionCard: {
    flex: 1,
  },
});

