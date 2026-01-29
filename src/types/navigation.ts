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
  // Add your drawer screens here
};
