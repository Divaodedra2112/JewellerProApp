# React Native Boilerplate Setup

This project has been converted from a JewellerPro-specific application to a clean React Native boilerplate.

## What Was Changed

### ✅ Completed Changes

1. **Package Configuration**
   - Updated `package.json` - Changed name from "jewellerpro" to "react-native-boilerplate"
   - Removed JewellerPro-specific build scripts
   - Updated `app.json` with generic app name

2. **Android Configuration**
   - Updated all `strings.xml` files in Android to use "React Native Boilerplate"
   - Updated app names for all build variants (local, dev, qa, prod)
   - Updated `build.gradle` - Changed bundle IDs from `com.jewellerpro.*` to `com.yourapp.*`
   - Updated `package.json` android script to use `devDebug` variant by default
   - Updated MainActivity component name to "ReactNativeBoilerplate"

3. **Source Code**
   - Removed all JewellerPro branding from:
     - Login screen
     - Home screen
     - Permission module messages
     - Force update service
     - Images configuration
     - Initial app loader

4. **Configuration Files**
   - Removed Firebase configuration (Firebase completely removed from project)
   - `envConfig.ts` - Replaced API URLs with placeholder TODO comments
   - Updated bundle ID mappings to generic placeholders

5. **Navigation**
   - Simplified `navigationConfig.tsx` - Removed all business-specific modules
   - Simplified `MainNavigator.tsx` - Removed all business-specific screens
   - Simplified `BottomTabNavigator.tsx` - Removed role-based business logic
   - Kept basic structure: Dashboard and Notification tabs

6. **Home Screen**
   - Simplified `Home.screen.tsx` to a basic boilerplate welcome screen

## What Still Needs Manual Configuration

### 🔧 iOS Configuration (Manual Steps Required)

The iOS project files still contain JewellerPro references. You'll need to:

1. **Rename iOS Project**
   - Rename `ios/jewellerpro/` folder to your app name
   - Update Xcode project references
   - Update `ios/jewellerpro.xcodeproj` to your app name
   - Update `ios/jewellerpro.xcworkspace` to your app name

2. **Update Bundle Identifiers**
   - Update all bundle IDs in Xcode from `com.jewellerpro.*` to your app's bundle ID
   - Update `Info.plist` files
   - Update `GoogleService-Info.plist` files (or replace with your Firebase config)

3. **Update AppDelegate.swift**
   - Line 49: Change module name from "jewellerpro" to your app name

4. **Update Firebase Configuration**
   - Replace all `GoogleService-Info.plist` files with your Firebase configuration
   - Update Firebase project references

### 🔧 Android Configuration (Manual Steps Required)

1. **Update Bundle IDs**
   - Update `android/app/build.gradle` - Change applicationId from `com.yourapp.*` to your actual bundle ID
   - Update all build variant configurations (local, dev, qa, prod)
   - Update namespace from `com.yourapp` to your package name

2. **Update Package Name (Optional but Recommended)**
   - Rename `android/app/src/main/java/com/jewellerpro/` to your package name (e.g., `com/yourapp/`)
   - Update package declarations in `MainActivity.kt` and `MainApplication.kt`
   - Update any other references to the old package name

3. **Firebase (Removed)**
   - Firebase has been completely removed from this boilerplate
   - If you need Firebase, you'll need to:
     - Add Firebase dependencies: `yarn add @react-native-firebase/app @react-native-firebase/messaging`
     - Add `google-services.json` to `android/app/`
     - Uncomment `apply plugin: 'com.google.gms.google-services'` in `android/app/build.gradle`
     - Create Firebase config file and initialize it in `App.tsx`

4. **Update Component Name**
   - The MainActivity component name is set to "ReactNativeBoilerplate"
   - Update `app.json` name field if you want a different component name
   - Ensure it matches what's registered in `index.js`

### 🔧 Configuration Files to Update

1. **Firebase Configuration**
   - `src/config/firebaseConfig.ts` - Add your Firebase credentials
   - Replace `android/app/google-services.json` with your Firebase config
   - Replace iOS `GoogleService-Info.plist` files with your Firebase config

2. **Environment Configuration**
   - `src/config/envConfig.ts` - Update API URLs for your backend
   - Update bundle ID mappings to match your app's bundle IDs

3. **App Name & Branding**
   - Update app display name in `app.json`
   - Update app name in Android `strings.xml` files
   - Update app name in iOS `Info.plist`

## Project Structure

The boilerplate maintains the following structure:

```
src/
├── assets/          # Images, fonts, icons
├── components/     # Reusable components
├── config/         # Configuration files
├── hooks/          # Custom React hooks
├── modules/
│   ├── auth/       # Authentication flow (Login, OTP)
│   ├── main/       # Main app screens
│   │   ├── Home/   # Dashboard/Home screen
│   │   └── Profile/ # Profile screen
│   └── notification/ # Notification screens
├── navigation/     # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   ├── MainNavigator.tsx
│   └── RootNavigator.tsx
├── rbac/           # Role-based access control
├── services/       # API services
├── store/          # Redux store configuration
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Features Included

✅ **Authentication Flow**
- Login screen with phone number input
- OTP verification screen
- Token management and persistence

✅ **Navigation Structure**
- Bottom tab navigation
- Drawer navigation
- Stack navigation
- Auth flow separation

✅ **State Management**
- Redux Toolkit setup
- Redux Persist for state persistence
- Auth slice for authentication state

✅ **RBAC (Role-Based Access Control)**
- Permission-based navigation
- Dynamic menu generation
- Permission gates

✅ **Utilities**
- Theme system
- Responsive utilities
- Toast notifications
- Network connectivity hooks

## Next Steps

1. Update iOS project files (rename, bundle IDs, Firebase config)
2. Update Android bundle IDs and Firebase config
3. Configure Firebase with your project credentials
4. Update API endpoints in `envConfig.ts`
5. Customize navigation in `navigationConfig.tsx`
6. Add your custom screens and modules
7. Update app branding (logos, colors, etc.)

## Notes

- All business-specific modules (Products, Tasks, Staff, etc.) have been removed
- The navigation structure is simplified but maintains the same architecture
- Auth flow is intact and ready to use
- Bottom tabs structure is preserved
- All JewellerPro-specific content has been removed from source code

