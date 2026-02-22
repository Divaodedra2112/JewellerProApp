import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { Category } from '../../../HomeTypes';
import { scale, verticalScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { CategorySectionCard } from './CategorySectionCard';
import { styles } from './styles';

interface CategorySectionProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  onSeeAllPress?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  onCategoryPress,
  onSeeAllPress,
}) => {
  // Filter only ACTIVE categories and sort by order
  const activeCategories = categories
    .filter(category => category.status === 'ACTIVE')
    .sort((a, b) => a.order - b.order);

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant={TEXT_VARIANTS.h3} style={styles.headerTitle}>
          Categories
        </AppText>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
            <AppText variant={TEXT_VARIANTS.h4_small} style={styles.seeAllText}>
              See All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {/* Scrollable Category Grid */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeCategories.map((category, index) => (
          <CategorySectionCard
            key={category.id}
            category={category}
            onPress={onCategoryPress}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

