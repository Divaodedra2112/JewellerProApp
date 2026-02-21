import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { Category } from '../../modules/main/Home/HomeTypes';
import { EmptyState } from '../EmptyState/EmptyState';
import { scale, verticalScale } from '../../utils/Responsive';
import { styles } from './styles';

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategoryPress,
}) => {
  // Filter only ACTIVE categories and sort by order
  const activeCategories = categories
    .filter(category => category.status === 'ACTIVE')
    .sort((a, b) => a.order - b.order);

  if (activeCategories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          message="No categories available"
          description="Check back later for updates"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activeCategories.map((category, index) => (
        <View key={category.id} style={styles.cardWrapper}>
          <CategoryCard
            category={category}
            onPress={onCategoryPress}
            index={index}
          />
        </View>
      ))}
    </View>
  );
};

