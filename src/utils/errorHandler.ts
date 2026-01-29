import { logger } from './logger';

/**
 * Error Handler Utility
 * Provides centralized error handling and formatting
 */

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  data?: any;
  originalError?: Error;
}

/**
 * Create a standardized error object
 */
export const createError = (
  message: string,
  code?: string,
  statusCode?: number,
  data?: any,
  originalError?: Error
): AppError => {
  return {
    message,
    code,
    statusCode,
    data,
    originalError,
  };
};

/**
 * Handle API errors
 */
export const handleApiError = (error: any): AppError => {
  // Axios error
  if (error.response) {
    const { status, data } = error.response;
    return createError(
      data?.message || `API Error: ${status}`,
      data?.code || 'API_ERROR',
      status,
      data,
      error
    );
  }

  // Network error
  if (error.request) {
    return createError(
      'Network error. Please check your connection.',
      'NETWORK_ERROR',
      undefined,
      undefined,
      error
    );
  }

  // Other error
  return createError(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR',
    undefined,
    undefined,
    error
  );
};

/**
 * Handle general errors
 */
export const handleError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return createError(error.message, 'ERROR', undefined, undefined, error);
  }

  if (typeof error === 'string') {
    return createError(error, 'ERROR');
  }

  return createError('An unknown error occurred', 'UNKNOWN_ERROR');
};

/**
 * Format error for display to user
 */
export const formatErrorForUser = (error: AppError | Error | string): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  // AppError
  return error.message || 'An error occurred';
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: AppError): boolean => {
  return error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED';
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: AppError): boolean => {
  return error.statusCode === 401 || error.code === 'UNAUTHORIZED';
};

/**
 * Check if error is a permission error
 */
export const isPermissionError = (error: AppError): boolean => {
  return error.statusCode === 403 || error.code === 'FORBIDDEN';
};

/**
 * Log error with context
 */
export const logError = (error: AppError | Error, context?: string) => {
  const errorMessage = context ? `${context}: ${error.message}` : error.message;
  const errorObj = error instanceof Error ? error : error.originalError;

  logger.error(errorMessage, errorObj, {
    code: 'code' in error ? error.code : undefined,
    statusCode: 'statusCode' in error ? error.statusCode : undefined,
    data: 'data' in error ? error.data : undefined,
  });
};

