import Toast from 'react-native-toast-message';

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
} as const;

export const TOAST_MESSAGES = {
  // Auth related messages
  AUTH: {
    // Login related
    PHONE_NUMBER_REQUIRED: 'Please enter your phone number',
    PHONE_NUMBER_INVALID: 'Please enter a valid 10-digit phone number',
    TOO_MANY_ATTEMPTS: 'Too many attempts. Please try again later.',
    LOGOUT_SUCCESS: 'Logged out successfully',
    LOGOUT_SUCCESSFULLY: 'Logged out successfully',
    LOGOUT_FAILED: 'Failed to logout. Please try again.',
    INVALID_EMAIL: 'Please enter a valid email address',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAIL: 'Login failed. Please try again.',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
    INVALID_CREDENTIALS: 'Invalid mobile number or password. Please try again.',
    INVALID_MOBILE_NUMBER: 'Invalid mobile number. Please enter a valid 10-digit number.',
    INVALID_PASSWORD: 'Invalid password. Please try again.',
    PASSWORD_REQUIRED: 'Password is required',
    COUNTRY_CODE_REQUIRED: 'Country code is required',
    MOBILE_NUMBER_REQUIRED: 'Mobile number is required',
    USER_NOT_FOUND: 'User not found. Please check your mobile number.',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
    ACCOUNT_SUSPENDED: 'Your account has been suspended. Please contact support.',
    NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    VERIFY_SUCCESSFULLY: 'Verification successful',
    USER_VERIFY_SUCCESSFULLY: 'User verified successfully',
    EMAIL_ALREADY_VERIFIED: 'Email already verified',
    AUTH_EMAIL_ALREADY_EXIST: 'Email already exists',
    AUTH_EMAIL_VERIFICATION_ISSUE: 'Email verification issue',
    AUTH_EMAIL_VERIFICATION: 'Please verify your email address before logging in.',
    USER_ROLES_NOT_FOUND: 'User roles not found',
    INVALID_COUNTRY_CODE: 'Invalid country code',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',

    // PIN related
    PIN_VERIFY_SUCCESSFULLY: 'PIN verified successfully',
    PIN_NOT_SET: 'PIN not set',
    PIN_THROTTLED: 'Too many failed attempts',
    PIN_THROTTLED_SUBTITLE: 'Please wait 1min before trying again.',
    PIN_INVALID: 'Invalid PIN. Please try again',
    PIN_MUST_BE_STRING: 'PIN must be a string',
    PIN_IS_REQUIRED: 'PIN is required',
    PIN_EMPTY_NOT_ALLOWED: 'PIN cannot be empty',

    // PIN related (user-facing messages use PIN, but API keys remain as otp)
    OTP_REQUIRED: 'Please enter a valid PIN',
    OTP_IS_REQUIRED: 'PIN is required',
    OTP_EMPTY_NOT_ALLOWED: 'PIN cannot be empty',
    OTP_MUST_BE_STRING: 'PIN must be a string',
    OTP_INVALID: 'Invalid PIN. Please try again',
    INVALID_OTP: 'Invalid PIN. Please try again',
    INCORRECT_OTP: 'Incorrect PIN. Please try again',
    OTP_VERIFIED: 'PIN verified successfully',
    OTP_VERIFIED_SUCCESSFULLY: 'PIN verified successfully',
    OTP_SENT_SUCCESS: 'PIN sent successfully',
    OTP_SENT_SUCCESSFULLY: 'PIN sent successfully',
    OTP_RESEND_SUCCESS: 'PIN resent successfully',
    OTP_RESEND_SUCCESSFULLY: 'PIN resent successfully',
    OTP_RESEND_FAILED: 'Failed to resend PIN. Please try again.',
    OTP_VERIFICATION_FAILED: 'PIN verification failed. Please try again.',
    OTP_EXPIRED: 'PIN has expired. Please request a new one.',
    OTP_TOKEN_REQUIRED: 'PIN token is required',
    INVALID_OTP_TOKEN: 'Invalid PIN token',
    PHONE_NUMBER_DOES_NOT_EXIST: 'Phone number does not exist. Please try again.',
    MOBILE_NOT_REGISTERED: 'Mobile number not registered',
    MOBILE_NOT_FOUND: 'Mobile number not found',
    WAIT_OTP_ONE_MIN: 'Wait 1 minute before requesting another PIN',
    WAIT_OTP_ONE_HOUR: 'Wait 1 hour before requesting another PIN',
    WAIT_BEFORE_RESEND_OTP: 'Please wait before resending PIN',
    UNAUTHORIZED_DEVICE: 'Unauthorized device',
    MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED: 'Multiple SMS to same number not allowed',
  },
  PRODUCT: {
    DESCRIPTION_MAX_250_LENGTH: 'Product description must be less than 5000 characters',
    PRODUCT_ALREADY_EXISTS: 'Product already exists',
    PRODUCT_NOT_FOUND: 'Product not found',
    PRODUCT_CREATED_SUCCESSFULLY: 'Product created successfully',
    PRODUCT_UPDATED_SUCCESSFULLY: 'Product updated successfully',
    PRODUCT_DELETED_SUCCESSFULLY: 'Product deleted successfully',
    PRODUCT_STATUS_UPDATED_SUCCESSFULLY: 'Product status updated successfully',
    PRODUCT_LIST_FETCHED_SUCCESSFULLY: 'Product list fetched successfully',
    PRODUCT_FETCHED_SUCCESSFULLY: 'Product fetched successfully',
    PRODUCT_CODE_IS_REQUIRED: 'Product code is required',
    PRODUCT_CODE_MUST_BE_STRING: 'Product code must be a string',
    PRODUCT_CODE_NOT_ALLOWED_EMPTY: 'Product code must not be empty',
    PRODUCT_CODE_MUST_BE_AT_LEAST_3_CHARACTERS: 'Product code must be at least 3 characters',
    PRODUCT_NAME_IS_REQUIRED: 'Product name is required',
    PRODUCT_NAME_MUST_BE_STRING: 'Product name must be a string',
    PRODUCT_NAME_NOT_ALLOWED_EMPTY: 'Product name must not be empty',
    PRODUCT_NAME_MUST_BE_AT_LEAST_3_CHARACTERS: 'Product name must be at least 3 characters',
    CATEGORY_ID_IS_REQUIRED: 'Category ID is required',
    CATEGORY_ID_MUST_BE_NUMBER: 'Category ID must be a number',
    CATEGORY_ID_MUST_BE_INTEGER: 'Category ID must be an integer',
    CATEGORY_ID_MUST_BE_POSITIVE: 'Category ID must be positive',
    CATEGORY_ID_NOT_ALLOWED_EMPTY: 'Category ID must not be empty',
    CATEGORY_ID_MUST_BE_ARRAY: 'Category ID must be an array',
    CATEGORY_ID_ELEMENTS_MUST_BE_POSITIVE_NUMBERS: 'Category ID elements must be positive numbers',
    CATEGORY_ID_MUST_NOT_BE_EMPTY: 'Category ID must not be empty',
    IS_SAMPLE_IS_REQUIRED: 'Sample status is required',
    IS_SAMPLE_MUST_BE_BOOLEAN: 'Sample status must be a boolean',
    SAMPLE_QUANTITY_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE:
      'Sample quantity is required when sample is true',
    SAMPLE_QUANTITY_MUST_BE_NUMBER: 'Sample quantity must be a number',
    SAMPLE_QUANTITY_MUST_BE_POSITIVE: 'Sample quantity must be positive',
    SAMPLE_QUANTITY_MINIMUM_IS_1: 'Sample quantity must be at least 1',
    SAMPLE_QUANTITY_MAXIMUM_IS_10: 'Sample quantity must not exceed 10',
    SAMPLE_QUANTITY_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE:
      'Sample quantity not allowed when sample is false',
    MEASUREMENT_ID_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE:
      'Measurement ID is required when sample is true',
    MEASUREMENT_ID_MUST_BE_NUMBER: 'Measurement ID must be a number',
    MEASUREMENT_ID_MUST_BE_INTEGER: 'Measurement ID must be an integer',
    MEASUREMENT_ID_MUST_BE_POSITIVE: 'Measurement ID must be positive',
    MEASUREMENT_ID_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE:
      'Measurement ID not allowed when sample is false',
    IMAGE_URL_MUST_BE_VALID: 'Image URL must be valid',
    IMAGE_MUST_BE_STRING: 'Image must be a string',
    IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS: 'Images must be an array of URL strings',
  },
  STAFF: {
    USER_DELETED_SUCCESSFULLY: 'Staff deleted successfully',
    USER_NOT_FOUND: 'Staff not found',
    IMAGE_UPDATE_SUCESSFULLY: 'Staff image updated successfully',
    FAIL_IMAGE_UPDATE: 'Failed to update staff image',
    STAFF_ALREADY_EXISTS: 'Staff already exists',
    STAFF_PIN_GENERATION_SUCCESS: 'Staff PIN generated successfully',
    STAFF_ID_MUST_BE_ARRAY: 'Staff ID must be an array',
    STAFF_ID_MUST_BE_NUMBER: 'Staff ID must be a number',
    STAFF_ID_CANNOT_BE_EMPTY: 'Staff ID cannot be empty',
    STAFF_ID_MUST_BE_INTEGER: 'Staff ID must be an integer',
    STAFF_ID_MUST_BE_POSITIVE: 'Staff ID must be a positive number',
    STAFF_COUNT_FETCHED_SUCCESSFULLY: 'Staff count fetched successfully',
    STAFF_STATISTICS_FETCHED_SUCCESSFULLY: 'Staff statistics fetched successfully',
    STAFF_NOT_FOUND: 'Staff not found',
    STAFF_CREATED_SUCCESSFULLY: 'Staff created successfully',
    STAFF_UPDATED_SUCCESSFULLY: 'Staff updated successfully',
    STAFF_DELETED_SUCCESSFULLY: 'Staff deleted successfully',
    STAFF_STATUS_UPDATED_SUCCESSFULLY: 'Staff status updated successfully',
    STAFF_LIST_FETCHED_SUCCESSFULLY: 'Staff list fetched successfully',
    STAFF_FETCHED_SUCCESSFULLY: 'Staff fetched successfully',
    STAFF_PIN_RESET_SUCCESSFULLY: 'Staff PIN reset successfully',
    PROFILE_IMAGE_MUST_BE_VALID_URL: 'Profile image must be a valid URL',
    PROFILE_IMAGE_MUST_BE_STRING: 'Profile image must be a string',
    STAFF_ID_NOT_FOUND: 'Staff ID not found',
    FAILED_TO_GET_PIN_INFORMATION: 'Failed to get PIN information',
    FAILED_TO_RESET_PIN: 'Failed to reset PIN',
    FAILED_TO_RESET_PIN_TRY_AGAIN: 'Failed to reset PIN. Please try again.',
  },
  CUSTOMER: {
    CUSTOMER_DELETED_SUCCESSFULLY: 'Customer deleted successfully',
    CUSTOMER_NOT_FOUND: 'Customer not found',
  },
  BRANCH: {
    BRANCH_DELETED_SUCCESSFULLY: 'Branch deleted successfully',
    BRANCH_NOT_FOUND: 'Branch not found',
  },
  TASK: {
    TITLE_IS_REQUIRED: 'Title is required',
    TITLE_MUST_BE_STRING: 'Title must be a string',
    TITLE_NOT_ALLOWED_EMPTY: 'Title cannot be empty',

    TASK_ASSIGNEE_NOT_FOUND: 'Concern assignee not found',
    TASK_CREATOR_USER_NOT_FOUND: 'Concern creator user not found',
    TASK_REPORTER_USER_NOT_FOUND: 'Concern reporter user not found',
    TASK_PRIORITY_NOT_FOUND: 'Concern priority not found',
    TASK_TYPE_NOT_FOUND: 'Concern type not found',
    TASK_TYPE_FETCHED_SUCCESSFULLY: 'Concern types fetched successfully',
    TASKS_ALREADY_EXISTS: 'Concern already exists',
    TASKS_NOT_FOUND: 'Concern not found',
    TASKS_CREATED_SUCCESSFULLY: 'Concern created successfully',
    TASKS_UPDATED_SUCCESSFULLY: 'Concern updated successfully',
    TASKS_DELETED_SUCCESSFULLY: 'Concern deleted successfully',
    TASKS_LIST_FETCHED_SUCCESSFULLY: 'Concern list fetched successfully',
    TASKS_FETCHED_SUCCESSFULLY: 'Concern fetched successfully',
    OVERDUE_TASKS_FETCHED_SUCCESSFULLY: 'Overdue concerns fetched successfully',
    TASKS_THRESHOLD_TIME_UPDATED_SUCCESSFULLY: 'Concern threshold time updated successfully',
    THRESHOLD_TIME_FETCH_SUCCESSFULLY: 'Threshold time fetched successfully',
    THRESHOLD_TIME_NOT_FOUND: 'Threshold time not found',
    OPEN_STATUS_NOT_FOUND_IN_DATABASE: 'Open status not found in database',

    THRESHOLD_TIME_IS_REQUIRED: 'Threshold time is required',
    THRESHOLD_TIME_MUST_BE_NUMBER: 'Threshold time must be a number',
    THRESHOLD_TIME_MUST_BE_POSITIVE_HOURS: 'Threshold time must be positive hours',

    TYPE_ID_IS_REQUIRED: 'Type ID is required',
    TYPE_ID_MUST_BE_NUMBER: 'Type ID must be a number',
    TYPE_ID_MUST_BE_INTEGER: 'Type ID must be an integer',
    TYPE_ID_MUST_BE_POSITIVE: 'Type ID must be positive',

    STATUS_ID_IS_REQUIRED: 'Status ID is required',
    STATUS_ID_MUST_BE_NUMBER: 'Status ID must be a number',
    STATUS_ID_MUST_BE_INTEGER: 'Status ID must be an integer',
    STATUS_ID_MUST_BE_POSITIVE: 'Status ID must be positive',

    PRIORITY_ID_IS_REQUIRED: 'Priority is required',
    PRIORITY_ID_MUST_BE_NUMBER: 'Priority ID must be a number',
    PRIORITY_ID_MUST_BE_INTEGER: 'Priority ID must be an integer',
    PRIORITY_ID_MUST_BE_POSITIVE: 'Priority ID must be positive',

    REPORTER_ID_IS_REQUIRED: 'Reporter ID is required',
    REPORTER_ID_MUST_BE_NUMBER: 'Reporter ID must be a number',
    REPORTER_ID_MUST_BE_INTEGER: 'Reporter ID must be an integer',
    REPORTER_ID_MUST_BE_POSITIVE: 'Reporter ID must be positive',

    CREATED_BY_ID_IS_REQUIRED: 'Created by ID is required',
    CREATED_BY_ID_MUST_BE_NUMBER: 'Created by ID must be a number',
    CREATED_BY_ID_MUST_BE_INTEGER: 'Created by ID must be an integer',
    CREATED_BY_ID_MUST_BE_POSITIVE: 'Created by ID must be positive',

    ASSIGN_TO_ID_IS_REQUIRED: 'Assign to ID is required',
    ASSIGN_TO_ID_MUST_BE_NUMBER: 'Assign to ID must be a number',
    ASSIGN_TO_ID_MUST_BE_INTEGER: 'Assign to ID must be an integer',
    ASSIGN_TO_ID_MUST_BE_POSITIVE: 'Assign to ID must be positive',

    START_DATE_MUST_BE_DATE: 'Start date must be a valid date',
    START_DATE_IS_REQUIRED: 'Start date is required',
    START_DATE_NOT_ALLOWED_EMPTY: 'Start date cannot be empty',
    START_DATE_MUST_BE_ISO: 'Start date must be in ISO format',

    END_DATE_MUST_BE_DATE: 'End date must be a valid date',
    END_DATE_IS_REQUIRED: 'End date is required',
    END_DATE_NOT_ALLOWED_EMPTY: 'End date cannot be empty',
    END_DATE_MUST_BE_ISO: 'End date must be in ISO format',

    COMPANY_ID_IS_REQUIRED: 'Company ID is required',
    COMPANY_ID_MUST_BE_NUMBER: 'Company ID must be a number',
    COMPANY_ID_MUST_BE_INTEGER: 'Company ID must be an integer',
    COMPANY_ID_MUST_BE_POSITIVE: 'Company ID must be positive',

    CUSTOMER_ID_IS_REQUIRED: 'Customer ID is required',
    CUSTOMER_ID_MUST_BE_NUMBER: 'Customer ID must be a number',
    CUSTOMER_ID_MUST_BE_INTEGER: 'Customer ID must be an integer',
    CUSTOMER_ID_MUST_BE_POSITIVE: 'Customer ID must be positive',

    BRANCH_ID_IS_REQUIRED: 'Branch ID is required',
    BRANCH_ID_MUST_BE_NUMBER: 'Branch ID must be a number',
    BRANCH_ID_MUST_BE_INTEGER: 'Branch ID must be an integer',
    BRANCH_ID_MUST_BE_POSITIVE: 'Branch ID must be positive',

    PRODUCT_ID_MUST_BE_NUMBER: 'Product ID must be a number',
    PRODUCT_ID_MUST_BE_INTEGER: 'Product ID must be an integer',
    PRODUCT_ID_MUST_BE_POSITIVE: 'Product ID must be positive',
    PRODUCT_ID_IS_REQUIRED: 'Product ID is required',

    CONCERN_TYPE_IDS_MUST_BE_ARRAY: 'Concern type IDs must be an array',
    CONCERN_TYPE_IDS_MUST_BE_NUMBER: 'Concern type IDs must be numbers',
    CONCERN_TYPE_IDS_MUST_BE_INTEGER: 'Concern type IDs must be integers',

    DESCRIPTION_IS_REQUIRED: 'Description is required',
    DESCRIPTION_MUST_BE_STRING: 'Description must be a string',
    DESCRIPTION_NOT_ALLOWED_EMPTY: 'Description cannot be empty',

    IMAGE_URL_MUST_BE_VALID: 'Image URL must be valid',
    IMAGE_MUST_BE_STRING: 'Image must be a string',
    IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS: 'Images must be an array of URL strings',

    DATA_MUST_BE_OBJECT: 'Data must be an object',
    DATA_IS_REQUIRED: 'Data is required',
    ID_MUST_BE_NUMBER: 'Id must be number',
    ID_MUST_BE_INTEGER: 'Id must be integer',
    ID_MUST_BE_POSITIVE: 'Id must be positive',
    ROAD_ID_MUST_BE_NUMBER: 'Road id must be number',
    ROAD_ID_MUST_BE_INTEGER: 'Road id must be integer',
    ROAD_ID_MUST_BE_POSITIVE: 'Road id must be positive',
    IMAGE_UPDATE_SUCESSFULLY: 'Customer image updated successfully',
    FAIL_IMAGE_UPDATE: 'Failed to update customer image',
    REMOVE_CATEGORY_ID_SUCCESSFULLY: 'Category ID removed successfully',
    COPY_CATEGORY_ID_TO_CATEGORY_IDS_SUCCESSFULLY: 'Category ID copied to category IDs successfully',
    REMOVE_GRADE_ID_SUCCESSFULLY: 'Grade ID removed successfully',
    COPY_GRADE_ID_TO_GRADE_IDS_SUCCESSFULLY: 'Grade ID copied to grade IDs successfully',
    TASKS_LINKING_ERROR: 'Tasks linking error',
    ONLY_HOD_AND_ADMIN_CAN_REASSIGN_TASK: 'Only HOD and Admin can reassign task',
    TASK_ALREADY_TAKEN_BY_OTHER_STAFF: 'Task already accepted.',
    CONCERN_MISSED_DUE_DATE_COUNT_FETCHED_SUCCESSFULLY: 'Concern missed due date count fetched successfully',
    SAMPLE_REQUEST_COUNT_FETCHED_SUCCESSFULLY: 'Sample request count fetched successfully',
    CONCERN_COUNT_FETCHED_SUCCESSFULLY: 'Concern count fetched successfully',
    SAMPLE_REQUEST_CREATED_SUCCESSFULLY: 'Sample request created successfully',
    SAMPLE_REQUEST_LIST_FETCHED_SUCCESSFULLY: 'Sample request list fetched successfully',
    SAMPLE_REQUEST_FETCHED_SUCCESSFULLY: 'Sample request fetched successfully',
    SAMPLE_REQUEST_UPDATED_SUCCESSFULLY: 'Sample request updated successfully',
    SAMPLE_REQUEST_DELETED_SUCCESSFULLY: 'Sample request deleted successfully',
    CONCERN_DELETED_SUCCESSFULLY: 'Concern deleted successfully',
    CONCERN_UPDATED_SUCCESSFULLY: 'Concern updated successfully',
    CONCERN_FETCHED_SUCCESSFULLY: 'Concern fetched successfully',
    CONCERN_LIST_FETCHED_SUCCESSFULLY: 'Concern list fetched successfully',
    CONCERN_CREATED_SUCCESSFULLY: 'Concern created successfully',
    STATUS_CANNOT_HAVE_BOTH_INCLUDE_IDS_AND_EXCLUDE_IDS: 'Status cannot have both include IDs and exclude IDs',
    STATUS_MUST_HAVE_INCLUDE_IDS_OR_EXCLUDE_IDS: 'Status must have include IDs or exclude IDs',
    INCLUDE_STATUS_IDS_MUST_BE_ARRAY: 'Include status IDs must be an array',
    INCLUDE_STATUS_IDS_MUST_BE_POSITIVE: 'Include status IDs must be positive',
    INCLUDE_STATUS_IDS_CANNOT_BE_EMPTY: 'Include status IDs cannot be empty',
    EXCLUDE_STATUS_IDS_MUST_BE_ARRAY: 'Exclude status IDs must be an array',
    EXCLUDE_STATUS_IDS_MUST_BE_POSITIVE: 'Exclude status IDs must be positive',
    EXCLUDE_STATUS_IDS_CANNOT_BE_EMPTY: 'Exclude status IDs cannot be empty',
    MULTIPLE_TYPE_IDS_MUST_BE_ARRAY_OF_NUMBERS: 'Multiple type IDs must be an array of numbers',
    MULTIPLE_TYPE_IDS_MUST_BE_INTEGER: 'Multiple type IDs must be integers',
    MULTIPLE_TYPE_IDS_MUST_BE_POSITIVE: 'Multiple type IDs must be positive',
    MULTIPLE_TYPE_IDS_MUST_HAVE_AT_LEAST_ONE: 'Multiple type IDs must have at least one',
    MULTIPLE_TYPE_IDS_IS_REQUIRED: 'Multiple type IDs is required',
    MULTIPLE_TYPE_IDS_MUST_BE_NUMBER: 'Multiple type IDs must be numbers',
    MULTIPLE_TYPE_IDS_NOT_ALLOWED_EMPTY: 'Multiple type IDs cannot be empty',
    TYPE_ID_MUST_BE_ARRAY_OF_NUMBERS: 'Type ID must be an array of numbers',
    UNAUTHORIZED_ROAD_ACCESS: 'Unauthorized road access',
    IS_TODAY_MUST_BE_BOOLEAN: 'Is today must be a boolean',
    EXCLUDE_IDS_MUST_BE_ARRAY: 'Exclude IDs must be an array',
    EXCLUDE_IDS_MUST_BE_POSITIVE: 'Exclude IDs must be positive',
    EXCLUDE_IDS_CANNOT_BE_EMPTY: 'Exclude IDs cannot be empty',
    INCLUDE_IDS_CANNOT_BE_EMPTY: 'Include IDs cannot be empty',
    INCLUDE_IDS_MUST_BE_ARRAY: 'Include IDs must be an array',
    INCLUDE_IDS_MUST_BE_POSITIVE: 'Include IDs must be positive',
    TASK_FILTER_BY_MUST_BE_ARRAY: 'Task filter by must be an array',
    TASK_FILTER_BY_CANNOT_BE_EMPTY: 'Task filter by cannot be empty',
    INVALID_TASK_FILTER_BY: 'Invalid task filter by',
    TASK_FILTER_BY_MUST_BE_STRING: 'Task filter by must be a string',
    INVALID_CREATE_DATE: 'Invalid create date',
    CREATED_DATE_MUST_BE_DATE: 'Created date must be a valid date',
    CREATED_DATE_MUST_BE_ISO: 'Created date must be in ISO format',
    LINK_MUST_BE_ARRAY: 'Link must be an array',
    LINK_CANNOT_BE_EMPTY: 'Link cannot be empty',
    LINK_ID_MUST_BE_POSITIVE: 'Link ID must be positive',
    INVALID_DUE_DATE_RANGE: 'Invalid due date range',
    DUE_START_DATE_REQUIRED: 'Due start date is required',
    DUE_END_DATE_REQUIRED: 'Due end date is required',
    DUE_START_DATE_MUST_BE_DATE: 'Due start date must be a valid date',
    DUE_START_DATE_NOT_ALLOWED_EMPTY: 'Due start date cannot be empty',
    DUE_START_DATE_MUST_BE_ISO: 'Due start date must be in ISO format',
    DUE_END_DATE_MUST_BE_DATE: 'Due end date must be a valid date',
    DUE_END_DATE_NOT_ALLOWED_EMPTY: 'Due end date cannot be empty',
    DUE_END_DATE_MUST_BE_ISO: 'Due end date must be in ISO format',
    TYPE_ID_NOT_ALLOWED_EMPTY: 'Type ID cannot be empty',
    TYPE_ID_MUST_HAVE_AT_LEAST_ONE: 'Type ID must have at least one',
    STATUS_ID_MUST_BE_ARRAY: 'Status ID must be an array',
    PRIORITY_ID_MUST_BE_ARRAY: 'Priority ID must be an array',
    ASSIGN_TO_ID_MUST_BE_ARRAY: 'Assign to ID must be an array',
    DESCRIPTION_MAX_5000_LENGTH: 'Description must be less than 5000 characters',
    IS_OVERDUE_MUST_BE_BOOLEAN: 'Is overdue must be a boolean',
  },
  MASTER_BAG: {
    MASTER_BAG_CAP_MUST_BE_ARRAY: 'Master bag capacities must be provided in an array.',
    MASTER_BAG_CAP_CANNOT_BE_EMPTY: 'Master bag capacities cannot be empty.',
    STRIP_TEST_MUST_BE_ARRAY: 'Strip test values must be provided in an array.',
    STRIP_TEST_CANNOT_BE_EMPTY: 'Strip test values cannot be empty.',
    STRIP_TEST_IS_REQUIRED: 'Strip test is required.',
    INVALID_STRIP_TEST_VALUE: 'Invalid strip test value provided.',
    STRIP_TEST_MUST_BE_STRING: 'Each strip test value must be a string.',
    MASTER_BAG_CAP_IS_REQUIRED: 'Master bag capacity is required.',
    INVALID_MASTER_BAG_CAP_VALUE: 'Invalid master bag capacity value.',
    MASTER_BAG_CAP_MUST_BE_STRING: 'Each master bag capacity must be a string.',
    PHOTO_MUST_BE_STRING: 'Each photo must be a valid string URL.',
    PHOTOS_MUST_BE_ARRAY: 'Photos must be provided in an array.',
    PHOTOS_MAX_FIVE_ALLOWED: 'You can upload a maximum of five photos.',
    PHOTOS_MIN_ONE_REQUIRED: 'At least one photo is required.',
    INVALID_PHOTO_URL: 'Invalid photo URL provided.',
    MASTER_BAG_CREATED_SUCCESSFULLY: 'Master bag created successfully.',
    MASTER_BAG_LIST_FETCHED_SUCCESSFULLY: 'Master bag list fetched successfully.',
    MASTER_BAG_FETCHED_SUCCESSFULLY: 'Master bag details fetched successfully.',
    MASTER_BAG_UPDATED_SUCCESSFULLY: 'Master bag updated successfully.',
    MASTER_BAG_DELETED_SUCCESSFULLY: 'Master bag deleted successfully.',
    MASTER_BAG_NOT_FOUND: 'Master bag not found.',
    FAILED_TO_DELETE_MASTER_BAG: 'Failed to delete Master bag.',
    FAILED_TO_REFRESH_MASTER_BAG: 'Failed to refresh Master bag.',
    DAILY_VISIT_ALREADY_LINKED_WITH_MASTER_BAG:
      'This daily report is already linked with a master bag.',
  },
  DAILY_VISIT: {
    LINK_TO_MUST_BE_NUMBER: 'Link To must be a number.',
    LINK_TO_MUST_BE_INTEGER: 'Link To must be an integer.',
    LINK_TO_MUST_BE_POSITIVE: 'Link To must be a positive number.',
    DAILY_VISIT_ID_MUST_BE_NUMBER: 'Daily Report ID must be a number.',
    DAILY_VISIT_ID_MUST_BE_INTEGER: 'Daily Report ID must be an integer.',
    DAILY_VISIT_ID_MUST_BE_POSITIVE: 'Daily Report ID must be a positive number.',
    NOTES_SUMMARY_MUST_BE_STRING: 'Notes summary must be a string.',
    NOTES_SUMMARY_MAX_250_CHARACTERS: 'Notes summary cannot exceed 250 characters.',
    INVALID_PURPOSE_TYPE_VALUE: 'Invalid purpose type value.',
    COMPANY_ID_IS_REQUIRED: 'Company ID is required.',
    COMPANY_ID_MUST_BE_NUMBER: 'Company ID must be a number.',
    COMPANY_ID_MUST_BE_INTEGER: 'Company ID must be an integer.',
    COMPANY_ID_MUST_BE_POSITIVE: 'Company ID must be a positive number.',
    PURPOSE_TYPE_IS_REQUIRED: 'Purpose type is required.',
    PURPOSE_TYPE_MUST_BE_STRING: 'Purpose type must be a string.',
    PURPOSE_TYPE_MUST_BE_ARRAY: 'Purpose type must be an array.',
    PURPOSE_TYPE_CANNOT_BE_EMPTY: 'Purpose type cannot be empty.',
    INVALID_DAILY_VISIT_STATUS_VALUE: 'Invalid daily report status value.',
    DAILY_VISIT_STATUS_MUST_BE_STRING: 'Daily report status must be a string.',
    DAILY_VISIT_STATUS_MUST_BE_ARRAY: 'Daily report status must be an array.',
    DAILY_VISIT_STATUS_CANNOT_BE_EMPTY: 'Daily report status cannot be empty.',
    DAILY_VISIT_NOT_FOUND: 'Daily report not found.',
    DAILY_VISIT_CREATED_SUCCESSFULLY: 'Daily report created successfully.',
    DAILY_VISIT_LIST_FETCHED_SUCCESSFULLY: 'Daily report list fetched successfully.',
    DAILY_VISIT_FETCHED_SUCCESSFULLY: 'Daily report fetched successfully.',
    DAILY_VISIT_UPDATED_SUCCESSFULLY: 'Daily report updated successfully.',
    DAILY_VISIT_DELETED_SUCCESSFULLY: 'Daily report deleted successfully.',
  },
  COMPETITOR_ANALYSIS: {
    DAILY_VISIT_ALREADY_LINKED_WITH_COMPETITOR_ANALYSIS:
      'This daily report is already linked with a competitor analysis.',
    COMPETITOR_COMPANY_ID_MUST_BE_ARRAY: 'Competitor company IDs must be provided in an array.',
    COMPETITOR_COMPANY_ID_CANNOT_BE_EMPTY: 'Competitor company IDs cannot be empty.',
    ROAD_ID_NOT_ALLOWED_WITH_COMPANY_ID: 'Road ID is not allowed with company ID.',
    COMPANY_NAME_OR_COMPANY_ID_IS_REQUIRED: 'Company name or company ID is required.',
    COMPETITOR_COMPANY_ID_OR_COMPETITOR_COMPANY_NAME_IS_REQUIRED:
      'Competitor company ID or competitor company name is required.',
    COMPETITOR_ANALYSIS_NOT_FOUND: 'Competitor analysis not found.',
    COMPETITOR_ANALYSIS_CREATED_SUCCESSFULLY: 'Competitor analysis created successfully.',
    COMPETITOR_ANALYSIS_LIST_FETCHED_SUCCESSFULLY: 'Competitor analysis list fetched successfully.',
    COMPETITOR_ANALYSIS_FETCHED_SUCCESSFULLY: 'Competitor analysis details fetched successfully.',
    COMPETITOR_ANALYSIS_UPDATED_SUCCESSFULLY: 'Competitor analysis updated successfully.',
    COMPETITOR_ANALYSIS_DELETED_SUCCESSFULLY: 'Competitor analysis deleted successfully.',
    COMPETITOR_COMPANY_NAME_IS_REQUIRED: 'Competitor company name is required.',
    COMPETITOR_COMPANY_NAME_MUST_BE_STRING: 'Competitor company name must be a string.',
    COMPETITOR_COMPANY_NAME_NOT_ALLOWED_EMPTY: 'Competitor company name cannot be empty.',
    COMPETITOR_COMPANY_NAME_MUST_BE_AT_LEAST_2_CHARACTERS:
      'Competitor company name must be at least 2 characters.',
    COMPETITOR_COMPANY_NAME_MUST_NOT_EXCEED_70_CHARACTERS:
      'Competitor company name must not exceed 70 characters.',
    COMPETITOR_COMPANY_ID_IS_REQUIRED: 'Competitor company ID is required.',
    COMPETITOR_COMPANY_ID_MUST_BE_NUMBER: 'Competitor company ID must be a number.',
    COMPETITOR_COMPANY_ID_MUST_BE_INTEGER: 'Competitor company ID must be an integer.',
    COMPETITOR_COMPANY_ID_MUST_BE_POSITIVE: 'Competitor company ID must be a positive number.',
    PENDING_REASON_MUST_BE_BOOLEAN: 'Pending reason must be a boolean.',
  },

  // Concern type related messages
  CONCERN_TYPE: {
    CONCERN_TYPE_ALREADY_EXISTS: 'Concern type with this name already exists',
  },

  // Chat related messages
  CHAT: {
    MEMBER_ADDED_SUCCESS: 'Member added successfully',
    MEMBER_REMOVED_SUCCESS: 'Member removed successfully',
    GROUP_NAME_UPDATED_SUCCESS: 'Group name updated successfully',
  },

  // Generic messages
  GENERIC: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    REQUIRED_FIELDS: 'Please fill in the required fields',
    START_DATE_LATER_END: 'Start date cannot be later than end date',
  },

  // Comment related messages
  COMMENT: {
    COMMENT_CREATED_SUCCESSFULLY: 'Comment created successfully',
  },
} as const;

