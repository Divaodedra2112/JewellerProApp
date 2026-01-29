import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../utils/theme';
import { moderateScale } from '../../../utils/Responsive';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>React Native Boilerplate</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.bold,
    color: colors.textPrimary,
    marginBottom: moderateScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default Home;
