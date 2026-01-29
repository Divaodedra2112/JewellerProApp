import { Linking, Platform, Clipboard } from 'react-native';
import { useSelector } from 'react-redux';
import { showToast, TOAST_TYPE } from './toast';
import { NOT_STARTED_STATUS_NAME, CREATED_STATUS_NAME, NOT_PRIORITY__NAME } from './Const';

export const openDialer = (phoneNumber: string) => {
  // Remove any non-numeric characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  // Format number based on platform
  let formattedNumber = cleanNumber;
  if (Platform.OS === 'ios') {
    // iOS requires the number to be in international format
    formattedNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  }

  Linking.openURL(`tel:${formattedNumber}`);
};

export const copyToClipboard = (text: string) => {
  try {
    Clipboard.setString(text);
    showToast(TOAST_TYPE.SUCCESS, `Copied to clipboard: ${text}`);
  } catch (error) {
    showToast(TOAST_TYPE.ERROR, 'Failed to copy to clipboard');
  }
};

export const getFullAddress = (...parts: (string | null | undefined)[]): string => {
  return parts
    .filter((part): part is string => !!part?.trim()) // Filters out undefined, null, and empty/whitespace-only strings
    .join(', ');
};

//Get company name function
export const getCompanyName = (CustomerProfileDetail: any): string | null => {
  const company = CustomerProfileDetail?.company;
  // Handle both array and object formats
  if (Array.isArray(company)) {
    return company[0]?.name || null;
  } else if (company && typeof company === 'object') {
    return company.name || null;
  }
  return null;
};

// truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) {
    return '';
  }
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getCurrentDate = (): string => {
  const today = new Date();
  today.setHours(14, 30, 0, 0);
  return today.toISOString();
};

export const formatDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string') {
    return '';
  }

  const date = new Date(dateString);

  // Check if date is valid
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Formats a date string to YYYY-MM-DD format for API requests
 * Handles ISO date strings, Date objects, and already formatted dates
 * @param dateString - Date string in any format or null/undefined
 * @returns Formatted date string in YYYY-MM-DD format or null if invalid
 */
export const formatDateToYYYYMMDD = (dateString: string | null | undefined): string | null => {
  if (!dateString) {
    return null;
  }

  try {
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // If it's an ISO date string or other format, extract just the date part
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }

    // Use toISOString and split to get YYYY-MM-DD format
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date to YYYY-MM-DD:', error);
    return null;
  }
};

/**
 * Formats a timestamp like WhatsApp:
 * - Today: shows time (e.g., 9:51 AM)
 * - Yesterday: shows 'Yesterday'
 * - This week: shows weekday (e.g., Monday)
 * - Older: shows date (e.g., 15/06/24)
 */
