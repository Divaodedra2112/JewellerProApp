import React, { useState, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { Category } from '../../HomeTypes';
import { CategorySectionCard } from './CategorySectionCard';
import { styles } from './styles';
import { scale } from '../../../../../utils/Responsive';
import { SCREEN_PADDING_HORIZONTAL } from '../../../../../utils/layoutConstants';

const INITIAL_CATEGORIES_COUNT = 6;
const CATEGORY_GAP = scale(12);
const CATEGORIES_PER_ROW = 3;

interface CategorySectionProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  onCategoryPress,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { width: screenWidth } = useWindowDimensions();

  const categoryItemWidth = useMemo(() => {
    const contentWidth = screenWidth - 2 * SCREEN_PADDING_HORIZONTAL;
    const totalGaps = (CATEGORIES_PER_ROW - 1) * CATEGORY_GAP;
    return (contentWidth - totalGaps) / CATEGORIES_PER_ROW;
  }, [screenWidth]);

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
            style={[
              styles.gridItem,
              {
                width: categoryItemWidth,
                marginRight: index % CATEGORIES_PER_ROW === CATEGORIES_PER_ROW - 1 ? 0 : CATEGORY_GAP,
              },
            ]}
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

