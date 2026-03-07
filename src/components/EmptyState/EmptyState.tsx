import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';
import { AppText } from '../AppText/AppText';
import { TEXT_VARIANTS } from '../AppText/AppText';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <AppText variant={TEXT_VARIANTS.h2} style={styles.title}>{title}</AppText>
      {description && <AppText variant={TEXT_VARIANTS.h4_small} style={styles.description}>{description}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(18),
    color: colors.gray1000,
    marginBottom: moderateScale(8),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(14),
    color: colors.gray600,
    textAlign: 'center',
  },
});
