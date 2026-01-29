# React Native Application Structure

This is a React Native application with a modular architecture.

## Directory Structure

```
src/
├── config/                # App-level configuration
├── main/                  # Main app features
│   ├── router/            # Routing for main module
│   └── README.md          # Description of what 'main' contains
├── auth/                  # Authentication-related features
│   ├── login/             # Login feature
│   │   ├── Login.tsx
│   │   ├── LoginStyle.ts
│   │   ├── loginService.ts
│   │   ├── loginActions.ts
│   │   └── (any other necessary files for login)
│   ├── router/            # Routing for auth module
│   └── README.md          # Description of what 'auth' contains
├── router/                # Root-level routing
├── service/               # Shared services
├── store/                 # Redux store
└── README.md              # This file
```

## Features

# 📁 src Directory

This is the root of the source code for the application. It follows a modular architecture for better scalability, maintainability, and readability.

## 📦 Folder Structure

- **config/**  
  Contains application-wide configuration files such as API endpoints, themes, constants, and environment setups.

- **main/**  
  Contains the core features or main functionality of the app not related to authentication. Each feature is organized as a module with its own routing, logic, and UI.

- **auth/**  
  Manages all authentication-related modules such as login, registration, password reset, etc. Each sub-feature is self-contained with views, styles, services, and actions.

- **router/**  
  Central routing logic that ties together routes from `main` and `auth` modules.

- **service/**  
  Contains reusable services like network requests, helpers, interceptors, and external integrations (e.g., analytics).

- **store/**  
  Handles global state management using tools like Redux, Zustand, or Context API.

## 🔄 Philosophy

- **Feature-Based**: Each module (e.g., `login`) contains everything it needs: components, styles, services, actions.
- **Scalable**: Easily extendable with new modules and features.
- **Isolated Routing**: Each module handles its own routing configuration.
