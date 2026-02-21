import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SkeletonLoader } from '../../../../../components/SkeletonLoader/SkeletonLoader';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';

export const SubCategorySkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <SkeletonLoader
                  width="70%"
                  height={scale(18)}
                  borderRadius={moderateScale(4)}
                />
                <View style={styles.textSpacing} />
                <SkeletonLoader
                  width="100%"
                  height={scale(14)}
                  borderRadius={moderateScale(4)}
                />
                <View style={styles.textSpacing} />
                <SkeletonLoader
                  width="85%"
                  height={scale(14)}
                  borderRadius={moderateScale(4)}
                />
              </View>
              <SkeletonLoader
                width={scale(20)}
                height={scale(20)}
                borderRadius={moderateScale(4)}
              />
            </View>
          </View>
        ))}
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
    padding: scale(16),
    paddingBottom: verticalScale(20),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(12),
    // Shadow properties
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: scale(2),
    elevation: 2, // For Android
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
  },
  textContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  textSpacing: {
    height: verticalScale(8),
  },
});

