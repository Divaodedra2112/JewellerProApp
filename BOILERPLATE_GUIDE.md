# React Native Boilerplate - Project Guide

## 📦 What's Currently in This Project

This is a **clean, modern React Native boilerplate** with the following structure:

### ✅ Core Features Included

#### 1. **Authentication Flow** (`src/modules/auth/`)
- ✅ Login Screen with phone number input
- ✅ OTP Verification Screen
- ✅ Token management with AsyncStorage
- ✅ Auth state management (Redux)

#### 2. **Navigation Structure** (`src/navigation/`)
- ✅ **Bottom Tab Navigation** - Custom tab bar with icons
- ✅ **Drawer Navigation** - Side menu navigation
- ✅ **Stack Navigation** - Screen stack management
- ✅ **Auth Navigator** - Handles login/authenticated flow
- ✅ **Root Navigator** - Main app navigation coordinator

#### 3. **Main Screens** (`src/modules/main/`)
- ✅ **Home Screen** - Dashboard/Welcome screen
- ✅ **Notification Screen** - Push notification handling

#### 4. **State Management** (`src/store/`)
- ✅ Redux Toolkit setup
- ✅ Redux Persist (data persistence)
- ✅ Slices:
  - `authSlice` - Authentication state
  - `navigationSlice` - Navigation state
  - `notificationSlice` - Notification state
  - `homeSlice` - Home screen state
  - `forceUpdateSlice` - App update management
  - `permissionSlice` - RBAC permissions

#### 5. **RBAC (Role-Based Access Control)** (`src/rbac/`)
- ✅ Permission-based navigation
- ✅ Permission gates for components
- ✅ Dynamic menu based on permissions

#### 6. **UI Components** (`src/components/`)
- ✅ 80+ reusable components including:
  - Buttons, Inputs, Cards, Lists
  - Modals, Loaders, Headers
  - Image uploaders, Date pickers
  - Custom tab bar, Drawer menu

#### 7. **Services** (`src/services/`)
- ✅ API service with axios
- ✅ Common services and actions
- ✅ RBAC service
- ✅ Permission middleware
- ✅ Initialization service

#### 8. **Utilities** (`src/utils/`)
- ✅ Theme system (colors, fonts)
- ✅ Responsive scaling
- ✅ Common functions
- ✅ Toast notifications
- ✅ Image utilities

#### 9. **Utility Screens** (`src/modules/UtilityScreens/`)
- ✅ Offline Screen
- ✅ Error Screen (Oops)
- ✅ No Results Found
- ✅ Force Update Screen
- ✅ Success Screen

### 🗂️ Project Structure

```
src/
├── assets/          # Fonts, icons, images
├── components/      # Reusable UI components
├── config/          # App configuration
├── hooks/           # Custom React hooks
├── modules/         # Feature modules
│   ├── auth/       # Authentication
│   ├── main/       # Main app screens
│   └── notification/ # Notifications
├── navigation/      # Navigation setup
├── rbac/           # Role-based access control
├── screens/         # Standalone screens
├── services/       # API and business logic
├── store/          # Redux store
├── types/          # TypeScript types
└── utils/          # Utility functions
```

---

## 🚀 Next Steps for Your New Project

### Step 1: Update Project Identity

1. **Update `package.json`**:
   ```json
   {
     "name": "your-app-name",
     "version": "1.0.0"
   }
   ```

2. **Update `app.json`**:
   - Change app name
   - Update bundle identifier
   - Update package name

3. **Update iOS Bundle ID**:
   - Open `ios/jewellerpro.xcodeproj` in Xcode
   - Change bundle identifier from `com.jewellerpro.*` to `com.yourapp.*`

4. **Update Android Package Name**:
   - Update `android/app/build.gradle`:
     ```gradle
     applicationId "com.yourapp"
     ```

### Step 2: Configure API Endpoints

1. **Update `src/config/envConfig.ts`**:
   ```typescript
   export const API_BASE_URL = 'https://your-api.com/api';
   ```

2. **Update API service** (`src/services/api.ts`):
   - Configure base URL
   - Add authentication headers
   - Set up interceptors

### Step 3: Customize Theme

