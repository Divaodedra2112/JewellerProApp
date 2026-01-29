# 🚀 Main Module

This module contains the **primary features and screens** of the app that are accessible after authentication.

## 📁 Structure

- **router/**  
  Manages the routing for all main features.

## 🔄 Purpose

The `main` module is the core of your application logic, excluding auth. Examples of potential features in this folder:

- Dashboard
- Profile
- Settings
- Notifications
- Home

## 📦 Expansion

Add each feature as a subfolder within `main/`, structured similarly to the `login` module under `auth/`. Each subfeature should include:

- Component (`.tsx`)
- Styles
- Services
- Actions or hooks

## 📌 Guidelines

- Modular and scalable: keep features decoupled.
- Follow naming conventions.
- Define all screen-specific navigation inside `main/router`.
