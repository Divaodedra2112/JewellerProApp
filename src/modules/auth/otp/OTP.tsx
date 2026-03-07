import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../../types/navigation';
import { resendOTP, submitOtp } from './otpActions';
import { styles } from './styles';
import { AppOTPInput } from '../../../components/AppOTPInput/AppOTPInput';
import { AppButton, AppImage } from '../../../components';
import { Images } from '../../../utils';
import { showToast, TOAST_TYPE, TOAST_MESSAGES, getAuthErrorMessage } from '../../../utils/toast';
import { RootState } from '../../../store';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { checkNotificationPermissionStatus, showPermissionDeniedAlert, openAppSettings, requestNotificationPermission } from '../../../utils/permissionModule';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { BackIconHeader } from '../../../assets/icons/svgIcons/appSVGIcons';
import { ArrowRightIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../../utils/CommonStyles';
import { scale, verticalScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';

const LOGIN_LOGO = require('../../../assets/images/JP-Logo.png');

type OTPScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

const OTP_ERROR_MESSAGE = 'Incorrect Code! Please try again!';
const RESEND_COOLDOWN_SECONDS = 30;

const DEFAULT_COUNTRY_CODE = '91';

const OTP = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const { phoneNumber, countryCode: paramCountryCode } = route.params;
  const countryCode = paramCountryCode || DEFAULT_COUNTRY_CODE;

  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [autoFocusOnClear, setAutoFocusOnClear] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [verifying, setVerifying] = useState(false);
  const lastSubmittedOtpRef = useRef<string>('');

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleVerify = useCallback(async () => {
    if (verifying || loading) return;
    if (otp.length < 4) {
      setError(OTP_ERROR_MESSAGE);
      return;
    }

    setVerifying(true);
    try {
      const result = await dispatch(submitOtp({ countryCode, mobileNumber: phoneNumber, otp }));

      if (submitOtp.fulfilled.match(result)) {
        setFailedAttempts(0);
        const granted = await requestNotificationPermission();
        if (!granted) {
          const notificationStatus = await checkNotificationPermissionStatus();
          if (notificationStatus.status === 'blocked') {
            setTimeout(() => showPermissionDeniedAlert('notification', openAppSettings), 1500);
          } else {
            setTimeout(() => showPermissionDeniedAlert('notification', openAppSettings), 1500);
          }
        }
        if (granted && Platform.OS === 'android') {
          try {
            await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
              importance: AndroidImportance.HIGH,
              sound: 'default',
              vibration: true,
              lights: true,
            });
          } catch (_) {}
        }
        try {
          const { getNotifications } = await import('../../notification/notificationService');
          const { setUnreadCount } = await import('../../../store/slices/notificationSlice');
          const notificationResult = await getNotifications();
          dispatch(setUnreadCount(notificationResult.unreadCount));
        } catch (_) {}
      } else if (submitOtp.rejected.match(result)) {
        const payload = result.payload as { code?: string; message?: string } | string;
        const code = typeof payload === 'object' && payload?.code ? payload.code : (payload as string);
        const serverMessage = typeof payload === 'object' ? payload?.message : undefined;
        const errorMessage = getAuthErrorMessage(code, serverMessage);

        setError(errorMessage);
        setFailedAttempts(prev => prev + 1);
        if (code === 'OTP_MAX_ATTEMPTS' || failedAttempts + 1 >= 3) {
          setResendTimer(RESEND_COOLDOWN_SECONDS);
        }
        setAutoFocusOnClear(true);
        setOTP('');
        Keyboard.dismiss();
      }
    } catch (err: any) {
      setError(OTP_ERROR_MESSAGE);
    } finally {
      setVerifying(false);
    }
  }, [verifying, loading, otp, phoneNumber, countryCode, dispatch, failedAttempts]);

  // Auto-submit only once per OTP value to prevent duplicate API calls
  useEffect(() => {
    if (otp.length === 4 && otp !== lastSubmittedOtpRef.current) {
      lastSubmittedOtpRef.current = otp;
      handleVerify();
    }
    if (otp.length < 4) {
      lastSubmittedOtpRef.current = '';
    }
  }, [otp, handleVerify]);

  const handleResend = async () => {
    if (resendTimer > 0) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_MIN);
      return;
    }
    Keyboard.dismiss();
    setResendTimer(RESEND_COOLDOWN_SECONDS);
    setFailedAttempts(0);
    setError('');
    setAutoFocusOnClear(true);
    setOTP('');

    try {
      const result = await dispatch(resendOTP({ countryCode, mobileNumber: phoneNumber }));
      if (resendOTP.fulfilled.match(result)) {
        setTimeout(() => setAutoFocusOnClear(true), 200);
      } else if (resendOTP.rejected.match(result)) {
        const payload = result.payload as { code?: string; message?: string } | string;
        const code = typeof payload === 'object' && payload?.code ? payload.code : (payload as string);
        const serverMessage = typeof payload === 'object' ? payload?.message : undefined;
        const errorMessage = getAuthErrorMessage(code, serverMessage);
        showToast(TOAST_TYPE.ERROR, errorMessage);
        if (code === 'OTP_RATE_LIMIT' || code === 'OTP_MAX_REQUESTS_TRY_AFTER') {
          setResendTimer(RESEND_COOLDOWN_SECONDS);
        }
      }
    } catch (_) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.AUTH.OTP_RESEND_FAILED);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
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
            {/* Header: Back + OTP */}
            <View style={styles.authHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={35} style={styles.backButton}>
                <BackIconHeader width={defaultIconSizes.small} height={defaultIconSizes.small} color={colors.primary} />
              </TouchableOpacity>
              <AppText variant={TEXT_VARIANTS.h4_large} style={styles.authHeaderTitle}>
                OTP
              </AppText>
              <View style={styles.backButton} />
            </View>

            <View style={styles.header}>
              <AppImage image={LOGIN_LOGO} mainStyle={styles.logo} isDisabled from="OTP" />
              <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
                Verification Required
              </AppText>
              <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.subtitle}>
                Enter the 4-digit code sent to your mobile number
              </AppText>
            </View>

            <View style={styles.otpContainer}>
              <AppOTPInput
                length={4}
                value={otp}
                autoFocusOnClear={autoFocusOnClear}
                hasError={!!error}
                onChange={val => {
                  setOTP(val);
                  if (error) setError('');
                  if (!autoFocusOnClear && val.length > 0) setAutoFocusOnClear(true);
                }}
              />
              {otp.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    setOTP('');
                    setError('');
                    setAutoFocusOnClear(true);
                    Keyboard.dismiss();
                  }}
                  style={localStyles.clearTouch}
                  activeOpacity={0.7}
                >
                  <AppText variant={TEXT_VARIANTS.h4_small} style={localStyles.clearText}>
                    Clear & enter new code
                  </AppText>
                </TouchableOpacity>
              ) : null}
            </View>

            {error ? (
              <View style={styles.errorRow}>
                <AppText style={localStyles.errorIcon}>!</AppText>
                <AppText variant={TEXT_VARIANTS.h4_small} style={styles.errorText}>
                  {error}
                </AppText>
              </View>
            ) : null}

            <View style={styles.buttonContainer}>
              <AppButton
                onPress={handleVerify}
                loading={verifying}
                disabled={otp.length < 4}
                rightSideIcon={
                  !verifying ? (
                    <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
                  ) : undefined
                }
              >
                Sign in
              </AppButton>
            </View>

            <View style={styles.resendContainer}>
              <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.resendQuestionText}>
                {resendTimer > 0 ? `Resend code in ${formatTime(resendTimer)}` : "Didn't receive a code?"}
              </AppText>
              <TouchableOpacity
                onPress={handleResend}
                disabled={resendTimer > 0}
                style={styles.resendTouch}
                activeOpacity={0.7}
              >
                <AppText
                  variant={TEXT_VARIANTS.h3_medium}
                  style={[styles.resendLink, resendTimer > 0 && styles.resendLinkDisabled]}
                >
                  Resend Now
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  errorIcon: {
    fontSize: scale(14),
    color: colors.error,
    marginRight: scale(6),
  },
  clearTouch: {
    marginTop: verticalScale(12),
    alignSelf: 'center',
  },
  clearText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default OTP;
