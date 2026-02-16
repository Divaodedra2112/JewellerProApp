import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText } from '../../../components';
import { colors } from '../../../utils/theme';

const UpdatesScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Updates"
        showBackButton={false}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <AppText style={styles.welcomeTitle}>
            Updates
          </AppText>
          <AppText style={styles.welcomeSubtitle}>
            Stay tuned for the latest updates...
          </AppText>
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
    marginTop: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default UpdatesScreen;



