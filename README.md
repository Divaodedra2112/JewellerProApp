# React Native Boilerplate 🚀

A **production-ready, professional React Native boilerplate** with TypeScript, Redux Toolkit, React Navigation, i18n, and best practices built-in. Start building your next mobile app in minutes!

## ✨ Features

- ⚛️ **React Native 0.79** with TypeScript (strict mode)
- 🎨 **UI Kitten** - Beautiful UI component library
- 🧭 **React Navigation** - Stack, Tab, and Drawer navigation
- 🗄️ **Redux Toolkit** - State management with persistence
- 🌍 **i18next** - Internationalization (English, Hindi, Gujarati)
- 🎯 **TypeScript** - Full type safety with strict mode
- 🔐 **Authentication Flow** - Login, OTP verification
- 🛡️ **RBAC** - Role-based access control
- 📱 **Permissions** - Camera, Photo Library, Notifications
- 🎨 **Theming** - Customizable theme system
- 📦 **Code Organization** - Feature-based architecture
- 🧪 **Testing** - Jest configured
- 🎨 **Code Quality** - ESLint + Prettier
- 📱 **Cross-platform** - iOS & Android

## 📋 Prerequisites

- Node.js >= 18
- React Native development environment set up ([See official guide](https://reactnative.dev/docs/environment-setup))
- iOS: Xcode 14+ and CocoaPods
- Android: Android Studio with Android SDK

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd JewellerProApp

# Install dependencies
yarn install

# iOS: Install CocoaPods
cd ios && pod install && cd ..
```

### 2. Environment Setup

Update `src/config/envConfig.ts` with your API URLs:

```typescript
export const API_BASE_URL = __DEV__
  ? 'https://your-dev-api.com'
  : 'https://your-prod-api.com';
```

### 3. Run the App

```bash
# Start Metro bundler
yarn start

# Run on iOS (in a new terminal)
yarn ios

# Run on Android (in a new terminal)
yarn android
```

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, icons
├── components/       # Reusable UI components (20+ generic components)
├── config/          # App configuration (i18n, constants, env)
├── hooks/           # Custom React hooks
├── locales/         # Translation files (en, hi, gu)
├── modules/         # Feature modules
│   ├── auth/        # Authentication flow
│   ├── main/        # Main app screens (Home, Settings)
│   └── notification/# Notification screens
├── navigation/      # Navigation configuration
├── rbac/           # Role-based access control
├── services/       # API services
├── store/          # Redux store & slices
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🛠️ Available Scripts

```bash
# Development
yarn start              # Start Metro bundler
yarn start:reset        # Start Metro with cache reset
yarn ios                # Run iOS app
yarn android            # Run Android app

# Code Quality
yarn lint               # Run ESLint
yarn format             # Format code with Prettier
yarn format:check       # Check code formatting

# Testing
yarn test               # Run Jest tests

# Build
yarn build              # Build Android release APK

# Utilities
yarn link:fonts         # Link custom fonts
yarn increment-version   # Increment app version
```

## 🏗️ Architecture

### Feature-Based Structure

Each feature module follows this structure:

```
modules/
└── feature-name/
    ├── FeatureScreen.tsx    # Main screen component
    ├── FeatureService.ts    # API calls
    ├── FeatureTypes.ts      # TypeScript types
    ├── FeatureSlice.ts      # Redux slice (if needed)
    └── styles.ts            # Component styles
```

### State Management

- **Redux Toolkit** for global state
- **Redux Persist** for state persistence
- Feature-based slices in `src/store/slices/`

### Navigation

- **Stack Navigator** for auth flow
- **Bottom Tab Navigator** for main app
- **Drawer Navigator** for side menu
- Dynamic menu generation based on RBAC

### API Services

- Centralized API service in `src/services/api.ts`
- Feature-specific services in `src/services/`
- Axios for HTTP requests
- Automatic token injection

## 🔐 Authentication

The boilerplate includes a complete authentication flow:

1. **Login Screen** - Phone number input
2. **OTP Verification** - OTP input and verification
3. **Token Management** - Automatic token storage and refresh
4. **Protected Routes** - Navigation guards

## 🌍 Internationalization

Supports multiple languages:
- English (en)
- Hindi (hi)
- Gujarati (gu)

Add translations in `src/locales/` and use with:

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Text>{t('welcome')}</Text>
```

## 🎨 Theming

Customize your app theme in `src/utils/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    // ... your colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    // ... your spacing
  },
};
```

## 🛡️ RBAC (Role-Based Access Control)

- Permission-based navigation
- Dynamic menu generation
- Component-level permission gates
- Service-level permission checks

## 📱 Permissions

Handled via `react-native-permissions`:
- Camera
- Photo Library
- Notifications
- And more...

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

## 📦 Building for Production

### Android

```bash
# Generate release APK
yarn build

# Or manually
cd android
./gradlew assembleRelease
```

### iOS

1. Open `ios/ReactNativeBoilerplate.xcworkspace` in Xcode
2. Select your target device/simulator
3. Product → Archive
4. Distribute App

## 🔧 Configuration

### App Configuration

- **Bundle ID**: Update in `ios/` and `android/app/build.gradle`
- **App Name**: Update in `app.json` and native configs
- **Version**: Update in `package.json` and native configs

## 📚 Best Practices

1. **Component Structure**: Keep components small and focused
2. **Type Safety**: Use TypeScript for all new code
3. **Code Organization**: Follow feature-based structure
4. **State Management**: Use Redux for global state, local state for UI
5. **API Calls**: Centralize in service files
6. **Error Handling**: Use try-catch and error boundaries
7. **Performance**: Use React.memo, useMemo, useCallback appropriately
8. **Testing**: Write tests for critical business logic

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
yarn start:reset
```

### iOS Build Issues

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
```

### Clear All Caches

```bash
# Clear Metro cache
yarn start:reset

# Clear watchman
watchman watch-del-all

# Clear node modules
rm -rf node_modules
yarn install
```

## 📖 Documentation

- [Quick Start Guide](./QUICK_START.md) - Get started in 5 minutes
- [Project Structure](./PROJECT_STRUCTURE.md) - Architecture guide
- [Contributing](./CONTRIBUTING.md) - Development guidelines
- [Cleanup Summary](./CLEANUP_SUMMARY.md) - What was cleaned up

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Native Community
- All the amazing open-source contributors

---

## ✅ Boilerplate Status

**100% Clean & Professional**

- ✅ Zero business-specific code
- ✅ All generic components
- ✅ Clean architecture
- ✅ Production-ready
- ✅ Latest React Native (0.79.1)
- ✅ TypeScript strict mode
- ✅ Best practices implemented

**Perfect for starting any React Native project!** 🚀

---

**Happy Coding! 🎉**
