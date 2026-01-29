import { colors } from './theme';

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

export const OTHER_CONCERN_LABEL = 'Other';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const NAVI_CONST = {
  LIST_SCREEN: 'listScreen',
  SMALL_LIST_SCREEN: 'smallListScreen',
  DETAILS_SCREEN: 'detailsScreen',
  SMALL_DETAILS_SCREEN: 'smallDetailsScreen',
  CUSTOMER_LIST_SCREEN: 'customerListScreen',
  COMPETITOR_ANALYSIS_LIST_SCREEN: 'competitorAnalysisListScreen',
  DAILY_VISIT_LIST_SCREEN: 'dailyVisitListScreen',
};

export const DEMO_IMAGES =
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export const TASK_TYPE_CONCERN = 1;
export const TASK_TYPE_SAMPLE_REQUEST = 2;
export const DEFAULT_STATUS = 1;
export const DEFAULT_PRIORITY = 1;
export const NOT_STARTED_STATUS_NAME = 'Not Started';
export const NOT_PRIORITY__NAME = 'Low';
export const CREATED_STATUS_NAME = 'Created';
export const ACCEPTED_STATUS_NAME = 'Accepted';

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
  cropping: false, // Cropping doesn't work with multiple selection
  compressImageQuality: 0.7,
  mediaType: 'photo' as const,
  multiple: true,
  maxFiles: 3, // Limit to 3 images max
};

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

// Statistics codes for profile screens
export const STATISTICS_CODES = {
  TOTAL_CONCERNS: 'total-concerns',
  COMPLETE_CONCERN: 'done',
  NOT_STARTED: ['not-started', 'accepted', 'in-progress', 'in-review'],
  DISCARD: 'discarded',
  BRANCHES: 'branches',
};

// Technician constant
export const IS_TECHNICIAN = true;

// Status constant for 'All' option in filters
export const ALL_STATUS = { id: 0, name: 'All' };

// Export default values
export const DEFAULT_TIME = '00:30';
export const DEFAULT_ZERO_TIME = '00:00';

// Technician constant
export const CONCERN_TYPE_CONCERN = 1;
export const CONCERN_TYPE_SAMPLE_REQUEST = 2;
export const DEFAULT_CONCERN_STATUS = 12;
export const DEFAULT_CONCERN_PRIORITY = 11;

// Pre defined role types
export const ROLE_TYPE = {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
  CUSTOMER: 'CUSTOMER',
  HOD: 'HOD',
  SALESPERSON: 'SALESPERSON',
  // PRIMARY_TECHNICIAN: 'Primary Technician',
  // SECONDARY_TECHNICIAN: 'Secondary Technician',
};

export const SHOW_DESCRIPTION = {
  SHOW_LESS: 'Show less',
  SHOW_MORE: 'Show more',
};

// Link/Unlink status constants (used across the app)
export const LINKED = 'link' as const;
export const UNLINKED = 'unlink' as const;
export type LinkStatus = typeof LINKED | typeof UNLINKED;

// Navigation from
export const NAVIGATION_FROM = {
  ADD_SAMPLE_REQUEST_SCREEN: 'AddSampleRequestScreen',
  ADD_CUSTOMER_SCREEN: 'AddCustomerScreen',
  ADD_PRODUCT_SCREEN: 'AddProductScreen',
  ADD_DAILY_VISIT_SCREEN: 'AddDailyVisitScreen',
  ADD_COMPETITOR_ANALYSIS_SCREEN: 'AddCompetitorAnalysisScreen',
  ADD_MASTER_BAG_CAP_SCREEN: 'AddMasterBagCapScreen',
};

// Navigation from
export const UNIT_ID = {
  KG: 1,
  TON: 2,
};

export const STRIP_TEST_OPTIONS = {
  Follow: 'FOLLOW',
  Yes_Rarely: 'RARELY',
  Not_Follow: 'NOT_FOLLOW',
};

export const MASTER_BAG_CAP_OPTIONS = {
  Yes: 'YES',
  No: 'NO',
};

export const PURPOSE_OF_VISIT_OPTIONS = {
  Concern: 'CONCERN',
  Sample_Request: 'SAMPLE_REQUEST',
  Competitor_Analysis: 'COMPETITOR_ANALYSIS',
  Courtesy: 'COURTESY',
  Follow_Up: 'FOLLOW_UP',
  Other: 'OTHER',
};

export const STATUS_OPTIONS = {
  Pending: 'PENDING',
  Done: 'DONE',
};

export const PRODUCT_TYPE_OPTIONS = {
  Internal: 'INTERNAL',
  External: 'EXTERNAL',
};

export const COMPANY_TYPE_OPTIONS = {
  Internal: 'INTERNAL',
  External: 'EXTERNAL',
};

export enum R2UploadFolder {
  GENERAL = 'general',
  CHAT = 'chat',
  STAFF = 'staff',
  COMPANY = 'company',
  COMMENT = 'comment',
  MASTER_BAG = 'masterbag',
  SAMPLE_REQUEST = 'sample-request',
  CONCERN = 'concern',
  DAILY_REPORT = 'daily-report',
  COMPETITOR_ANALYSIS = 'competitor-analysis',
}

export enum TASK_TYPE {
  CONCERN = 'concern',
  SAMPLE_REQUEST = 'sample-request',
}
export enum TASK_TYPE_LIST {
  LIST = 'list',
  KANBAN = 'kanban',
}

export const SAMPLE_REQUEST_FROM = 'sampleRequest' as const;
export const CONCERN_FROM = 'concern' as const;
