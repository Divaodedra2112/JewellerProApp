import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { Category } from '../../modules/main/Home/HomeTypes';
import { styles } from './styles';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
  index?: number; // For color variation
}

// Color variations for category cards
const categoryColors = [
  { background: '#E3F2FD', icon: '#2196F3' }, // Light blue
  { background: '#E8F5E9', icon: '#4CAF50' }, // Light green
  { background: '#FFF9C4', icon: '#FBC02D' }, // Light yellow
  { background: '#FCE4EC', icon: '#E91E63' }, // Light pink
  { background: '#F3E5F5', icon: '#9C27B0' }, // Light purple
  { background: '#FFF3E0', icon: '#FF9800' }, // Light orange
  { background: '#E0F2F1', icon: '#009688' }, // Light teal
  { background: '#F5F5F5', icon: '#757575' }, // Light gray
];

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  index = 0,
}) => {
  const colorIndex = index % categoryColors.length;
  const cardColors = categoryColors[colorIndex];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: cardColors.background },
      ]}
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {category.icon ? (
          <Image
            source={{ uri: category.icon }}
            style={styles.icon}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.iconPlaceholder, { backgroundColor: cardColors.icon }]}>
            <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.iconText}>
              {category.title.charAt(0).toUpperCase()}
            </AppText>
          </View>
        )}
        <View style={styles.textContainer}>
          <AppText
            variant={TEXT_VARIANTS.h4_medium}
            style={styles.title}
            numberOfLines={2}
          >
            {category.title}
          </AppText>
          {category.description && (
            <AppText
              variant={TEXT_VARIANTS.h6_small}
              style={styles.description}
              numberOfLines={2}
            >
              {category.description}
            </AppText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

