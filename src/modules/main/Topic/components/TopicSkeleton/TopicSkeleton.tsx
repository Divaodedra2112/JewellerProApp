import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SkeletonLoader } from '../../../../../components/SkeletonLoader/SkeletonLoader';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

export const TopicSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tag Skeleton */}
        <View style={styles.tagContainer}>
          <SkeletonLoader
            width={scale(60)}
            height={scale(28)}
            borderRadius={moderateScale(20)}
          />
        </View>

        {/* Title Skeleton */}
        <SkeletonLoader
          width="90%"
          height={scale(32)}
          borderRadius={moderateScale(4)}
          style={styles.titleSkeleton}
        />

        {/* Content Paragraphs Skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.paragraphContainer}>
            <SkeletonLoader
              width="100%"
              height={scale(16)}
              borderRadius={moderateScale(4)}
            />
            <View style={styles.paragraphSpacing} />
            <SkeletonLoader
              width="95%"
              height={scale(16)}
              borderRadius={moderateScale(4)}
            />
            <View style={styles.paragraphSpacing} />
            <SkeletonLoader
              width="88%"
              height={scale(16)}
              borderRadius={moderateScale(4)}
            />
            {item < 5 && <View style={styles.paragraphMargin} />}
          </View>
        ))}

        {/* Download Button Skeleton */}
        <View style={styles.buttonContainer}>
          <SkeletonLoader
            width="100%"
            height={verticalScale(50)}
            borderRadius={moderateScale(8)}
          />
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
    padding: scale(20),
    paddingBottom: verticalScale(30),
  },
  tagContainer: {
    marginBottom: verticalScale(16),
  },
  titleSkeleton: {
    marginBottom: verticalScale(20),
  },
  paragraphContainer: {
    marginBottom: verticalScale(16),
  },
  paragraphSpacing: {
    height: verticalScale(8),
  },
  paragraphMargin: {
    height: verticalScale(12),
  },
  buttonContainer: {
    marginTop: verticalScale(20),
    paddingTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
});

