# Quick Start Guide 🚀

Get your React Native app up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js >= 18 installed
- ✅ React Native development environment set up
- ✅ iOS: Xcode 14+ and CocoaPods
- ✅ Android: Android Studio with Android SDK

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install Node dependencies
yarn install

# iOS: Install CocoaPods
cd ios && pod install && cd ..
```

### 2. Configure Environment

```bash
# Copy environment template (if .env.example exists)
# Edit .env with your API URLs and configuration
```

Update `src/config/envConfig.ts` with your API URLs:

```typescript
export const API_BASE_URL = __DEV__
  ? 'https://your-dev-api.com'
  : 'https://your-prod-api.com';
```

### 3. Update App Configuration

**iOS:**
- Open `ios/ReactNativeBoilerplate.xcworkspace` in Xcode
- Update Bundle Identifier in project settings
- Update app name in `Info.plist`

**Android:**
- Update `applicationId` in `android/app/build.gradle`
- Update app name in `android/app/src/main/res/values/strings.xml`

### 4. Run the App

```bash
# Start Metro bundler
yarn start

# In a new terminal, run iOS
yarn ios

# Or run Android
yarn android
```

## 🎯 Next Steps

### Customize Your App

1. **Update App Name**
   - `app.json`: Change `displayName`
   - Native configs: Update in Xcode/Android Studio

2. **Configure API**
   - Update `src/config/envConfig.ts` with your API URLs
   - Configure API service in `src/services/api.ts`

3. **Customize Theme**
   - Edit `src/utils/theme.ts` for colors, spacing, etc.

4. **Add Your First Feature**
   - Create a new module in `src/modules/your-feature/`
   - Add screen to navigation in `src/navigation/`

### Common Tasks

**Add a new screen:**
```typescript
// 1. Create screen
// src/modules/feature/FeatureScreen.tsx

// 2. Register in navigation
// src/navigation/screenRegistry.ts
```

**Add a new API endpoint:**
```typescript
// src/services/featureService.ts
export const getFeatureData = () => get('/feature');
```

**Add a new Redux slice:**
```typescript
// src/store/slices/featureSlice.ts
// Then add to store/reducers/index.ts
```

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
# Watchman
watchman watch-del-all

# Metro
yarn start:reset

# Node modules
rm -rf node_modules
yarn install
```

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Project Structure](./PROJECT_STRUCTURE.md) - Architecture guide
- [Contributing](./CONTRIBUTING.md) - Development guidelines

## ✅ Checklist

Before starting development:

- [ ] Dependencies installed
- [ ] Environment configured
- [ ] App name updated
- [ ] Bundle ID updated
- [ ] API URLs configured
- [ ] App runs successfully
- [ ] Theme customized (optional)

**You're all set! Happy coding! 🎉**

