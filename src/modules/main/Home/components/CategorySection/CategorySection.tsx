import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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

const CATEGORIES_PER_ROW = 3;

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  onCategoryPress,
  onSeeAllPress,
}) => {
  const activeCategories = categories
    .filter(category => category.status === 'ACTIVE')
    .sort((a, b) => a.order - b.order);

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant={TEXT_VARIANTS.h3} style={styles.headerTitle}>
          Categories
        </AppText>
        <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7} disabled={!onSeeAllPress}>
          <AppText variant={TEXT_VARIANTS.h4_small} style={styles.seeAllText}>
            See All
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {activeCategories.map((category, index) => (
          <View key={category.id} style={styles.gridItem}>
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