1. **Update `src/utils/theme.ts`**:
   - Change colors to match your brand
   - Update fonts
   - Customize spacing/sizing

### Step 4: Add Your First Feature Module

1. **Create a new module** in `src/modules/main/YourFeature/`:
   ```
   YourFeature/
   ├── YourFeatureScreen.tsx
   ├── YourFeatureService.ts
   ├── YourFeatureActions.ts
   ├── YourFeatureTypes.ts
   └── styles.ts
   ```

2. **Add to navigation**:
   - Update `src/config/menuConfig.json`
   - Add to `src/navigation/navigationConfig.tsx`
   - Register in `src/navigation/screenRegistry.ts`

3. **Create Redux slice** (if needed):
   - Create `src/store/slices/yourFeatureSlice.ts`
   - Add to `src/store/reducers/index.ts`

### Step 5: Update App Icons & Splash Screen

1. **Android**:
   - Replace icons in `android/app/src/main/res/mipmap-*/`
   - Update `android/app/src/main/res/values/strings.xml`

2. **iOS**:
   - Replace icons in `ios/jewellerpro/Images.xcassets/AppIcon.appiconset/`
   - Update launch screen

### Step 6: Remove Unused Components

1. Review `src/components/` and remove components you don't need
2. Clean up `src/CommonFilter/` if not using filters
3. Remove unused utilities from `src/utils/`

### Step 7: Configure Push Notifications

1. **Android**:
   - Set up FCM (Firebase Cloud Messaging) or your notification service
   - Update `android/app/google-services.json` (if using FCM)

2. **iOS**:
   - Configure APNs certificates
   - Update notification handlers in `ios/jewellerpro/AppDelegate.swift`

### Step 8: Set Up Environment Variables

1. Create `.env` files:
   ```
   .env.development
   .env.staging
   .env.production
   ```

2. Install `react-native-config` if needed:
   ```bash
   yarn add react-native-config
   ```

### Step 9: Update Home Screen

1. Customize `src/modules/main/Home/Home.screen.tsx`
2. Add your dashboard widgets
3. Connect to your API

### Step 10: Testing Setup

1. **Unit Tests**:
   - Add tests in `__tests__/`
   - Configure Jest in `jest.config.js`

2. **E2E Tests** (optional):
   - Set up Detox or Appium

---

## 📝 Quick Start Commands

```bash
# Install dependencies
yarn install

# Start Metro bundler (with cache reset if needed)
yarn start:reset

# Run on Android
yarn android

# Run on iOS
yarn ios

# Lint code
yarn lint

# Format code
yarn format
```

---

## 🔧 Important Files to Customize

| File | Purpose |
|------|---------|
| `src/config/envConfig.ts` | API endpoints, environment config |
| `src/utils/theme.ts` | Colors, fonts, theme |
| `src/config/menuConfig.json` | Bottom tab and drawer menu items |
| `src/navigation/navigationConfig.tsx` | Navigation structure |
| `App.tsx` | App initialization |
| `package.json` | Project metadata, dependencies |
| `app.json` | App configuration |

---

## 🎯 Recommended Development Flow

1. **Start with API Integration**:
   - Configure API endpoints
   - Test API calls
   - Set up authentication flow

2. **Build Core Features**:
   - Create your main feature modules
   - Add navigation routes
   - Implement Redux slices

3. **Polish UI**:
   - Customize theme
   - Update components
   - Add animations

4. **Add Advanced Features**:
   - Push notifications
   - Offline support
   - Error handling

---

## 📚 Key Technologies Used

- **React Native** 0.79.1
- **React Navigation** 7.x (Stack, Tabs, Drawer)
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **UI Kitten** - UI component library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **React Native Reanimated** - Animations

---

## ⚠️ Notes

- All Firebase code has been removed
- All "jewellerpro" specific code has been removed
- Chat functionality has been removed
- Only essential modules remain (Auth, Home, Notification)
- Build artifacts are properly ignored in `.gitignore`

---

## 🆘 Need Help?

- Check `src/README.md` for module-specific docs
- Review `src/rbac/README.md` for permission system
- Check React Native docs: https://reactnative.dev

---

**Happy Coding! 🚀**