export const showToast = (
  type: (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE],
  message: string,
  position: 'top' | 'bottom' = 'bottom',
  title?: string,
  subtitle?: string
) => {
  Toast.show({
    type,
    text1: title || message,
    text2: subtitle || (title ? message : undefined),
    position,
    visibilityTime: 5000,
  });
};
// Helper function to handle task error messages
export const handleTaskError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    // Title related errors
    TITLE_IS_REQUIRED: TOAST_MESSAGES.TASK.TITLE_IS_REQUIRED,
    TITLE_MUST_BE_STRING: TOAST_MESSAGES.TASK.TITLE_MUST_BE_STRING,
    TITLE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.TITLE_NOT_ALLOWED_EMPTY,

    // Description related errors
    DESCRIPTION_IS_REQUIRED: TOAST_MESSAGES.TASK.DESCRIPTION_IS_REQUIRED,
    DESCRIPTION_MUST_BE_STRING: TOAST_MESSAGES.TASK.DESCRIPTION_MUST_BE_STRING,
    DESCRIPTION_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.DESCRIPTION_NOT_ALLOWED_EMPTY,

    // ID related errors
    TYPE_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.TYPE_ID_IS_REQUIRED,
    TYPE_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_NUMBER,
    TYPE_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_INTEGER,
    TYPE_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_POSITIVE,

    STATUS_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.STATUS_ID_IS_REQUIRED,
    STATUS_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.STATUS_ID_MUST_BE_NUMBER,
    STATUS_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.STATUS_ID_MUST_BE_INTEGER,
    STATUS_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.STATUS_ID_MUST_BE_POSITIVE,

    PRIORITY_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.PRIORITY_ID_IS_REQUIRED,
    PRIORITY_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.PRIORITY_ID_MUST_BE_NUMBER,
    PRIORITY_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.PRIORITY_ID_MUST_BE_INTEGER,
    PRIORITY_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.PRIORITY_ID_MUST_BE_POSITIVE,

    REPORTER_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.REPORTER_ID_IS_REQUIRED,
    REPORTER_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.REPORTER_ID_MUST_BE_NUMBER,
    REPORTER_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.REPORTER_ID_MUST_BE_INTEGER,
    REPORTER_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.REPORTER_ID_MUST_BE_POSITIVE,

    CREATED_BY_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.CREATED_BY_ID_IS_REQUIRED,
    CREATED_BY_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.CREATED_BY_ID_MUST_BE_NUMBER,
    CREATED_BY_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.CREATED_BY_ID_MUST_BE_INTEGER,
    CREATED_BY_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.CREATED_BY_ID_MUST_BE_POSITIVE,

    ASSIGN_TO_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.ASSIGN_TO_ID_IS_REQUIRED,
    ASSIGN_TO_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.ASSIGN_TO_ID_MUST_BE_NUMBER,
    ASSIGN_TO_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.ASSIGN_TO_ID_MUST_BE_INTEGER,
    ASSIGN_TO_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.ASSIGN_TO_ID_MUST_BE_POSITIVE,

    COMPANY_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.COMPANY_ID_IS_REQUIRED,
    COMPANY_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.COMPANY_ID_MUST_BE_NUMBER,
    COMPANY_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.COMPANY_ID_MUST_BE_INTEGER,
    COMPANY_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.COMPANY_ID_MUST_BE_POSITIVE,

    CUSTOMER_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.CUSTOMER_ID_IS_REQUIRED,
    CUSTOMER_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.CUSTOMER_ID_MUST_BE_NUMBER,
    CUSTOMER_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.CUSTOMER_ID_MUST_BE_INTEGER,
    CUSTOMER_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.CUSTOMER_ID_MUST_BE_POSITIVE,

    BRANCH_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.BRANCH_ID_IS_REQUIRED,
    BRANCH_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.BRANCH_ID_MUST_BE_NUMBER,
    BRANCH_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.BRANCH_ID_MUST_BE_INTEGER,
    BRANCH_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.BRANCH_ID_MUST_BE_POSITIVE,

    PRODUCT_ID_IS_REQUIRED: TOAST_MESSAGES.TASK.PRODUCT_ID_IS_REQUIRED,
    PRODUCT_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.PRODUCT_ID_MUST_BE_NUMBER,
    PRODUCT_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.PRODUCT_ID_MUST_BE_INTEGER,
    PRODUCT_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.PRODUCT_ID_MUST_BE_POSITIVE,

    // Date related errors
    START_DATE_IS_REQUIRED: TOAST_MESSAGES.TASK.START_DATE_IS_REQUIRED,
    START_DATE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.START_DATE_NOT_ALLOWED_EMPTY,
    START_DATE_MUST_BE_DATE: TOAST_MESSAGES.TASK.START_DATE_MUST_BE_DATE,
    START_DATE_MUST_BE_ISO: TOAST_MESSAGES.TASK.START_DATE_MUST_BE_ISO,

    END_DATE_IS_REQUIRED: TOAST_MESSAGES.TASK.END_DATE_IS_REQUIRED,
    END_DATE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.END_DATE_NOT_ALLOWED_EMPTY,
    END_DATE_MUST_BE_DATE: TOAST_MESSAGES.TASK.END_DATE_MUST_BE_DATE,
    END_DATE_MUST_BE_ISO: TOAST_MESSAGES.TASK.END_DATE_MUST_BE_ISO,

    // Concern type related errors
    CONCERN_TYPE_IDS_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.CONCERN_TYPE_IDS_MUST_BE_ARRAY,
    CONCERN_TYPE_IDS_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.CONCERN_TYPE_IDS_MUST_BE_NUMBER,
    CONCERN_TYPE_IDS_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.CONCERN_TYPE_IDS_MUST_BE_INTEGER,

    // Image related errors
    IMAGE_URL_MUST_BE_VALID: TOAST_MESSAGES.TASK.IMAGE_URL_MUST_BE_VALID,
    IMAGE_MUST_BE_STRING: TOAST_MESSAGES.TASK.IMAGE_MUST_BE_STRING,
    IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS:
      TOAST_MESSAGES.TASK.IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS,

    // Data related errors
    DATA_IS_REQUIRED: TOAST_MESSAGES.TASK.DATA_IS_REQUIRED,
    DATA_MUST_BE_OBJECT: TOAST_MESSAGES.TASK.DATA_MUST_BE_OBJECT,

    // Threshold time related errors
    THRESHOLD_TIME_IS_REQUIRED: TOAST_MESSAGES.TASK.THRESHOLD_TIME_IS_REQUIRED,
    THRESHOLD_TIME_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.THRESHOLD_TIME_MUST_BE_NUMBER,
    THRESHOLD_TIME_MUST_BE_POSITIVE_HOURS:
      TOAST_MESSAGES.TASK.THRESHOLD_TIME_MUST_BE_POSITIVE_HOURS,

    // Entity not found errors
    TASK_ASSIGNEE_NOT_FOUND: TOAST_MESSAGES.TASK.TASK_ASSIGNEE_NOT_FOUND,
    TASK_CREATOR_USER_NOT_FOUND: TOAST_MESSAGES.TASK.TASK_CREATOR_USER_NOT_FOUND,
    TASK_REPORTER_USER_NOT_FOUND: TOAST_MESSAGES.TASK.TASK_REPORTER_USER_NOT_FOUND,
    TASK_PRIORITY_NOT_FOUND: TOAST_MESSAGES.TASK.TASK_PRIORITY_NOT_FOUND,
    TASK_TYPE_NOT_FOUND: TOAST_MESSAGES.TASK.TASK_TYPE_NOT_FOUND,
    TASKS_NOT_FOUND: TOAST_MESSAGES.TASK.TASKS_NOT_FOUND,
    THRESHOLD_TIME_NOT_FOUND: TOAST_MESSAGES.TASK.THRESHOLD_TIME_NOT_FOUND,
    OPEN_STATUS_NOT_FOUND_IN_DATABASE: TOAST_MESSAGES.TASK.OPEN_STATUS_NOT_FOUND_IN_DATABASE,

    // Success messages (for reference)
    TASKS_CREATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASKS_CREATED_SUCCESSFULLY,
    TASKS_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASKS_UPDATED_SUCCESSFULLY,
    TASKS_DELETED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASKS_DELETED_SUCCESSFULLY,
    TASKS_LIST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASKS_LIST_FETCHED_SUCCESSFULLY,
    TASKS_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASKS_FETCHED_SUCCESSFULLY,
    OVERDUE_TASKS_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.OVERDUE_TASKS_FETCHED_SUCCESSFULLY,
    TASKS_THRESHOLD_TIME_UPDATED_SUCCESSFULLY:
      TOAST_MESSAGES.TASK.TASKS_THRESHOLD_TIME_UPDATED_SUCCESSFULLY,
    THRESHOLD_TIME_FETCH_SUCCESSFULLY: TOAST_MESSAGES.TASK.THRESHOLD_TIME_FETCH_SUCCESSFULLY,
    TASK_TYPE_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.TASK_TYPE_FETCHED_SUCCESSFULLY,
    ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_NUMBER,
    ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_INTEGER,
    ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.ID_MUST_BE_POSITIVE,
    ROAD_ID_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.ROAD_ID_MUST_BE_NUMBER,
    ROAD_ID_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.ROAD_ID_MUST_BE_INTEGER,
    ROAD_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.ROAD_ID_MUST_BE_POSITIVE,

    // New error messages
    REMOVE_CATEGORY_ID_SUCCESSFULLY: TOAST_MESSAGES.TASK.REMOVE_CATEGORY_ID_SUCCESSFULLY,
    COPY_CATEGORY_ID_TO_CATEGORY_IDS_SUCCESSFULLY: TOAST_MESSAGES.TASK.COPY_CATEGORY_ID_TO_CATEGORY_IDS_SUCCESSFULLY,
    REMOVE_GRADE_ID_SUCCESSFULLY: TOAST_MESSAGES.TASK.REMOVE_GRADE_ID_SUCCESSFULLY,
    COPY_GRADE_ID_TO_GRADE_IDS_SUCCESSFULLY: TOAST_MESSAGES.TASK.COPY_GRADE_ID_TO_GRADE_IDS_SUCCESSFULLY,
    TASKS_LINKING_ERROR: TOAST_MESSAGES.TASK.TASKS_LINKING_ERROR,
    ONLY_HOD_AND_ADMIN_CAN_REASSIGN_TASK: TOAST_MESSAGES.TASK.ONLY_HOD_AND_ADMIN_CAN_REASSIGN_TASK,
    TASK_ALREADY_TAKEN_BY_OTHER_STAFF: TOAST_MESSAGES.TASK.TASK_ALREADY_TAKEN_BY_OTHER_STAFF,
    CONCERN_MISSED_DUE_DATE_COUNT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_MISSED_DUE_DATE_COUNT_FETCHED_SUCCESSFULLY,
    SAMPLE_REQUEST_COUNT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_COUNT_FETCHED_SUCCESSFULLY,
    CONCERN_COUNT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_COUNT_FETCHED_SUCCESSFULLY,
    SAMPLE_REQUEST_CREATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_CREATED_SUCCESSFULLY,
    SAMPLE_REQUEST_LIST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_LIST_FETCHED_SUCCESSFULLY,
    SAMPLE_REQUEST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_FETCHED_SUCCESSFULLY,
    SAMPLE_REQUEST_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_UPDATED_SUCCESSFULLY,
    SAMPLE_REQUEST_DELETED_SUCCESSFULLY: TOAST_MESSAGES.TASK.SAMPLE_REQUEST_DELETED_SUCCESSFULLY,
    CONCERN_DELETED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_DELETED_SUCCESSFULLY,
    CONCERN_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_UPDATED_SUCCESSFULLY,
    CONCERN_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_FETCHED_SUCCESSFULLY,
    CONCERN_LIST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_LIST_FETCHED_SUCCESSFULLY,
    CONCERN_CREATED_SUCCESSFULLY: TOAST_MESSAGES.TASK.CONCERN_CREATED_SUCCESSFULLY,
    STATUS_CANNOT_HAVE_BOTH_INCLUDE_IDS_AND_EXCLUDE_IDS: TOAST_MESSAGES.TASK.STATUS_CANNOT_HAVE_BOTH_INCLUDE_IDS_AND_EXCLUDE_IDS,
    STATUS_MUST_HAVE_INCLUDE_IDS_OR_EXCLUDE_IDS: TOAST_MESSAGES.TASK.STATUS_MUST_HAVE_INCLUDE_IDS_OR_EXCLUDE_IDS,
    INCLUDE_STATUS_IDS_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.INCLUDE_STATUS_IDS_MUST_BE_ARRAY,
    INCLUDE_STATUS_IDS_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.INCLUDE_STATUS_IDS_MUST_BE_POSITIVE,
    INCLUDE_STATUS_IDS_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.INCLUDE_STATUS_IDS_CANNOT_BE_EMPTY,
    EXCLUDE_STATUS_IDS_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.EXCLUDE_STATUS_IDS_MUST_BE_ARRAY,
    EXCLUDE_STATUS_IDS_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.EXCLUDE_STATUS_IDS_MUST_BE_POSITIVE,
    EXCLUDE_STATUS_IDS_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.EXCLUDE_STATUS_IDS_CANNOT_BE_EMPTY,
    MULTIPLE_TYPE_IDS_MUST_BE_ARRAY_OF_NUMBERS: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_MUST_BE_ARRAY_OF_NUMBERS,
    MULTIPLE_TYPE_IDS_MUST_BE_INTEGER: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_MUST_BE_INTEGER,
    MULTIPLE_TYPE_IDS_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_MUST_BE_POSITIVE,
    MULTIPLE_TYPE_IDS_MUST_HAVE_AT_LEAST_ONE: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_MUST_HAVE_AT_LEAST_ONE,
    MULTIPLE_TYPE_IDS_IS_REQUIRED: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_IS_REQUIRED,
    MULTIPLE_TYPE_IDS_MUST_BE_NUMBER: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_MUST_BE_NUMBER,
    MULTIPLE_TYPE_IDS_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.MULTIPLE_TYPE_IDS_NOT_ALLOWED_EMPTY,
    TYPE_ID_MUST_BE_ARRAY_OF_NUMBERS: TOAST_MESSAGES.TASK.TYPE_ID_MUST_BE_ARRAY_OF_NUMBERS,
    UNAUTHORIZED_ROAD_ACCESS: TOAST_MESSAGES.TASK.UNAUTHORIZED_ROAD_ACCESS,
    IS_TODAY_MUST_BE_BOOLEAN: TOAST_MESSAGES.TASK.IS_TODAY_MUST_BE_BOOLEAN,
    EXCLUDE_IDS_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.EXCLUDE_IDS_MUST_BE_ARRAY,
    EXCLUDE_IDS_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.EXCLUDE_IDS_MUST_BE_POSITIVE,
    EXCLUDE_IDS_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.EXCLUDE_IDS_CANNOT_BE_EMPTY,
    INCLUDE_IDS_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.INCLUDE_IDS_CANNOT_BE_EMPTY,
    INCLUDE_IDS_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.INCLUDE_IDS_MUST_BE_ARRAY,
    INCLUDE_IDS_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.INCLUDE_IDS_MUST_BE_POSITIVE,
    TASK_FILTER_BY_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.TASK_FILTER_BY_MUST_BE_ARRAY,
    TASK_FILTER_BY_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.TASK_FILTER_BY_CANNOT_BE_EMPTY,
    INVALID_TASK_FILTER_BY: TOAST_MESSAGES.TASK.INVALID_TASK_FILTER_BY,
    TASK_FILTER_BY_MUST_BE_STRING: TOAST_MESSAGES.TASK.TASK_FILTER_BY_MUST_BE_STRING,
    INVALID_CREATE_DATE: TOAST_MESSAGES.TASK.INVALID_CREATE_DATE,
    CREATED_DATE_MUST_BE_DATE: TOAST_MESSAGES.TASK.CREATED_DATE_MUST_BE_DATE,
    CREATED_DATE_MUST_BE_ISO: TOAST_MESSAGES.TASK.CREATED_DATE_MUST_BE_ISO,
    LINK_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.LINK_MUST_BE_ARRAY,
    LINK_CANNOT_BE_EMPTY: TOAST_MESSAGES.TASK.LINK_CANNOT_BE_EMPTY,
    LINK_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.TASK.LINK_ID_MUST_BE_POSITIVE,
    INVALID_DUE_DATE_RANGE: TOAST_MESSAGES.TASK.INVALID_DUE_DATE_RANGE,
    DUE_START_DATE_REQUIRED: TOAST_MESSAGES.TASK.DUE_START_DATE_REQUIRED,
    DUE_END_DATE_REQUIRED: TOAST_MESSAGES.TASK.DUE_END_DATE_REQUIRED,
    DUE_START_DATE_MUST_BE_DATE: TOAST_MESSAGES.TASK.DUE_START_DATE_MUST_BE_DATE,
    DUE_START_DATE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.DUE_START_DATE_NOT_ALLOWED_EMPTY,
    DUE_START_DATE_MUST_BE_ISO: TOAST_MESSAGES.TASK.DUE_START_DATE_MUST_BE_ISO,
    DUE_END_DATE_MUST_BE_DATE: TOAST_MESSAGES.TASK.DUE_END_DATE_MUST_BE_DATE,
    DUE_END_DATE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.DUE_END_DATE_NOT_ALLOWED_EMPTY,
    DUE_END_DATE_MUST_BE_ISO: TOAST_MESSAGES.TASK.DUE_END_DATE_MUST_BE_ISO,
    TYPE_ID_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.TASK.TYPE_ID_NOT_ALLOWED_EMPTY,
    TYPE_ID_MUST_HAVE_AT_LEAST_ONE: TOAST_MESSAGES.TASK.TYPE_ID_MUST_HAVE_AT_LEAST_ONE,
    STATUS_ID_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.STATUS_ID_MUST_BE_ARRAY,
    PRIORITY_ID_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.PRIORITY_ID_MUST_BE_ARRAY,
    ASSIGN_TO_ID_MUST_BE_ARRAY: TOAST_MESSAGES.TASK.ASSIGN_TO_ID_MUST_BE_ARRAY,
    DESCRIPTION_MAX_5000_LENGTH: TOAST_MESSAGES.TASK.DESCRIPTION_MAX_5000_LENGTH,
    IS_OVERDUE_MUST_BE_BOOLEAN: TOAST_MESSAGES.TASK.IS_OVERDUE_MUST_BE_BOOLEAN,
  };

  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

