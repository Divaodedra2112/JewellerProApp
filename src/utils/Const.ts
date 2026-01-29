import { colors } from './theme';

/**
 * App Constants
 * TODO: Customize these constants for your app
 */
export const Const = {
  KEYS: {
    userDetails: '@userDetails',
  },
  TOKEN: '',
  HIT_SLOP: { top: 10, right: 10, bottom: 10, left: 10 },
  METHOD_GET: 'get',
  METHOD_POST: 'post',
  EMAIL_REG_EXP: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
  PAN_NUMBER_REG_EXP: /([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
  PHONE_NUMBER_REG_EXP: /^[0-9]{10}$/,
  PRIORITY_LIST: [
    { id: 'low', name: 'low' },
    { id: 'medium', name: 'medium' },
    { id: 'high', name: 'high' },
  ],
  STATUS_LIST: [
    { id: 'pending', name: 'pending' },
    { id: 'in_progress', name: 'in progress' },
    { id: 'completed', name: 'completed' },
  ],
};

export const INPUT_TYPE = {
  TEXT: 0,
  PHONE: 1,
  DROPDOWN: 2,
  DATE_PICKER: 3,
};

export const DATE_FORMAT = 'YYYY-MM-DD';

// Navigation constants
export const NAVI_CONST = {
  LIST_SCREEN: 'listScreen',
  DETAILS_SCREEN: 'detailsScreen',
};

// Image picker options
export const CAMERA_PICKER_OPTIONS = {
  width: 600,
  height: 600,
  cropping: true,
  cropperCircleOverlay: true,
  compressImageQuality: 0.7,
  includeExif: true,
  mediaType: 'photo' as const,
  cropperToolbarTitle: 'Crop your image',
  cropperStatusBarColor: colors.black,
  cropperActiveWidgetColor: colors.black,
  cropperToolbarWidgetColor: colors.white,
};

export const IMAGE_PICKER_OPTIONS = {
  width: 600,
  height: 600,
  cropping: true,
  cropperCircleOverlay: true,
  compressImageQuality: 0.7,
  mediaType: 'photo' as const,
};

export const MULTIPLE_IMAGE_PICKER_OPTIONS = {
  width: 600,
  height: 600,
  cropping: false,
  compressImageQuality: 0.7,
  mediaType: 'photo' as const,
  multiple: true,
  maxFiles: 3,
};

// Permission messages
export const CAMERA_PERMISSION = {
  TITLE: 'Camera Permission',
  MESSAGE: 'We need permission to use your camera to take a profile picture.',
  BUTTON_POSITIVE: 'OK',
};

export const CAMERA_PERMISSION_DENIED = {
  TITLE: 'Permission Denied',
  MESSAGE: 'Camera permission is required to take a photo.',
};

export const CAMERA_ERROR = {
  TITLE: 'Error',
  MESSAGE: 'Failed to open camera. Please try again.',
};

export const IMAGE_SOURCE_ALERT = {
  TITLE: 'Select Image Source',
  MESSAGE: 'Choose where to get your image from:',
  BUTTONS: {
    CANCEL: 'Cancel',
    CAMERA: 'Camera',
    GALLERY: 'Gallery',
  },
};

// Status constants
export const ALL_STATUS = { id: 0, name: 'All' };

// Show more/less text
export const SHOW_DESCRIPTION = {
  SHOW_LESS: 'Show less',
  SHOW_MORE: 'Show more',
};

// Link/Unlink status constants
export const LINKED = 'link' as const;
export const UNLINKED = 'unlink' as const;
export type LinkStatus = typeof LINKED | typeof UNLINKED;

// Upload folders (customize for your app)
export enum R2UploadFolder {
  GENERAL = 'general',
  CHAT = 'chat',
  STAFF = 'staff',
  COMPANY = 'company',
  COMMENT = 'comment',
}

// TODO: Add your app-specific constants below
