import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import navigationReducer from '../slices/navigationSlice';
import notificationReducer from '../slices/notificationSlice';
import homeReducer from '../slices/homeSlice';
import forceUpdateReducer from '../slices/forceUpdateSlice';
import languageReducer from '../slices/languageSlice';
import subCategoryReducer from '../slices/subCategorySlice';
import topicReducer from '../slices/topicSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  notifications: notificationReducer,
  home: homeReducer,
  forceUpdate: forceUpdateReducer,
  language: languageReducer,
  subCategory: subCategoryReducer,
  topic: topicReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