export const handleProductError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    SOMETHING_WENT_WRONG: TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG,
    DESCRIPTION_MAX_250_LENGTH: TOAST_MESSAGES.PRODUCT.DESCRIPTION_MAX_250_LENGTH,
    PRODUCT_ALREADY_EXISTS: TOAST_MESSAGES.PRODUCT.PRODUCT_ALREADY_EXISTS,
    PRODUCT_NOT_FOUND: TOAST_MESSAGES.PRODUCT.PRODUCT_NOT_FOUND,
    PRODUCT_CREATED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_CREATED_SUCCESSFULLY,
    PRODUCT_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_UPDATED_SUCCESSFULLY,
    PRODUCT_DELETED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_DELETED_SUCCESSFULLY,
    PRODUCT_STATUS_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_STATUS_UPDATED_SUCCESSFULLY,
    PRODUCT_LIST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_LIST_FETCHED_SUCCESSFULLY,
    PRODUCT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.PRODUCT.PRODUCT_FETCHED_SUCCESSFULLY,
    PRODUCT_CODE_IS_REQUIRED: TOAST_MESSAGES.PRODUCT.PRODUCT_CODE_IS_REQUIRED,
    PRODUCT_CODE_MUST_BE_STRING: TOAST_MESSAGES.PRODUCT.PRODUCT_CODE_MUST_BE_STRING,
    PRODUCT_CODE_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.PRODUCT.PRODUCT_CODE_NOT_ALLOWED_EMPTY,
    PRODUCT_CODE_MUST_BE_AT_LEAST_3_CHARACTERS:
      TOAST_MESSAGES.PRODUCT.PRODUCT_CODE_MUST_BE_AT_LEAST_3_CHARACTERS,
    PRODUCT_NAME_IS_REQUIRED: TOAST_MESSAGES.PRODUCT.PRODUCT_NAME_IS_REQUIRED,
    PRODUCT_NAME_MUST_BE_STRING: TOAST_MESSAGES.PRODUCT.PRODUCT_NAME_MUST_BE_STRING,
    PRODUCT_NAME_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.PRODUCT.PRODUCT_NAME_NOT_ALLOWED_EMPTY,
    PRODUCT_NAME_MUST_BE_AT_LEAST_3_CHARACTERS:
      TOAST_MESSAGES.PRODUCT.PRODUCT_NAME_MUST_BE_AT_LEAST_3_CHARACTERS,
    CATEGORY_ID_IS_REQUIRED: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_IS_REQUIRED,
    CATEGORY_ID_MUST_BE_NUMBER: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_MUST_BE_NUMBER,
    CATEGORY_ID_MUST_BE_INTEGER: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_MUST_BE_INTEGER,
    CATEGORY_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_MUST_BE_POSITIVE,
    CATEGORY_ID_NOT_ALLOWED_EMPTY: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_NOT_ALLOWED_EMPTY,
    CATEGORY_ID_MUST_BE_ARRAY: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_MUST_BE_ARRAY,
    CATEGORY_ID_ELEMENTS_MUST_BE_POSITIVE_NUMBERS:
      TOAST_MESSAGES.PRODUCT.CATEGORY_ID_ELEMENTS_MUST_BE_POSITIVE_NUMBERS,
    CATEGORY_ID_MUST_NOT_BE_EMPTY: TOAST_MESSAGES.PRODUCT.CATEGORY_ID_MUST_NOT_BE_EMPTY,
    IS_SAMPLE_IS_REQUIRED: TOAST_MESSAGES.PRODUCT.IS_SAMPLE_IS_REQUIRED,
    IS_SAMPLE_MUST_BE_BOOLEAN: TOAST_MESSAGES.PRODUCT.IS_SAMPLE_MUST_BE_BOOLEAN,
    SAMPLE_QUANTITY_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE:
      TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE,
    SAMPLE_QUANTITY_MUST_BE_NUMBER: TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_MUST_BE_NUMBER,
    SAMPLE_QUANTITY_MUST_BE_POSITIVE: TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_MUST_BE_POSITIVE,
    SAMPLE_QUANTITY_MINIMUM_IS_1: TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_MINIMUM_IS_1,
    SAMPLE_QUANTITY_MAXIMUM_IS_10: TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_MAXIMUM_IS_10,
    SAMPLE_QUANTITY_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE:
      TOAST_MESSAGES.PRODUCT.SAMPLE_QUANTITY_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE,
    MEASUREMENT_ID_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE:
      TOAST_MESSAGES.PRODUCT.MEASUREMENT_ID_IS_REQUIRED_WHEN_IS_SAMPLE_IS_TRUE,
    MEASUREMENT_ID_MUST_BE_NUMBER: TOAST_MESSAGES.PRODUCT.MEASUREMENT_ID_MUST_BE_NUMBER,
    MEASUREMENT_ID_MUST_BE_INTEGER: TOAST_MESSAGES.PRODUCT.MEASUREMENT_ID_MUST_BE_INTEGER,
    MEASUREMENT_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.PRODUCT.MEASUREMENT_ID_MUST_BE_POSITIVE,
    MEASUREMENT_ID_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE:
      TOAST_MESSAGES.PRODUCT.MEASUREMENT_ID_NOT_ALLOWED_WHEN_IS_SAMPLE_IS_FALSE,
    IMAGE_URL_MUST_BE_VALID: TOAST_MESSAGES.PRODUCT.IMAGE_URL_MUST_BE_VALID,
    IMAGE_MUST_BE_STRING: TOAST_MESSAGES.PRODUCT.IMAGE_MUST_BE_STRING,
    IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS:
      TOAST_MESSAGES.PRODUCT.IMAGES_MUST_BE_AN_ARRAY_OF_URL_STRINGS,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show product error toast