export function formatChatTimestamp(dateInput: Date | number | string | undefined): string {
  if (!dateInput) {
    return '';
  }
  const now = new Date();
  let date: Date;

  if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    date = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return '';
  }

  // Check if date is valid
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isYesterday) {
    return 'Yesterday';
  }

  // This week (not today/yesterday)
  const daysAgo = Math.floor(
    (now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
  );
  if (daysAgo < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Older: show date as DD/MM/YY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

// Task Priority
export function getFirstTaskPriority(taskTypes: any[]): any {
  // Find Concern task type by code or by index
  const concernType = taskTypes?.find(type => type.code === 'concern') || taskTypes?.[0];
  return concernType?.priority;
}

// Task Status
export function getFirstTaskStatus(taskTypes: any[]): any {
  // Find Concern task type by code or by index
  const concernType = taskTypes?.find(type => type.code === 'concern') || taskTypes?.[0];
  return concernType?.status;
}

// Task Priority
export function getSampleRequestPriority(taskTypes: any[]): any {
  // Find Sample Request task type by code or by index
  const sampleRequestType =
    taskTypes?.find(type => type.code === 'sample-request') || taskTypes?.[1];
  return sampleRequestType?.priority;
}

// Task Status
export function getSampleRequestStatus(taskTypes: any[]): any {
  // Find Sample Request task type by code or by index
  const sampleRequestType =
    taskTypes?.find(type => type.code === 'sample-request') || taskTypes?.[1];
  return sampleRequestType?.status;
}

// Get default status ID for a specific task type
export function getDefaultStatusId(taskTypes: any[], taskTypeCode: string): number | null {
  const taskType = taskTypes?.find(type => type.code === taskTypeCode);
  if (taskType?.status && taskType.status.length > 0) {
    // Look for "Not Started" status first
    const notStartedStatus = taskType.status.find(
      (status: any) => status.name === NOT_STARTED_STATUS_NAME
    );
    if (notStartedStatus) {
      return notStartedStatus.id;
    }

    // Fallback to first status ID (lowest sortOrder) if "Not Started" not found
    const sortedStatuses = taskType.status.sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    return sortedStatuses[0]?.id || null;
  }
  return null;
}

// Get default status ID for Concern specifically (looks for "Not Started" status)
export function getConcernDefaultStatusId(taskTypes: any[]): number | null {
  const concernType = taskTypes?.[0]; // Direct access to type[0] - Concern
  if (concernType?.status && concernType.status.length > 0) {
    // Look for "Not Started" status first
    const notStartedStatus = concernType.status.find(
      (status: any) => status.name === NOT_STARTED_STATUS_NAME
    );
    if (notStartedStatus) {
      return notStartedStatus.id;
    }

    // Fallback to first status ID (lowest sortOrder) if "Not Started" not found
    const sortedStatuses = concernType.status.sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    return sortedStatuses[0]?.id || null;
  }
  return null;
}

// Get default status ID for Sample Request specifically (looks for "Created" status)
export function getSampleRequestDefaultStatusId(taskTypes: any[]): number | null {
  const sampleRequestType = taskTypes?.[1]; // Direct access to type[1] - Sample Request
  if (sampleRequestType?.status && sampleRequestType.status.length > 0) {
    // Look for "Created" status first
    const createdStatus = sampleRequestType.status.find(
      (status: any) => status.name === CREATED_STATUS_NAME
    );
    if (createdStatus) {
      return createdStatus.id;
    }

    // Fallback to first status ID (lowest sortOrder) if "Created" not found
    const sortedStatuses = sampleRequestType.status.sort(
      (a: any, b: any) => a.sortOrder - b.sortOrder
    );
    return sortedStatuses[0]?.id || null;
  }
  return null;
}

// Get default priority ID for Concern specifically (looks for "Low" priority)
export function getConcernDefaultPriorityId(taskTypes: any[]): number | null {
  const concernType = taskTypes?.[0]; // Direct access to type[0] - Concern
  if (concernType?.priority && concernType.priority.length > 0) {
    // Look for "Low" priority first
    const lowPriority = concernType.priority.find(
      (priority: any) => priority.name === NOT_PRIORITY__NAME
    );
    if (lowPriority) {
      return lowPriority.id;
    }

    // Fallback to first priority ID (lowest sortOrder) if "Low" not found
    const sortedPriorities = concernType.priority.sort(
      (a: any, b: any) => a.sortOrder - b.sortOrder
    );
    return sortedPriorities[0]?.id || null;
  }
  return null;
}

/**
 * Determines which statuses are "backward" (should not be selectable) based on current status
 * @param currentStatusId - The current status ID of the task/concern
 * @param allStatuses - Array of all available statuses
 * @returns Array of status IDs that are considered "backward" and should be disabled
 */
export function getBackwardStatusIds(currentStatusId: number, allStatuses: any[]): number[] {
  if (!currentStatusId || !allStatuses || allStatuses.length === 0) {
    return [];
  }

  // Find current status
  const currentStatus = allStatuses.find(status => status.id === currentStatusId);
  if (!currentStatus) {
    return [];
  }

  // Sort all statuses by sortOrder to determine the flow
  const sortedStatuses = [...allStatuses].sort((a, b) => a.sortOrder - b.sortOrder);

  // Find current status index in the sorted array
  const currentIndex = sortedStatuses.findIndex(status => status.id === currentStatusId);

  if (currentIndex === -1) {
    return [];
  }

  // All statuses before the current status in the flow are considered "backward"
  const backwardStatuses = sortedStatuses.slice(0, currentIndex);

  return backwardStatuses.map(status => status.id);
}

/**
 * Filters out backward statuses from the available status list
 * @param currentStatusId - The current status ID of the task/concern
 * @param allStatuses - Array of all available statuses
 * @returns Array of statuses that are forward or equal to current status
 */
export function getForwardStatuses(currentStatusId: number, allStatuses: any[]): any[] {
  if (!currentStatusId || !allStatuses || allStatuses.length === 0) {
    return allStatuses;
  }

  const backwardStatusIds = getBackwardStatusIds(currentStatusId, allStatuses);

  // Filter out backward statuses
  return allStatuses.filter(status => !backwardStatusIds.includes(status.id));
}

/**
 * Formats a number using Indian units:
 * 1,000 = 1k
 * 1,00,000 = 1L
 * 1,00,00,000 = 1Cr
 *
 * @param value The number to format
 * @returns Formatted string with unit
 */
export function formatNumberIndian(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  if (isNaN(num)) {
    return '';
  }
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 2).replace(/\.00$/, '')}Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 2).replace(/\.00$/, '')}L`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 2).replace(/\.00$/, '')}k`;
  } else {
    return num.toString();
  }
}

