import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../../../components/CustomHeader/Header';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';
import { colors } from '../../../utils/theme';

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('settings.title')}
        showBackButton={false}
      />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LanguageSelector />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default SettingsScreen;


