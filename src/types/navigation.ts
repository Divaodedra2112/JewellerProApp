import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  UpdateRequired: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
};

export type MainStackParamList = {
  Drawer: NavigatorScreenParams<GenericParamList>;
  // Add your custom screens here
};

export type GenericParamList = {
  MainTabs: undefined;
  Home: undefined;
  Chatbot: undefined;
  Updates: undefined;
  Settings: undefined;
  Dashboard: undefined; // Alias for Home
  Notification: undefined; // Alias for Updates
  // Add your drawer screens here
};
