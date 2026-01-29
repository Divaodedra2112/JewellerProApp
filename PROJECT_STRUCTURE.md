# Project Structure Guide

This document explains the organization and architecture of the React Native boilerplate.

## 📁 Directory Structure

```
src/
├── assets/              # Static assets
│   ├── fonts/          # Custom fonts
│   ├── icons/          # App icons
│   └── images/         # Images and graphics
│
├── components/          # Reusable UI components
│   ├── AppButton/      # Button component
│   ├── AppInput/       # Input component
│   └── ...             # Other components
│
├── config/             # App configuration
│   ├── constants.ts    # App constants
│   ├── envConfig.ts    # Environment configuration
│   ├── i18n.ts         # Internationalization setup
│   └── navigationConfig.tsx  # Navigation config
│
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   ├── useTheme.ts
│   └── ...
│
├── locales/            # Translation files
│   ├── en.json         # English
│   ├── hi.json         # Hindi
│   └── gu.json         # Gujarati
│
├── modules/            # Feature modules (feature-based architecture)
│   ├── auth/           # Authentication module
│   │   ├── LoginScreen.tsx
│   │   ├── OTPScreen.tsx
│   │   ├── authService.ts
│   │   └── authSlice.ts
│   ├── main/           # Main app features
│   └── notification/   # Notification features
│
├── navigation/         # Navigation setup
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── screenRegistry.ts
│
├── rbac/               # Role-based access control
│   ├── configure.ts
│   ├── hooks.ts
│   └── PermissionGate.tsx
│
├── services/           # API services
│   ├── api.ts         # Axios instance & interceptors
│   └── ...            # Feature-specific services
│
├── store/             # Redux store
│   ├── index.ts       # Store configuration
│   ├── slices/        # Redux slices
│   └── reducers/      # Root reducer
│
├── types/             # TypeScript type definitions
│   └── ...
│
└── utils/             # Utility functions
    ├── theme.ts       # Theme configuration
    ├── constants.ts    # Utility constants
    └── ...
```

## 🏗️ Architecture Patterns

### Feature-Based Architecture

Each feature is self-contained in the `modules/` directory:

```
modules/
└── feature-name/
    ├── FeatureScreen.tsx      # Main screen component
    ├── FeatureService.ts      # API calls
    ├── FeatureTypes.ts         # TypeScript types
    ├── FeatureSlice.ts         # Redux slice (if needed)
    └── styles.ts               # Component styles
```

**Benefits:**
- Easy to locate feature code
- Scalable structure
- Clear separation of concerns
- Easy to remove/disable features

### Component Organization

Components are organized by functionality:

```
components/
├── AppButton/          # Button component
│   ├── AppButton.tsx  # Component file
│   └── types.ts       # TypeScript types
├── AppInput/           # Input component
└── index.ts            # Barrel export
```

**Best Practices:**
- One component per folder
- Co-locate related files (types, styles, tests)
- Use barrel exports (`index.ts`)

### Service Layer

API services are organized by feature:

```
services/
├── api.ts              # Axios instance & interceptors
├── authService.ts      # Authentication API calls
└── userService.ts      # User-related API calls
```

**Pattern:**
```typescript
// services/userService.ts
import { get, post } from './api';

export const getUser = (id: string) => get(`/users/${id}`);
export const updateUser = (id: string, data: User) => post(`/users/${id}`, data);
```

## 🔄 Data Flow

### Redux Flow

```
Component → Action → Reducer → Store → Component Update
```

### API Flow

```
Component → Service → API → Interceptor → Backend
                ↓
         Redux Slice → Store Update
```

## 📝 Code Organization Rules

### 1. File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`UserProfile`)

### 2. Import Order

```typescript
// 1. React & React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// 3. Internal imports (absolute paths)
import { AppButton } from '@components';
import { getUser } from '@services/userService';

// 4. Relative imports
import { styles } from './styles';
```

### 3. Component Structure

```typescript
// 1. Imports
import React from 'react';
import { View } from 'react-native';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ title }) => {
  // 4. Hooks
  const { t } = useTranslation();
  
  // 5. Handlers
  const handlePress = () => {};
  
  // 6. Render
  return <View>{title}</View>;
};
```

## 🎯 Best Practices

### 1. Keep Components Small

- Single responsibility
- Extract logic to hooks
- Use composition over inheritance

### 2. Type Safety

- Define types for all props
- Type API responses
- Avoid `any` type

### 3. Error Handling

```typescript
try {
  const data = await fetchData();
  // Handle success
} catch (error) {
  // Handle error
  console.error('Error:', error);
  showToast('Something went wrong');
}
```

### 4. Performance

- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for function props

### 5. State Management

- **Global State**: Redux (user, auth, app settings)
- **Local State**: useState (UI state, form state)
- **Server State**: Redux + API calls

## 🔍 Finding Code

### Where to put new code?

- **New Feature**: `src/modules/feature-name/`
- **Reusable Component**: `src/components/ComponentName/`
- **Utility Function**: `src/utils/`
- **API Service**: `src/services/serviceName.ts`
- **Type Definition**: `src/types/` or co-located
- **Redux Slice**: `src/store/slices/`

### Common Patterns

**Adding a new screen:**
1. Create screen in `modules/feature-name/FeatureScreen.tsx`
2. Add route in `navigation/screenRegistry.ts`
3. Add to navigation config if needed

**Adding a new API endpoint:**
1. Add method in `services/featureService.ts`
2. Use in component or Redux slice

**Adding a new Redux slice:**
1. Create `store/slices/featureSlice.ts`
2. Add to `store/reducers/index.ts`

## 📚 Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

