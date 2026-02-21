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

        {/* Category Grid Skeleton */}
        <View style={styles.categoryGrid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.categoryCard}>
              <View style={styles.categoryCardInner}>
                <SkeletonLoader
                  width={scale(40)}
                  height={scale(40)}
                  borderRadius={scale(20)}
                />
                <View style={styles.categoryTextSpacing} />
                <SkeletonLoader
                  width="100%"
                  height={scale(16)}
                  borderRadius={moderateScale(4)}
                />
                <View style={styles.categoryTextSpacing} />
                <SkeletonLoader
                  width="80%"
                  height={scale(12)}
                  borderRadius={moderateScale(4)}
                />
                <View style={styles.categoryTextSpacing} />
                <SkeletonLoader
                  width="60%"
                  height={scale(12)}
                  borderRadius={moderateScale(4)}
                />
              </View>
            </View>
          ))}
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
  },
  categoryCard: {
    width: '50%',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
  },
  categoryCardInner: {
    padding: scale(16),
    borderRadius: moderateScale(16),
    backgroundColor: colors.white,
    minHeight: verticalScale(120),
    // Shadow properties to match actual CategoryCard
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
  },
  categoryTextSpacing: {
    height: verticalScale(6),
  },
});

