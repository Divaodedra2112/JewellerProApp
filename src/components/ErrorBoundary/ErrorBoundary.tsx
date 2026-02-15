import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppText, AppButton } from '../index';
import { colors } from '../../utils/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Log to crash reporting service (e.g., Sentry, Crashlytics)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.errorContainer}>
              <AppText style={styles.title}>Oops! Something went wrong</AppText>
              <AppText style={styles.message}>
                We're sorry for the inconvenience. The app encountered an unexpected error.
              </AppText>

              {__DEV__ && this.state.error && (
                <View style={styles.errorDetails}>
                  <AppText style={styles.errorTitle}>Error Details:</AppText>
                  <AppText style={styles.errorText}>
                    {this.state.error.toString()}
                  </AppText>
                  {this.state.errorInfo && (
                    <AppText style={styles.errorStack}>
                      {this.state.errorInfo.componentStack}
                    </AppText>
                  )}
                </View>
              )}

              <View style={styles.buttonContainer}>
                <AppButton onPress={this.handleReset} style={styles.button}>
                  Try Again
                </AppButton>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorDetails: {
    width: '100%',
    backgroundColor: colors.gray100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  errorStack: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    width: '100%',
  },
});

export default ErrorBoundary;

