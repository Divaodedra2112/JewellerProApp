import React from 'react';
import { Layout } from '@ui-kitten/components';
import { AppText, TEXT_VARIANTS } from '../../components/AppText/AppText';
import styles from './NoResultsFoundScreen.styles';
import { AppButton, AppImage } from '../../components';
import { Images } from '../../utils';
import { ViewStyle } from 'react-native';

interface NoResultsFoundScreenProps {
  onPress?: () => void;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  title?: string;
  subtitle?: string;
  imageStyle?: ViewStyle;
}

const NoResultsFoundScreen = ({
  hasActiveFilters = false,
  onResetFilters,
  title = 'No results found.',
  subtitle = "Unfortunately, we couldn't find any product results for now.",
  imageStyle,
}: NoResultsFoundScreenProps) => (
  <Layout style={styles.container} level="1">
    <AppImage
      image={Images.EMPTY_DATA_IMAGE}
      mainStyle={[styles.image, imageStyle || {}]}
      resizeMode="contain"
    />
    <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
      {title}
    </AppText>
    <AppText variant={TEXT_VARIANTS.h3_large} style={styles.subtitle}>
      {subtitle}
    </AppText>

    {hasActiveFilters && onResetFilters && (
      <AppButton onPress={onResetFilters} style={styles.button}>
        Reset Filters
      </AppButton>
    )}
  </Layout>
);

export default NoResultsFoundScreen;
