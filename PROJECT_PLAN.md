# Association Information App - Project Plan

## 📋 Project Overview

A simple, user-friendly mobile application for displaying association information with multi-language support (Gujarati, Hindi, English), designed specifically for elderly and non-technical users.

---

## 🎯 Core Features

### 1. Association Information Display
- **Association Name** - Prominent display
- **Office Address** - Full address with map integration (optional)
- **Contact Phone Number** - Click-to-call functionality
- **Email Address** - Tap to open email application
- **Office Working Hours** - Clear display of business hours

### 2. Multi-Language Support
- **Supported Languages:**
  - Gujarati (ગુજરાતી)
  - Hindi (हिंदी)
  - English
- **Language Preference** - Saved per user (persisted)
- **Language Switcher** - Easy access in settings/drawer

### 3. User Experience (Elderly-Friendly)
- Large, readable fonts
- High contrast colors
- Simple navigation
- Clear, prominent buttons
- Minimal cognitive load
- Easy-to-tap targets (minimum 44x44pt)

---

## 🏗️ Technical Architecture

### Phase 1: Core Features (MVP)

#### Module Structure

```
src/modules/
├── main/
│   ├── Home/                    # Main dashboard
│   │   └── HomeScreen.tsx       # Association info display
│   ├── Settings/                # Settings screen
│   │   ├── SettingsScreen.tsx
│   │   └── LanguageSelector.tsx
│   └── About/                    # About screen (optional)
│       └── AboutScreen.tsx
├── auth/                        # Keep existing (if login needed)
└── UtilityScreens/             # Keep existing
```

#### New Components Needed

```
src/components/
├── AssociationInfoCard/         # Display association details
│   ├── AssociationInfoCard.tsx
│   └── AssociationInfoCard.style.ts
├── ContactButton/               # Click-to-call/tap-to-email
│   ├── ContactButton.tsx
│   └── ContactButton.style.ts
├── WorkingHoursDisplay/         # Display working hours
│   ├── WorkingHoursDisplay.tsx
│   └── WorkingHoursDisplay.style.ts
├── LanguageSelector/            # Language picker
│   ├── LanguageSelector.tsx
│   └── LanguageSelector.style.ts
└── LargeText/                   # Elderly-friendly text component
    └── LargeText.tsx
```

#### Services

```
src/services/
├── associationService.ts        # Fetch association data
├── languageService.ts           # Language management
└── contactService.ts            # Handle phone/email actions
```

#### Redux Slices

```
src/store/slices/
├── associationSlice.ts          # Association data state
└── languageSlice.ts             # Language preference state
```

#### Translations

```
src/locales/
├── en.json                      # English translations
├── gu.json                      # Gujarati translations
└── hi.json                      # Hindi translations
```

---

## 📱 Screen Flow

### Navigation Structure

```
RootNavigator
├── AuthNavigator (if login required)
│   └── LoginScreen
└── MainNavigator
    ├── BottomTabNavigator
    │   ├── HomeTab (Association Info)
    │   └── SettingsTab
    └── DrawerNavigator
        └── (Optional: About, Help)
```

### Screen Details

#### 1. Home Screen (Main)
- **Purpose:** Display association information
- **Components:**
  - Association name (large, prominent)
  - Office address (with optional map button)
  - Phone number (large button - click to call)
  - Email (large button - tap to email)
  - Working hours (clear format)
- **Features:**
  - Pull-to-refresh (optional)
  - Large touch targets
  - High contrast design

#### 2. Settings Screen
- **Purpose:** User preferences
- **Components:**
  - Language selector (large, easy to use)
  - Font size selector (optional - for accessibility)
  - Theme toggle (optional)
- **Features:**
  - Save preferences locally
  - Immediate language change

---

## 🛠️ Implementation Plan

### Step 1: Setup & Configuration (Day 1-2)

#### 1.1 Install Dependencies
```bash
# Multi-language support
yarn add i18next react-i18next
yarn add @react-native-async-storage/async-storage  # Already installed

# Phone/Email functionality (built-in React Native)
# Linking API for phone/email

# Optional: Map integration
yarn add react-native-maps  # If showing address on map
```

#### 1.2 Project Configuration
- [ ] Update `package.json` with new app name
- [ ] Update bundle IDs (iOS/Android)
- [ ] Configure i18next
- [ ] Set up translation files structure

#### 1.3 Theme Customization
- [ ] Update `src/utils/theme.ts`:
  - Large font sizes (minimum 16pt, preferred 18-20pt)
  - High contrast colors
  - Increased spacing
  - Larger touch targets

### Step 2: Language Support (Day 3-4)

