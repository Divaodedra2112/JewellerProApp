/**
 * Logger Utility
 * Provides structured logging with different log levels
 * TODO: Integrate with crash reporting service (Sentry, Crashlytics, etc.)
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
}

class Logger {
  private isDevelopment = __DEV__;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: this.formatTimestamp(),
      data,
      error,
    };

    // Add to history
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }

    // Console logging
    if (this.isDevelopment) {
      const logMessage = `[${level}] ${message}`;
      const logData = error ? { error, data } : data;

      switch (level) {
        case LogLevel.DEBUG:
          console.debug(logMessage, logData || '');
          break;
        case LogLevel.INFO:
          console.info(logMessage, logData || '');
          break;
        case LogLevel.WARN:
          console.warn(logMessage, logData || '');
          break;
        case LogLevel.ERROR:
          console.error(logMessage, logData || '');
          break;
      }
    } else {
      // In production, only log errors
      if (level === LogLevel.ERROR) {
        console.error(`[${level}] ${message}`, error || data || '');
        // TODO: Send to crash reporting service
        // Example: Sentry.captureException(error || new Error(message), { extra: data });
      }
    }
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error, data?: any) {
    this.log(LogLevel.ERROR, message, data, error);
  }

  /**
   * Get recent log history
   */
  getHistory(limit?: number): LogEntry[] {
    if (limit) {
      return this.logHistory.slice(-limit);
    }
    return [...this.logHistory];
  }

  /**
   * Clear log history
   */
  clearHistory() {
    this.logHistory = [];
  }

  /**
   * Log API request
   */
  logApiRequest(url: string, method: string, data?: any) {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  /**
   * Log API response
   */
  logApiResponse(url: string, status: number, data?: any) {
    if (status >= 400) {
      this.error(`API Error: ${status} ${url}`, undefined, data);
    } else {
      this.debug(`API Response: ${status} ${url}`, data);
    }
  }

  /**
   * Log navigation
   */
  logNavigation(routeName: string, params?: any) {
    this.debug(`Navigation: ${routeName}`, params);
  }

  /**
   * Log user action
   */
  logUserAction(action: string, data?: any) {
    this.info(`User Action: ${action}`, data);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, data?: any) => logger.debug(message, data);
export const logInfo = (message: string, data?: any) => logger.info(message, data);
export const logWarn = (message: string, data?: any) => logger.warn(message, data);
export const logError = (message: string, error?: Error, data?: any) =>
  logger.error(message, error, data);

