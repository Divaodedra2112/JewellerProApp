import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
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
    fontWeight: '600',
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