#### 2.1 Setup i18next
```typescript
// src/config/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en.json';
import gu from '../locales/gu.json';
import hi from '../locales/hi.json';

// Load saved language preference
const getSavedLanguage = async () => {
  const saved = await AsyncStorage.getItem('userLanguage');
  return saved || 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
      hi: { translation: hi },
    },
    lng: 'en', // default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

#### 2.2 Create Translation Files
```json
// src/locales/en.json
{
  "app": {
    "name": "Association App",
    "welcome": "Welcome"
  },
  "association": {
    "name": "Association Name",
    "address": "Office Address",
    "phone": "Phone Number",
    "email": "Email Address",
    "workingHours": "Working Hours",
    "call": "Call",
    "email": "Send Email"
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "selectLanguage": "Select Language"
  },
  "languages": {
    "english": "English",
    "gujarati": "Gujarati",
    "hindi": "Hindi"
  }
}
```

#### 2.3 Create Language Slice
```typescript
// src/store/slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  currentLanguage: 'en' | 'gu' | 'hi';
}

const initialState: LanguageState = {
  currentLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'gu' | 'hi'>) => {
      state.currentLanguage = action.payload;
      AsyncStorage.setItem('userLanguage', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
```

### Step 3: Association Information Module (Day 5-7)

#### 3.1 Create Association Service
```typescript
// src/services/associationService.ts
import { get } from './api';

export interface AssociationInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    [key: string]: string; // e.g., "Monday": "9:00 AM - 5:00 PM"
  };
}

export const getAssociationInfo = async (): Promise<AssociationInfo> => {
  // Replace with your API endpoint
  const response = await get<AssociationInfo>('/association/info');
  return response.data;
};
```

#### 3.2 Create Association Slice
```typescript
// src/store/slices/associationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAssociationInfo, AssociationInfo } from '../../services/associationService';

export const fetchAssociationInfo = createAsyncThunk(
  'association/fetchInfo',
  async () => {
    return await getAssociationInfo();
  }
);

interface AssociationState {
  info: AssociationInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AssociationState = {
  info: null,
  loading: false,
  error: null,
};

const associationSlice = createSlice({
  name: 'association',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssociationInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssociationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchAssociationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch association info';
      });
  },
});

export default associationSlice.reducer;
```

#### 3.3 Create Contact Service
```typescript
// src/services/contactService.ts
import { Linking, Platform } from 'react-native';

export const makePhoneCall = (phoneNumber: string) => {
  const url = Platform.OS === 'ios' 
    ? `telprompt:${phoneNumber}` 
    : `tel:${phoneNumber}`;
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error('Phone calls are not supported');
      }
    })
    .catch((err) => console.error('Error making phone call:', err));
};

export const sendEmail = (emailAddress: string) => {
  const url = `mailto:${emailAddress}`;
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error('Email is not supported');
      }
    })
    .catch((err) => console.error('Error opening email:', err));
};

export const openMap = (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  const url = Platform.OS === 'ios'
    ? `maps://maps.apple.com/?q=${encodedAddress}`
    : `geo:0,0?q=${encodedAddress}`;
  
  Linking.openURL(url).catch((err) => {
    // Fallback to web maps
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(webUrl).catch(console.error);
  });
};
```

#### 3.4 Create Components

**AssociationInfoCard Component:**
```typescript
// src/components/AssociationInfoCard/AssociationInfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ContactButton from '../ContactButton/ContactButton';
import WorkingHoursDisplay from '../WorkingHoursDisplay/WorkingHoursDisplay';
import { makePhoneCall, sendEmail } from '../../services/contactService';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const AssociationInfoCard = () => {
  const { t } = useTranslation();
  const associationInfo = useSelector((state: RootState) => state.association.info);

  if (!associationInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Association Name */}
      <Text style={styles.associationName}>{associationInfo.name}</Text>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('association.address')}</Text>
        <Text style={styles.value}>{associationInfo.address}</Text>
      </View>

      {/* Phone */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('association.phone')}</Text>
        <ContactButton
          text={associationInfo.phone}
          onPress={() => makePhoneCall(associationInfo.phone)}
          icon="phone"
        />
      </View>

      {/* Email */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('association.email')}</Text>
        <ContactButton
          text={associationInfo.email}
          onPress={() => sendEmail(associationInfo.email)}
          icon="email"
        />
      </View>

      {/* Working Hours */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('association.workingHours')}</Text>
        <WorkingHoursDisplay hours={associationInfo.workingHours} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    backgroundColor: colors.background,
  },
  associationName: {
    fontSize: moderateScale(28), // Large for elderly users
    fontFamily: Fonts.bold,
    color: colors.textPrimary,
    marginBottom: moderateScale(24),
    textAlign: 'center',
  },
  section: {
    marginBottom: moderateScale(24),
  },
  label: {
    fontSize: moderateScale(18), // Large labels
    fontFamily: Fonts.semiBold,
    color: colors.textSecondary,
    marginBottom: moderateScale(8),
  },
  value: {
    fontSize: moderateScale(16), // Readable text
    fontFamily: Fonts.regular,
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
  },
});

export default AssociationInfoCard;
```

### Step 4: Settings Screen (Day 8-9)

#### 4.1 Create Language Selector
```typescript
// src/components/LanguageSelector/LanguageSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/languageSlice';
import i18n from '../../config/i18n';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'hi', name: 'हिंदी' },
];

