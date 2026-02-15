import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en.json';
import gu from '../locales/gu.json';
import hi from '../locales/hi.json';
import { logger } from '../utils/logger';

// Language codes
export type LanguageCode = 'en' | 'gu' | 'hi';

// Load saved language preference
const getSavedLanguage = async (): Promise<LanguageCode> => {
  try {
    const saved = await AsyncStorage.getItem('userLanguage');
    return (saved as LanguageCode) || 'en';
  } catch (error) {
    logger.error('Error loading saved language', error as Error);
    return 'en';
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
      hi: { translation: hi },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

// Load saved language on app start
getSavedLanguage().then((lang) => {
  i18n.changeLanguage(lang);
});

export default i18n;

