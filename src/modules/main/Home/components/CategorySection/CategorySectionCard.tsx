import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { Category } from '../../../HomeTypes';
import { scale } from '../../../../../utils/Responsive';
import { styles } from './CategorySectionCardStyles';

interface CategorySectionCardProps {
  category: Category;
  onPress: (category: Category) => void;
  index?: number;
}

const isSvgUrl = (url: string) => url?.toLowerCase().includes('.svg') || url?.includes('svg');

export const CategorySectionCard: React.FC<CategorySectionCardProps> = ({
  category,
  onPress,
}) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);
  const iconUrl = category.icon?.url;

  useEffect(() => {
    if (!iconUrl || !isSvgUrl(iconUrl)) return;
    let cancelled = false;
    fetch(iconUrl)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setSvgXml(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [iconUrl]);

  const showSvg = isSvgUrl(iconUrl ?? '') && svgXml;
  const showImage = iconUrl && !isSvgUrl(iconUrl);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          {showSvg ? (
            <SvgXml xml={svgXml!} width={scale(34)} height={scale(34)} />
          ) : showImage ? (
            <Image
              source={{ uri: iconUrl }}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.iconPlaceholder}>
              <AppText variant={TEXT_VARIANTS.h4_small} style={styles.iconText}>
                {category.title.charAt(0).toUpperCase()}
              </AppText>
            </View>
          )}
        </View>
        <View style={styles.titleWrapper}>
          <AppText variant={TEXT_VARIANTS.h4_small} style={styles.title} numberOfLines={2}>
            {category.title}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

