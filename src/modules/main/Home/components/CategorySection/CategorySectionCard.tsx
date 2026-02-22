import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { Category } from '../../../HomeTypes';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { styles } from './CategorySectionCardStyles';

interface CategorySectionCardProps {
  category: Category;
  onPress: (category: Category) => void;
  index?: number;
}

export const CategorySectionCard: React.FC<CategorySectionCardProps> = ({
  category,
  onPress,
  index = 0,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
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
          <View style={styles.iconPlaceholder}>
            <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.iconText}>
              {category.title.charAt(0).toUpperCase()}
            </AppText>
          </View>
        )}
        <AppText
          variant={TEXT_VARIANTS.h6_small}
          style={styles.title}
          numberOfLines={2}
        >
          {category.title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

