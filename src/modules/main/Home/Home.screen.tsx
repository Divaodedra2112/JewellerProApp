import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText, CustomHeader, AppButton } from '../../../components';
import { colors } from '../../../utils/theme';

/**
 * Home Screen - Generic boilerplate home screen
 * TODO: Customize this screen for your app
 */
const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('app.name') || 'Home'}
        showBackButton={false}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <AppText style={styles.welcomeTitle}>
            {t('home.welcome') || 'Welcome to React Native Boilerplate'}
          </AppText>
          <AppText style={styles.welcomeSubtitle}>
            {t('home.subtitle') ||
              'This is a production-ready boilerplate with authentication, navigation, and best practices built-in.'}
          </AppText>
        </View>

        <View style={styles.featuresSection}>
          <AppText style={styles.sectionTitle}>
            {t('home.features') || 'Features Included'}
          </AppText>
          <View style={styles.featureList}>
            <AppText style={styles.featureItem}>✓ TypeScript with strict mode</AppText>
            <AppText style={styles.featureItem}>✓ Redux Toolkit + Persist</AppText>
            <AppText style={styles.featureItem}>✓ React Navigation</AppText>
            <AppText style={styles.featureItem}>✓ i18next (Multi-language)</AppText>
            <AppText style={styles.featureItem}>✓ RBAC System</AppText>
            <AppText style={styles.featureItem}>✓ Authentication Flow</AppText>
            <AppText style={styles.featureItem}>✓ Permission Handling</AppText>
            <AppText style={styles.featureItem}>✓ UI Kitten Components</AppText>
            <AppText style={styles.featureItem}>✓ TypeScript with strict mode</AppText>
            <AppText style={styles.featureItem}>✓ Redux Toolkit + Persist</AppText>
            <AppText style={styles.featureItem}>✓ React Navigation</AppText>
            <AppText style={styles.featureItem}>✓ i18next (Multi-language)</AppText>
            <AppText style={styles.featureItem}>✓ RBAC System</AppText>
            <AppText style={styles.featureItem}>✓ Authentication Flow</AppText>
            <AppText style={styles.featureItem}>✓ Permission Handling</AppText>
            <AppText style={styles.featureItem}>✓ UI Kitten Components</AppText>
          </View>

        </View>

        <View style={styles.actionsSection}>
          <AppButton
            onPress={() => {
              // TODO: Add your action
            }}
            style={styles.actionButton}>
            {t('home.getStarted') || 'Get Started'}
          </AppButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  featureList: {
    gap: 10,
  },
  featureItem: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  actionsSection: {
    marginTop: 20,
  },
  actionButton: {
    marginTop: 10,
  },
});

export default HomeScreen;
