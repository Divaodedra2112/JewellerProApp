import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/languageSlice';
import i18n from '../../config/i18n';
import { LanguageCode } from '../../config/i18n';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const languages: Array<{ code: LanguageCode; name: string; nativeName: string }> = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
];

const LanguageSelector = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleLanguageChange = (langCode: LanguageCode) => {
    dispatch(setLanguage(langCode));
    i18n.changeLanguage(langCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && styles.selectedButton,
          ]}
          onPress={() => handleLanguageChange(lang.code)}
          activeOpacity={0.7}
        >
          <View style={styles.languageContent}>
            <Text
              style={[
                styles.languageText,
                currentLanguage === lang.code && styles.selectedText,
              ]}
            >
              {lang.nativeName}
            </Text>
            {lang.code !== currentLanguage && (
              <Text style={styles.languageSubtext}>{lang.name}</Text>
            )}
          </View>
          {currentLanguage === lang.code && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(20), // Large for elderly users
    fontFamily: Fonts.bold,
    color: colors.textPrimary,
    marginBottom: moderateScale(20),
  },
  languageButton: {
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    backgroundColor: colors.background,
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: colors.border || '#E0E0E0',
    minHeight: moderateScale(64), // Large touch target for elderly users
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedButton: {
    borderColor: colors.primary || '#007AFF',
    backgroundColor: colors.primaryLight || '#E3F2FD',
  },
  languageContent: {
    flex: 1,
  },
  languageText: {
    fontSize: moderateScale(20), // Large text for readability
    fontFamily: Fonts.semiBold,
    color: colors.textPrimary,
    marginBottom: moderateScale(4),
  },
  languageSubtext: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.regular,
    color: colors.textSecondary,
  },
  selectedText: {
    fontFamily: Fonts.bold,
    color: colors.primary || '#007AFF',
  },
  checkmark: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: colors.primary || '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontFamily: Fonts.bold,
  },
});

export default LanguageSelector;