/**
 * Extracts a unique list of companies from a list of customers.
 * @param customerList Array of customers, each possibly with a 'company' array
 * @returns Array of unique companies (by id)
 */
export function getUniqueCompaniesFromCustomers(customerList: any[]): any[] {
  return customerList
    .flatMap(customer => customer.company || [])
    .filter((company, index, self) => index === self.findIndex(c => c.id === company.id));
}

// Return device IOS Date
export const getDeviceTime = () => new Date().toISOString();

/**
 * Formats the statistics for a StatCard, returning count, sign, and title.
 * Returns 0 for invalid count, and "+" if the count is positive.
 */
export const getStatCardProps = (stat: { count?: number } | undefined, title: string) => ({
  number: stat && typeof stat.count === 'number' ? stat.count : 0,
  sign: stat && typeof stat.count === 'number' && stat.count > 0 ? '+' : '',
  title,
});

/**
 * Formats the statistics for a StatCard with a 999+ cap.
 * If count is greater than 999, returns 999 with "+" sign, otherwise returns the actual count.
 * Returns 0 for invalid count.
 */
export const getStatCardPropsWithCap = (stat: { count?: number } | undefined, title: string) => {
  const count = stat && typeof stat.count === 'number' ? stat.count : 0;
  const number = count > 999 ? 999 : count;
  const sign = count > 999 ? '+' : '';
  return { number, sign, title };
};

/**
 * Formats a date into relative time (e.g., "Now", "5m ago", "3h ago", "2d ago").
 * Falls back to formatted date if older than 7 days.
 */
export const formatRelativeTime = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string') {
    return '';
  }

  const now = new Date();
  const date = new Date(dateString);

  // Check if date is valid
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) {
    return 'Now';
  }
  if (diffMin < 60) {
    return `${diffMin}m ago`;
  }
  if (diffHr < 24) {
    return `${diffHr}h ago`;
  }
  if (diffDay < 7) {
    return `${diffDay}d ago`;
  }

  return date.toLocaleDateString();
};

/**
 * Filters the product list based on gradeId and categoryId
 * @param gradeId The grade ID to match
 * @param categoryId The category ID to match
 * @param productList The list of products to filter
 * @returns The filtered product list
 */
export function filterProductsByGradeAndCategory(
  gradeId: number,
  categoryId: number,
  productList: any[]
): any[] {
  return productList.filter(product => {
    // Check if both category and grade match the selected values
    const isCategoryMatch = product.category?.id === categoryId;
    const isGradeMatch = product.grades?.some((grade: any) => grade.id === gradeId);

    // Only include the product if both the category and grade match
    return isCategoryMatch && isGradeMatch;
  });
}

/**
 * Simple function to get concern task type ID directly from Redux
 * Just call: const concernTypeId = useConcernTypeId();
 * @returns The ID of the concern task type, or null if not found
 */
export const useConcernTypeId = (): number | null => {
  const taskTypes = useSelector((state: any) => state.statusAndPriority?.taskTypes || []);
  const concernType = taskTypes.find((type: any) => type.code === 'concern');
  return concernType?.id || null;
};

/**
 * Simple function to get sample request task type ID directly from Redux
 * Just call: const sampleRequestTypeId = useSampleRequestTypeId();
 * @returns The ID of the sample request task type, or null if not found
 */
export const useSampleRequestTypeId = (): number | null => {
  const taskTypes = useSelector((state: any) => state.statusAndPriority?.taskTypes || []);
  const sampleRequestType = taskTypes.find((type: any) => type.code === 'sample-request');
  return sampleRequestType?.id || null;
};

export const getFirstLaterCapitalize = (text: string | undefined): string => {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formats text by capitalizing first letter and replacing underscores with spaces
 * @param text The text to format (e.g., "NOT_FOLLOW", "FOLLOW", "YES_RARELY")
 * @returns Formatted text (e.g., "Not Follow", "Follow", "Yes Rarely")
 */
export const formatTextWithCapitalize = (text: string | undefined): string => {
  if (!text) {
    return '';
  }
  // Replace underscores with spaces, then split by spaces
  const words = text.replace(/_/g, ' ').split(' ');
  // Capitalize first letter of each word and lowercase the rest
  const formattedWords = words.map(word => {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  // Join words with spaces
  return formattedWords.join(' ');
};
