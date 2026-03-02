# 🔐 Auth Module

This module handles all **authentication-related** functionality in a fully self-contained manner.

## 📁 Structure

- **login/**  
  Handles user login functionality. Includes:
  - `Login.tsx`: Login screen component.
  - `LoginStyle.ts`: Style definitions for the login UI.
  - `authApi.ts`: Auth API (send OTP, verify OTP, logout, refresh token).
  - `loginActions.ts`: Any business logic or state handling related to login.
- **router/**  
  Manages all routes specific to authentication (e.g., login, register, forgot password).

## 🔄 Purpose

Each feature under `auth/` is designed to be modular and self-contained. You can easily add new authentication features like:

- Register
- Forgot Password
- Two-Factor Auth

Without interfering with the rest of the app.

## 🧩 Best Practices

- Keep each subfolder isolated and complete with all necessary files.
- Do not share auth files with unrelated modules.
