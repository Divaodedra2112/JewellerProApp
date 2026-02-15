import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../../../types/navigation';
import {resendOTP, submitOtp} from './otpActions';
import {styles} from './styles';
import {AppOTPInput} from '../../../components/AppOTPInput/AppOTPInput';
import {AppButton, AppImage} from '../../../components';
import {Images} from '../../../utils';
import CustomHeader from '../../../components/CustomHeader/Header';
import {showToast, TOAST_TYPE, TOAST_MESSAGES} from '../../../utils/toast';
import {RootState} from '../../../store';
import {AppText, TEXT_VARIANTS} from '../../../components/AppText/AppText';
import { checkNotificationPermissionStatus, showPermissionDeniedAlert, openAppSettings, requestNotificationPermission } from '../../../utils/permissionModule';
import notifee, { AndroidImportance } from '@notifee/react-native';
import api from '../../../services/api';

type OTPScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

const OTP = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const {phoneNumber} = route.params;

  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [autoFocusOnClear, setAutoFocusOnClear] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const dispatch = useDispatch();
  const {loading, token} = useSelector((state: RootState) => state.auth);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => { }, [token]);

  // Auto-clear error message after 2 seconds
  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        setError('');
      }, 2000); // Clear after 2 seconds

      return () => clearTimeout(errorTimer);
    }
  }, [error]);

  const handleVerify = useCallback(async () => {
    if (verifying || loading || timer > 0) {
      return;
    }
    setVerifying(true);
    if (otp.length < 4) {
      setError(TOAST_MESSAGES.AUTH.OTP_REQUIRED);
      setVerifying(false);
      return;
    }

    try {
      const result = await dispatch(submitOtp({phoneNumber, otp}));

      if (submitOtp.fulfilled.match(result)) {
        // Reset failed attempts on successful verification
        setFailedAttempts(0);
        // FCM registration logic after PIN verification
        const {userId} = result.payload;
        const granted = await requestNotificationPermission();

        // If permission was denied, check if it's blocked and show alert
        if (!granted) {
          const notificationStatus = await checkNotificationPermissionStatus();
          if (notificationStatus.status === 'blocked') {
            // Show alert with option to open settings (delay slightly to avoid interrupting OTP flow)
            setTimeout(() => {
              showPermissionDeniedAlert('notification', openAppSettings);
            }, 1500);
          } else {
            // First denial - show simple alert
            setTimeout(() => {
              showPermissionDeniedAlert('notification', openAppSettings);
            }, 1500);
          }
        }

        if (granted) {
          // Setup notification channel for Android
          if (Platform.OS === 'android') {
            try {
              await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,
                sound: 'default',
                vibration: true,
                lights: true,
              });
              // Notification channel created
            } catch (e) {
              // Error creating notification channel
            }
          }
          // Note: FCM token functionality removed - add your notification service here if needed
          // Notification permission granted successfully
        }
        // Fetch unread notification count after login
        try {
          const {getNotifications} = await import('../../notification/notificationService');
          const {setUnreadCount} = await import('../../../store/slices/notificationSlice');
          const notificationResult = await getNotifications();
          dispatch(setUnreadCount(notificationResult.unreadCount));
        } catch (e) {
          // Failed to fetch unread notification count
        }
      } else if (submitOtp.rejected.match(result)) {
        const payload = result.payload as string;
        let errorMessage: string = TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;

        if (payload === 'PIN_INVALID' || payload === 'INVALID_OTP' || payload === 'INCORRECT_OTP') {
          errorMessage = TOAST_MESSAGES.AUTH.PIN_INVALID;
          // Increment failed attempts for invalid PIN
          const newFailedAttempts = failedAttempts + 1;
          setFailedAttempts(newFailedAttempts);

          // If 3 failed attempts reached, start the timer
          if (newFailedAttempts >= 3) {
            setTimer(60);
          }
        } else if (payload === 'OTP_EXPIRED') {
          errorMessage = TOAST_MESSAGES.AUTH.OTP_EXPIRED;
        } else if (payload === 'TOO_MANY_ATTEMPTS' || payload === 'PIN_THROTTLED') {
          errorMessage = TOAST_MESSAGES.AUTH.TOO_MANY_ATTEMPTS;
          // Start timer when backend returns TOO_MANY_ATTEMPTS
          setTimer(60);
        } else if (payload === 'PIN_NOT_SET') {
          errorMessage = TOAST_MESSAGES.AUTH.PIN_NOT_SET;
        } else if (payload === 'OTP_TOKEN_REQUIRED') {
          errorMessage = TOAST_MESSAGES.AUTH.OTP_TOKEN_REQUIRED;
        } else if (payload === 'INVALID_OTP_TOKEN') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_OTP_TOKEN;
        } else if (payload === 'UNAUTHORIZED_DEVICE') {
          errorMessage = TOAST_MESSAGES.AUTH.UNAUTHORIZED_DEVICE;
        }

        setError(errorMessage);
        // PIN verification failed

        // Clear PIN input, dismiss keyboard, don't auto-focus
        setAutoFocusOnClear(false);
        setOTP('');
        Keyboard.dismiss();
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.code === 'NETWORK_ERROR'
          ? TOAST_MESSAGES.GENERIC.NETWORK_ERROR
          : TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;
      setError(errorMessage);
      // Exception during PIN verification
    } finally {
      setVerifying(false);
    }
  }, [verifying, loading, otp, phoneNumber, dispatch, timer, failedAttempts]);

  useEffect(() => {
    if (otp.length === 4) {
      handleVerify();
    }
  }, [otp, handleVerify]);

  const handleResend = async () => {
    if (timer > 0) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_MIN);
      return;
    }

    try {
      // Dismiss keyboard first
      Keyboard.dismiss();

      setTimer(60); // Reset timer to 60 seconds
      setFailedAttempts(0); // Reset failed attempts when resending PIN
      setError('');
      setAutoFocusOnClear(true);
      setOTP('');

      const result = await dispatch(resendOTP(phoneNumber));
      if (resendOTP.fulfilled.match(result)) {
        // PIN resent successfully - no toast message needed
        // Enable auto-focus after keyboard dismissal
        setTimeout(() => {
          setAutoFocusOnClear(true);
        }, 200);
      } else if (resendOTP.rejected.match(result)) {
        const payload = result.payload as string;
        let errorMessage: string = TOAST_MESSAGES.AUTH.OTP_RESEND_FAILED;

        if (payload === 'WAIT_OTP_ONE_MIN') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_MIN;
        } else if (payload === 'WAIT_OTP_ONE_HOUR') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_HOUR;
        } else if (payload === 'WAIT_BEFORE_RESEND_OTP') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_BEFORE_RESEND_OTP;
        } else if (payload === 'MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED') {
          errorMessage = TOAST_MESSAGES.AUTH.MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED;
        } else if (payload === 'MOBILE_NOT_FOUND' || payload === 'MOBILE_NOT_REGISTERED') {
          errorMessage = TOAST_MESSAGES.AUTH.MOBILE_NOT_REGISTERED;
        } else if (payload === 'UNAUTHORIZED_DEVICE') {
          errorMessage = TOAST_MESSAGES.AUTH.UNAUTHORIZED_DEVICE;
        }

        // Only show toast, don't set error state (timer should keep showing)
        showToast(TOAST_TYPE.ERROR, errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.code === 'NETWORK_ERROR'
          ? TOAST_MESSAGES.GENERIC.NETWORK_ERROR
          : TOAST_MESSAGES.AUTH.OTP_RESEND_FAILED;
      // Only show toast for resend errors, don't affect input state
      showToast(TOAST_TYPE.ERROR, errorMessage);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Reset failed attempts when timer expires
            setFailedAttempts(0);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <ImageBackground
          source={Images.APP_BACKGROUND}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerView}>
              <CustomHeader title="PIN" />
            </View>

            <View style={styles.header}>
              <AppImage image={Images.OTP} mainStyle={styles.image} from="local" />
              <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
                PIN Verification
              </AppText>
              <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.subtitle}>
                Please enter your PIN to verify your account and continue
              </AppText>
            </View>

            <View style={styles.otpContainer}>
              <AppOTPInput
                length={4}
                value={otp}
                autoFocusOnClear={autoFocusOnClear}
                onChange={val => {
                  setOTP(val);
                  if (error) {
                    setError('');
                  }
                  // Re-enable auto-focus when user manually starts typing
                  if (!autoFocusOnClear && val.length > 0) {
                    setAutoFocusOnClear(true);
                  }
                }}
              />
            </View>

            {timer > 0 && (
              <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.subtitle2}>
                Too many failed attempts, {'\n'} Please wait {formatTime(timer)} sec before trying again.
              </AppText>
            )}

            {error ? (
              <View style={styles.errorBox}>
                <AppText variant={TEXT_VARIANTS.h4_small} style={styles.errorText}>
                  {error}
                </AppText>
              </View>
            ) : null}

            <Layout style={styles.buttonContainer}>
              <AppButton onPress={handleVerify} loading={verifying} disabled={otp.length < 4 || timer > 0}>
                Verify
              </AppButton>
            </Layout>



            <View style={styles.resendContainer}>
              <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.subtitle2}>
                Forgot PIN?{'\n'}Please contact your administrator.
              </AppText>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTP;
