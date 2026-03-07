import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText } from '../../../components';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';

const ChatbotScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Chatbot"
        showBackButton={false}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <AppText variant={TEXT_VARIANTS.h2} style={styles.welcomeTitle}>
            Chatbot
          </AppText>
          <AppText variant={TEXT_VARIANTS.h4_small} style={styles.welcomeSubtitle}>
            AI Assistant coming soon...
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
    color: colors.textPrimary,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default ChatbotScreen;






