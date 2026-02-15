// Core UI Components
import { Button as AppButton } from './AppButton/Button';
import AppImage from './AppImage/AppImage';
import { Input as AppInput } from './AppInput/Input';
import { Checkbox as AppCheckbox } from './AppCheckbox/Checkbox';
import AppScrollView from './AppScrollView/AppScrollView';
import AppContainer from './AppContainer/AppContainer';
import { AppOTPInput } from './AppOTPInput/AppOTPInput';
import { AppText } from './AppText/AppText';
import AppModal from './AppModal/AppModal';
import { AppLoader } from './AppLoader';

// Layout Components
import AppListViewCard from './AppListViewCard/AppListViewCard';

// Utility Components
import { sharePin } from './SharePin/SharePin';
import { EmptyState } from './EmptyState/EmptyState';
import NotAuthorized from './NotAuthorized/NotAuthorized';
import PermissionGate from './PermissionGate';

// Navigation Components
import CustomHeader from './CustomHeader/Header';
import LanguageSelector from './LanguageSelector/LanguageSelector';

// Error Handling
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

// Export all generic components
export {
  // Core UI
  AppText,
  AppButton,
  AppImage,
  AppInput,
  AppCheckbox,
  AppScrollView,
  AppContainer,
  AppOTPInput,
  AppModal,
  AppLoader,
  // Layout
  AppListViewCard,
  // Utility
  sharePin,
  EmptyState,
  NotAuthorized,
  PermissionGate,
  // Navigation
  CustomHeader,
  LanguageSelector,
  // Error Handling
  ErrorBoundary,
};
