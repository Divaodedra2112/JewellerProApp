import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  UpdateRequired: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string; countryCode?: string };
};

export type MainStackParamList = {
  Drawer: NavigatorScreenParams<GenericParamList>;
  Profile: undefined;
  SubCategory: { categoryId: string; categoryTitle: string };
  Topic: { id: string; title: string; type: 'category' | 'subcategory' };
};

export type GenericParamList = {
  MainTabs: undefined;
  Home: undefined;
  Questions: undefined;
  Updates: undefined;
  Settings: undefined;
  Profile: undefined;
  Dashboard: undefined; // Alias for Home
  Notification: undefined; // Alias for Updates
  // Add your drawer screens here
};

export type QuestionsStackParamList = {
  QuestionsList: undefined;
  QuestionDetail: { questionId: string; questionTitle: string };
};