const LanguageSelector = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleLanguageChange = (langCode: 'en' | 'gu' | 'hi') => {
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
          onPress={() => handleLanguageChange(lang.code as 'en' | 'gu' | 'hi')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === lang.code && styles.selectedText,
            ]}
          >
            {lang.name}
          </Text>
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
    fontSize: moderateScale(20),
    fontFamily: Fonts.bold,
    color: colors.textPrimary,
    marginBottom: moderateScale(16),
  },
  languageButton: {
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    backgroundColor: colors.background,
    borderRadius: moderateScale(8),
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: moderateScale(56), // Large touch target
  },
  selectedButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  languageText: {
    fontSize: moderateScale(18), // Large text
    fontFamily: Fonts.regular,
    color: colors.textPrimary,
  },
  selectedText: {
    fontFamily: Fonts.bold,
    color: colors.primary,
  },
});

export default LanguageSelector;
```

### Step 5: Update Navigation (Day 10)

#### 5.1 Update menuConfig.json
```json
[
  {
    "id": "Home",
    "name": "Dashboard",
    "moduleKey": null,
    "screen": "../modules/main/Home/Home.screen",
    "type": "bottomTab",
    "permissionKey": null
  },
  {
    "id": "Settings",
    "name": "Settings",
    "moduleKey": null,
    "screen": "../modules/main/Settings/SettingsScreen",
    "type": "bottomTab",
    "permissionKey": null
  }
]
```

#### 5.2 Update Home Screen
```typescript
// src/modules/main/Home/Home.screen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAssociationInfo } from '../../../store/slices/associationSlice';
import AssociationInfoCard from '../../../components/AssociationInfoCard/AssociationInfoCard';
import AppLoader from '../../../components/AppLoader';
import CustomHeader from '../../../components/CustomHeader/Header';
import { colors } from '../../../utils/theme';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { info, loading } = useSelector((state: RootState) => state.association);

  useEffect(() => {
    dispatch(fetchAssociationInfo() as any);
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchAssociationInfo() as any);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Association Information" showBackButton={false} />
      {loading && !info ? (
        <AppLoader />
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          <AssociationInfoCard />
        </ScrollView>
      )}
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
});

export default HomeScreen;
```

---

## 🎨 UI/UX Guidelines for Elderly Users

### Design Principles

1. **Large Touch Targets**
   - Minimum: 44x44 points (iOS) / 48x48 dp (Android)
   - Preferred: 56x56 points/dp
   - Generous spacing between buttons

2. **Typography**
   - Body text: Minimum 16pt, preferred 18-20pt
   - Headings: 24-28pt
   - High contrast (WCAG AA minimum)
   - Clear, sans-serif fonts

3. **Colors**
   - High contrast ratios (4.5:1 minimum)
   - Avoid color-only information
   - Use icons + text

4. **Navigation**
   - Simple, flat navigation
   - Clear labels
   - Consistent placement
   - Breadcrumbs if needed

5. **Interactions**
   - Large, obvious buttons
   - Clear feedback on actions
   - Confirmation for destructive actions
   - Error messages in plain language

---

## 📊 Development Timeline

| Phase | Tasks | Duration | Status |
|-------|-------|----------|--------|
| **Phase 1: Setup** | Dependencies, i18n, Theme | 2 days | ⏳ |
| **Phase 2: Language** | Translation files, Language selector | 2 days | ⏳ |
| **Phase 3: Association Info** | Service, Components, Redux | 3 days | ⏳ |
| **Phase 4: Settings** | Settings screen, Language selector | 2 days | ⏳ |
| **Phase 5: Integration** | Navigation, Testing, Polish | 2 days | ⏳ |
| **Total** | | **11 days** | |

---

## ✅ Checklist

### Setup
- [ ] Install i18next and react-i18next
- [ ] Configure i18n
- [ ] Create translation files (en, gu, hi)
- [ ] Update theme for elderly-friendly design
- [ ] Update app name and bundle IDs

### Language Support
- [ ] Create languageSlice
- [ ] Create LanguageSelector component
- [ ] Add language persistence
- [ ] Test language switching

### Association Information
- [ ] Create associationService
- [ ] Create associationSlice
- [ ] Create contactService (phone/email)
- [ ] Create AssociationInfoCard component
- [ ] Create ContactButton component
- [ ] Create WorkingHoursDisplay component
- [ ] Update Home screen

### Settings
- [ ] Create Settings screen
- [ ] Integrate LanguageSelector
- [ ] Add to navigation

### Testing
- [ ] Test on Android
- [ ] Test on iOS
- [ ] Test language switching
- [ ] Test phone/email functionality
- [ ] Test with large font sizes
- [ ] Accessibility testing

---

## 🔄 Future Enhancements (Phase 2+)

- [ ] Map integration for address
- [ ] Push notifications
- [ ] Offline support
- [ ] Font size selector
- [ ] Dark mode
- [ ] About/Help screen
- [ ] Contact form
- [ ] News/Announcements section
- [ ] Events calendar

---

## 📝 Notes

- Keep the app simple and focused
- Prioritize ease of use over features
- Test with actual elderly users if possible
- Ensure all text is translatable
- Maintain consistent design patterns
- Follow accessibility guidelines (WCAG)

---

**Ready to start development! 🚀**
