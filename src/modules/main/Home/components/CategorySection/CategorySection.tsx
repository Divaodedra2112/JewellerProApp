import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { Category } from '../../HomeTypes';
import { CategorySectionCard } from './CategorySectionCard';
import { styles } from './styles';

const INITIAL_CATEGORIES_COUNT = 6;

interface CategorySectionProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  onCategoryPress,
}) => {
  const [expanded, setExpanded] = useState(false);

  const activeCategories = categories
    .filter(category => category.status === 'ACTIVE')
    .sort((a, b) => a.order - b.order);

  const hasMoreThanSix = activeCategories.length > INITIAL_CATEGORIES_COUNT;
  const displayedCategories = expanded
    ? activeCategories
    : activeCategories.slice(0, INITIAL_CATEGORIES_COUNT);

  const handleSeeAllPress = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant={TEXT_VARIANTS.h3} style={styles.headerTitle}>
          Categories
        </AppText>
        {hasMoreThanSix && (
          <TouchableOpacity onPress={handleSeeAllPress} activeOpacity={0.7}>
            <AppText variant={TEXT_VARIANTS.h4_small} style={styles.seeAllText}>
              {expanded ? 'See Less' : 'See All'}
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.grid}>
        {displayedCategories.map((category, index) => (
          <View
            key={category.id}
            style={[styles.gridItem, index % 3 === 2 && styles.gridItemLastInRow]}
          >
            <CategorySectionCard
              category={category}
              onPress={onCategoryPress}
              index={index}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