export const showProductErrorToast = (errorCode: string) => {
  const message = handleProductError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

export const handleMasterBagError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    MASTER_BAG_CAP_MUST_BE_ARRAY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_CAP_MUST_BE_ARRAY,
    MASTER_BAG_CAP_CANNOT_BE_EMPTY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_CAP_CANNOT_BE_EMPTY,
    STRIP_TEST_MUST_BE_ARRAY: TOAST_MESSAGES.MASTER_BAG.STRIP_TEST_MUST_BE_ARRAY,
    STRIP_TEST_CANNOT_BE_EMPTY: TOAST_MESSAGES.MASTER_BAG.STRIP_TEST_CANNOT_BE_EMPTY,
    STRIP_TEST_IS_REQUIRED: TOAST_MESSAGES.MASTER_BAG.STRIP_TEST_IS_REQUIRED,
    INVALID_STRIP_TEST_VALUE: TOAST_MESSAGES.MASTER_BAG.INVALID_STRIP_TEST_VALUE,
    STRIP_TEST_MUST_BE_STRING: TOAST_MESSAGES.MASTER_BAG.STRIP_TEST_MUST_BE_STRING,
    MASTER_BAG_CAP_IS_REQUIRED: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_CAP_IS_REQUIRED,
    INVALID_MASTER_BAG_CAP_VALUE: TOAST_MESSAGES.MASTER_BAG.INVALID_MASTER_BAG_CAP_VALUE,
    MASTER_BAG_CAP_MUST_BE_STRING: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_CAP_MUST_BE_STRING,
    PHOTO_MUST_BE_STRING: TOAST_MESSAGES.MASTER_BAG.PHOTO_MUST_BE_STRING,
    PHOTOS_MUST_BE_ARRAY: TOAST_MESSAGES.MASTER_BAG.PHOTOS_MUST_BE_ARRAY,
    PHOTOS_MAX_FIVE_ALLOWED: TOAST_MESSAGES.MASTER_BAG.PHOTOS_MAX_FIVE_ALLOWED,
    PHOTOS_MIN_ONE_REQUIRED: TOAST_MESSAGES.MASTER_BAG.PHOTOS_MIN_ONE_REQUIRED,
    INVALID_PHOTO_URL: TOAST_MESSAGES.MASTER_BAG.INVALID_PHOTO_URL,
    MASTER_BAG_CREATED_SUCCESSFULLY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_CREATED_SUCCESSFULLY,
    MASTER_BAG_LIST_FETCHED_SUCCESSFULLY:
      TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_LIST_FETCHED_SUCCESSFULLY,
    MASTER_BAG_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_FETCHED_SUCCESSFULLY,
    MASTER_BAG_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_UPDATED_SUCCESSFULLY,
    MASTER_BAG_DELETED_SUCCESSFULLY: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_DELETED_SUCCESSFULLY,
    MASTER_BAG_NOT_FOUND: TOAST_MESSAGES.MASTER_BAG.MASTER_BAG_NOT_FOUND,
    DAILY_VISIT_ALREADY_LINKED_WITH_MASTER_BAG:
      TOAST_MESSAGES.MASTER_BAG.DAILY_VISIT_ALREADY_LINKED_WITH_MASTER_BAG,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show master bag error toast
export const showMasterBagErrorToast = (errorCode: string) => {
  const message = handleMasterBagError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

export const handleDailyVisitError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    DAILY_VISIT_ID_MUST_BE_NUMBER: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_ID_MUST_BE_NUMBER,
    DAILY_VISIT_ID_MUST_BE_INTEGER: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_ID_MUST_BE_INTEGER,
    DAILY_VISIT_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_ID_MUST_BE_POSITIVE,
    NOTES_SUMMARY_MUST_BE_STRING: TOAST_MESSAGES.DAILY_VISIT.NOTES_SUMMARY_MUST_BE_STRING,
    NOTES_SUMMARY_MAX_250_CHARACTERS: TOAST_MESSAGES.DAILY_VISIT.NOTES_SUMMARY_MAX_250_CHARACTERS,
    INVALID_PURPOSE_TYPE_VALUE: TOAST_MESSAGES.DAILY_VISIT.INVALID_PURPOSE_TYPE_VALUE,
    COMPANY_ID_IS_REQUIRED: TOAST_MESSAGES.DAILY_VISIT.COMPANY_ID_IS_REQUIRED,
    COMPANY_ID_MUST_BE_NUMBER: TOAST_MESSAGES.DAILY_VISIT.COMPANY_ID_MUST_BE_NUMBER,
    COMPANY_ID_MUST_BE_INTEGER: TOAST_MESSAGES.DAILY_VISIT.COMPANY_ID_MUST_BE_INTEGER,
    COMPANY_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.DAILY_VISIT.COMPANY_ID_MUST_BE_POSITIVE,
    PURPOSE_TYPE_IS_REQUIRED: TOAST_MESSAGES.DAILY_VISIT.PURPOSE_TYPE_IS_REQUIRED,
    PURPOSE_TYPE_MUST_BE_STRING: TOAST_MESSAGES.DAILY_VISIT.PURPOSE_TYPE_MUST_BE_STRING,
    PURPOSE_TYPE_MUST_BE_ARRAY: TOAST_MESSAGES.DAILY_VISIT.PURPOSE_TYPE_MUST_BE_ARRAY,
    PURPOSE_TYPE_CANNOT_BE_EMPTY: TOAST_MESSAGES.DAILY_VISIT.PURPOSE_TYPE_CANNOT_BE_EMPTY,
    INVALID_DAILY_VISIT_STATUS_VALUE: TOAST_MESSAGES.DAILY_VISIT.INVALID_DAILY_VISIT_STATUS_VALUE,
    DAILY_VISIT_STATUS_MUST_BE_STRING: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_STATUS_MUST_BE_STRING,
    DAILY_VISIT_STATUS_MUST_BE_ARRAY: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_STATUS_MUST_BE_ARRAY,
    DAILY_VISIT_STATUS_CANNOT_BE_EMPTY:
      TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_STATUS_CANNOT_BE_EMPTY,
    DAILY_VISIT_NOT_FOUND: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_NOT_FOUND,
    DAILY_VISIT_CREATED_SUCCESSFULLY: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_CREATED_SUCCESSFULLY,
    DAILY_VISIT_LIST_FETCHED_SUCCESSFULLY:
      TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_LIST_FETCHED_SUCCESSFULLY,
    DAILY_VISIT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_FETCHED_SUCCESSFULLY,
    DAILY_VISIT_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_UPDATED_SUCCESSFULLY,
    DAILY_VISIT_DELETED_SUCCESSFULLY: TOAST_MESSAGES.DAILY_VISIT.DAILY_VISIT_DELETED_SUCCESSFULLY,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show daily visit error toast
export const showDailyVisitErrorToast = (errorCode: string) => {
  const message = handleDailyVisitError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

export const handleCompetitorAnalysisError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    DAILY_VISIT_ALREADY_LINKED_WITH_COMPETITOR_ANALYSIS:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.DAILY_VISIT_ALREADY_LINKED_WITH_COMPETITOR_ANALYSIS,
    COMPETITOR_COMPANY_ID_MUST_BE_ARRAY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_MUST_BE_ARRAY,
    COMPETITOR_COMPANY_ID_CANNOT_BE_EMPTY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_CANNOT_BE_EMPTY,
    ROAD_ID_NOT_ALLOWED_WITH_COMPANY_ID:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.ROAD_ID_NOT_ALLOWED_WITH_COMPANY_ID,
    COMPANY_NAME_OR_COMPANY_ID_IS_REQUIRED:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPANY_NAME_OR_COMPANY_ID_IS_REQUIRED,
    COMPETITOR_COMPANY_ID_OR_COMPETITOR_COMPANY_NAME_IS_REQUIRED:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS
        .COMPETITOR_COMPANY_ID_OR_COMPETITOR_COMPANY_NAME_IS_REQUIRED,
    COMPETITOR_ANALYSIS_NOT_FOUND: TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_NOT_FOUND,
    COMPETITOR_ANALYSIS_CREATED_SUCCESSFULLY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_CREATED_SUCCESSFULLY,
    COMPETITOR_ANALYSIS_LIST_FETCHED_SUCCESSFULLY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_LIST_FETCHED_SUCCESSFULLY,
    COMPETITOR_ANALYSIS_FETCHED_SUCCESSFULLY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_FETCHED_SUCCESSFULLY,
    COMPETITOR_ANALYSIS_UPDATED_SUCCESSFULLY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_UPDATED_SUCCESSFULLY,
    COMPETITOR_ANALYSIS_DELETED_SUCCESSFULLY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_ANALYSIS_DELETED_SUCCESSFULLY,
    COMPETITOR_COMPANY_NAME_IS_REQUIRED:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_NAME_IS_REQUIRED,
    COMPETITOR_COMPANY_NAME_MUST_BE_STRING:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_NAME_MUST_BE_STRING,
    COMPETITOR_COMPANY_NAME_NOT_ALLOWED_EMPTY:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_NAME_NOT_ALLOWED_EMPTY,
    COMPETITOR_COMPANY_NAME_MUST_BE_AT_LEAST_2_CHARACTERS:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_NAME_MUST_BE_AT_LEAST_2_CHARACTERS,
    COMPETITOR_COMPANY_NAME_MUST_NOT_EXCEED_70_CHARACTERS:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_NAME_MUST_NOT_EXCEED_70_CHARACTERS,
    COMPETITOR_COMPANY_ID_IS_REQUIRED:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_IS_REQUIRED,
    COMPETITOR_COMPANY_ID_MUST_BE_NUMBER:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_MUST_BE_NUMBER,
    COMPETITOR_COMPANY_ID_MUST_BE_INTEGER:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_MUST_BE_INTEGER,
    COMPETITOR_COMPANY_ID_MUST_BE_POSITIVE:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.COMPETITOR_COMPANY_ID_MUST_BE_POSITIVE,
    PENDING_REASON_MUST_BE_BOOLEAN:
      TOAST_MESSAGES.COMPETITOR_ANALYSIS.PENDING_REASON_MUST_BE_BOOLEAN,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show competitor analysis error toast
export const showCompetitorAnalysisErrorToast = (errorCode: string) => {
  const message = handleCompetitorAnalysisError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

// Helper function to show task error toast
export const showTaskErrorToast = (errorCode: string) => {
  const message = handleTaskError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

// Helper function to handle concern type error messages
export const handleConcernTypeError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    CONCERN_TYPE_ALREADY_EXISTS: TOAST_MESSAGES.CONCERN_TYPE.CONCERN_TYPE_ALREADY_EXISTS,
  };

  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show concern type error toast
export const showConcernTypeErrorToast = (errorCode: string) => {
  const message = handleConcernTypeError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

// Helper function to handle staff error messages
export const handleStaffError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    STAFF_ALREADY_EXISTS: TOAST_MESSAGES.STAFF.STAFF_ALREADY_EXISTS,
    USER_DELETED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.USER_DELETED_SUCCESSFULLY,
    USER_NOT_FOUND: TOAST_MESSAGES.STAFF.USER_NOT_FOUND,
    IMAGE_UPDATE_SUCESSFULLY: TOAST_MESSAGES.STAFF.IMAGE_UPDATE_SUCESSFULLY,
    FAIL_IMAGE_UPDATE: TOAST_MESSAGES.STAFF.FAIL_IMAGE_UPDATE,
    STAFF_PIN_GENERATION_SUCCESS: TOAST_MESSAGES.STAFF.STAFF_PIN_GENERATION_SUCCESS,
    STAFF_ID_MUST_BE_ARRAY: TOAST_MESSAGES.STAFF.STAFF_ID_MUST_BE_ARRAY,
    STAFF_ID_MUST_BE_NUMBER: TOAST_MESSAGES.STAFF.STAFF_ID_MUST_BE_NUMBER,
    STAFF_ID_CANNOT_BE_EMPTY: TOAST_MESSAGES.STAFF.STAFF_ID_CANNOT_BE_EMPTY,
    STAFF_ID_MUST_BE_INTEGER: TOAST_MESSAGES.STAFF.STAFF_ID_MUST_BE_INTEGER,
    STAFF_ID_MUST_BE_POSITIVE: TOAST_MESSAGES.STAFF.STAFF_ID_MUST_BE_POSITIVE,
    STAFF_COUNT_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_COUNT_FETCHED_SUCCESSFULLY,
    STAFF_STATISTICS_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_STATISTICS_FETCHED_SUCCESSFULLY,
    STAFF_NOT_FOUND: TOAST_MESSAGES.STAFF.STAFF_NOT_FOUND,
    STAFF_CREATED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_CREATED_SUCCESSFULLY,
    STAFF_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_UPDATED_SUCCESSFULLY,
    STAFF_DELETED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_DELETED_SUCCESSFULLY,
    STAFF_STATUS_UPDATED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_STATUS_UPDATED_SUCCESSFULLY,
    STAFF_LIST_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_LIST_FETCHED_SUCCESSFULLY,
    STAFF_FETCHED_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_FETCHED_SUCCESSFULLY,
    STAFF_PIN_RESET_SUCCESSFULLY: TOAST_MESSAGES.STAFF.STAFF_PIN_RESET_SUCCESSFULLY,
    PROFILE_IMAGE_MUST_BE_VALID_URL: TOAST_MESSAGES.STAFF.PROFILE_IMAGE_MUST_BE_VALID_URL,
    PROFILE_IMAGE_MUST_BE_STRING: TOAST_MESSAGES.STAFF.PROFILE_IMAGE_MUST_BE_STRING,
    STAFF_ID_NOT_FOUND: TOAST_MESSAGES.STAFF.STAFF_ID_NOT_FOUND,
    FAILED_TO_GET_PIN_INFORMATION: TOAST_MESSAGES.STAFF.FAILED_TO_GET_PIN_INFORMATION,
    FAILED_TO_RESET_PIN: TOAST_MESSAGES.STAFF.FAILED_TO_RESET_PIN,
    FAILED_TO_RESET_PIN_TRY_AGAIN: TOAST_MESSAGES.STAFF.FAILED_TO_RESET_PIN_TRY_AGAIN,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show staff error toast
export const showStaffErrorToast = (errorCode: string) => {
  const message = handleStaffError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};

// Helper function to handle comment error messages
export const handleCommentError = (errorCode: string) => {
  const errorMessageMap: Record<string, string> = {
    COMMENT_CREATED_SUCCESSFULLY: TOAST_MESSAGES.COMMENT.COMMENT_CREATED_SUCCESSFULLY,
  };
  return errorMessageMap[errorCode] || TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
};

// Helper function to show comment error toast
export const showCommentErrorToast = (errorCode: string) => {
  const message = handleCommentError(errorCode);
  showToast(TOAST_TYPE.ERROR, message);
};
