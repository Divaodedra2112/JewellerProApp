import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import navigationReducer from '../slices/navigationSlice';
import notificationReducer from '../slices/notificationSlice';
import homeReducer from '../slices/homeSlice';
import forceUpdateReducer from '../slices/forceUpdateSlice';
import languageReducer from '../slices/languageSlice';
import associationReducer from '../slices/associationSlice';
import { permissionReducer } from '../../rbac';

const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  notifications: notificationReducer,
  home: homeReducer,
  forceUpdate: forceUpdateReducer,
  permission: permissionReducer,
  language: languageReducer,
  association: associationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
