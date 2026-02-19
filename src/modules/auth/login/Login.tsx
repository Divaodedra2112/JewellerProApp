import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  Keyboard,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAppAction } from './loginActions';
import { RootState } from '../../../store';
import { styles } from './styles';
import { AppImage, SuccessOverlay, AppButton } from '../../../components';
import { Images } from '../../../utils';
import { showToast, TOAST_TYPE, TOAST_MESSAGES } from '../../../utils/toast';
import { logger } from '../../../utils/logger';
const LOGIN_LOGO = require('../../../assets/images/JP-Logo.png');
import { verticalScale, isTab, scale } from '../../../utils/Responsive';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { AppText } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from '../../../assets/icons/svgIcons/appSVGIcons';

export const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const dynamicMarginTop = isTab || isLandscape ? verticalScale(50) : verticalScale(140);

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    mobileNumber?: string;
    password?: string;
  }>({});
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const countryCode = '91'; // Fixed country code

  const handleMobileNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    // Allow up to 10 digits
    const finalNumber = numericValue.slice(0, 10);
    setMobileNumber(finalNumber);
    if (errors.mobileNumber) {
      setErrors(prev => ({ ...prev, mobileNumber: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!mobileNumber || mobileNumber.trim() === '') {
      newErrors.mobileNumber = TOAST_MESSAGES.AUTH.MOBILE_NUMBER_REQUIRED;
    } else if (mobileNumber.length !== 10) {
      newErrors.mobileNumber = TOAST_MESSAGES.AUTH.INVALID_MOBILE_NUMBER;
    }

    if (!password || password.trim() === '') {
      newErrors.password = TOAST_MESSAGES.AUTH.PASSWORD_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    logger.info('Login Screen - Login button pressed', {
      mobileNumber: mobileNumber ? `${mobileNumber.substring(0, 2)}****${mobileNumber.substring(6)}` : 'empty',
      hasPassword: !!password,
      countryCode,
    });

    if (!validateForm()) {
      // Show the first error found
      const firstError = errors.mobileNumber || errors.password;
      logger.warn('Login Screen - Form validation failed', {
        errors,
        firstError,
      });
      if (firstError) {
        showToast(TOAST_TYPE.ERROR, firstError);
      }
      return;
    }

    logger.info('Login Screen - Starting login process', {
      countryCode: countryCode.trim(),
      mobileNumberLength: mobileNumber.trim().length,
    });

    try {
      const loginPayload = {
        countryCode: countryCode.trim(),
        mobileNumber: mobileNumber.trim(),
        password: password.trim(),
      };

      logger.debug('Login Screen - Dispatching login action', {
        countryCode: loginPayload.countryCode,
        mobileNumber: loginPayload.mobileNumber,
      });

      const result = await dispatch(loginAppAction(loginPayload));

      if (loginAppAction.fulfilled.match(result)) {
        const payload = result.payload as any;
        logger.info('Login Screen - Login successful', {
          userId: payload?.userId,
          hasUser: !!payload?.user,
          userName: payload?.user?.name,
          userEmail: payload?.user?.email,
        });
        // Show success overlay
        setShowSuccessOverlay(true);
        // Navigation will be handled by the auth state change
      } else if (loginAppAction.rejected.match(result)) {
        const errorPayload = result.payload as string;
        logger.error('Login Screen - Login failed', new Error(errorPayload || 'Unknown error'), {
          errorPayload,
          errorType: typeof errorPayload,
          errorDetails: {
            payload: result.payload,
            meta: result.meta,
          },
        });
        let errorMessage: string = TOAST_MESSAGES.AUTH.LOGIN_FAILED;

        // Handle specific error codes
        if (errorPayload === 'INVALID_CREDENTIALS' || errorPayload === 'INVALID_MOBILE_NUMBER_OR_PASSWORD') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_CREDENTIALS;
          logger.warn('Login Screen - Invalid credentials', { errorPayload });
        } else if (errorPayload === 'USER_NOT_FOUND' || errorPayload === 'MOBILE_NOT_FOUND') {
          errorMessage = TOAST_MESSAGES.AUTH.USER_NOT_FOUND;
          logger.warn('Login Screen - User not found', { errorPayload });
        } else if (errorPayload === 'INVALID_PASSWORD' || errorPayload === 'WRONG_PASSWORD') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_PASSWORD;
          logger.warn('Login Screen - Invalid password', { errorPayload });
        } else if (errorPayload === 'ACCOUNT_LOCKED') {
          errorMessage = TOAST_MESSAGES.AUTH.ACCOUNT_LOCKED;
          logger.warn('Login Screen - Account locked', { errorPayload });
        } else if (errorPayload === 'ACCOUNT_SUSPENDED') {
          errorMessage = TOAST_MESSAGES.AUTH.ACCOUNT_SUSPENDED;
          logger.warn('Login Screen - Account suspended', { errorPayload });
        } else if (errorPayload === 'SESSION_EXPIRED') {
          errorMessage = TOAST_MESSAGES.AUTH.SESSION_EXPIRED;
          logger.warn('Login Screen - Session expired', { errorPayload });
        } else if (errorPayload === 'NETWORK_ERROR' || errorPayload === 'ERR_NETWORK' || errorPayload === 'Network Error') {
          errorMessage = TOAST_MESSAGES.AUTH.NETWORK_ERROR;
          logger.error('Login Screen - Network error', new Error(errorPayload), { errorPayload });
        } else if (errorPayload === 'SERVER_ERROR' || errorPayload?.includes('500')) {
          errorMessage = TOAST_MESSAGES.AUTH.SERVER_ERROR;
          logger.error('Login Screen - Server error', new Error(errorPayload), { errorPayload });
        } else if (errorPayload) {
          // Use the error code as message if it's a known error
          errorMessage = errorPayload;
          logger.warn('Login Screen - Unknown error code', { errorPayload });
        } else {
          logger.error('Login Screen - No error payload provided', new Error('Unknown error'));
        }

        showToast(TOAST_TYPE.ERROR, errorMessage);
      }
    } catch (error: any) {
      logger.error('Login Screen - Exception during login', error as Error, {
        errorMessage: error?.message,
        errorCode: error?.code,
        errorStack: error?.stack,
      });
      const errorMessage =
        error?.message || error?.code || TOAST_MESSAGES.GENERIC.NETWORK_ERROR;
      showToast(TOAST_TYPE.ERROR, errorMessage);
    }
    
    logger.debug('Login Screen - Login process completed');
  };

  const scrollViewStyle = { flex: 1 };

  const content = (
    <ScrollView
      style={scrollViewStyle}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={[styles.logoContainer, { marginTop: dynamicMarginTop }]}>
        <AppImage image={LOGIN_LOGO} mainStyle={styles.logo} isDisabled from="Login" />
        <AppText variant={TEXT_VARIANTS.h1} style={styles.titleText}>
          Sign in to Jeweller Pro
        </AppText>
      </View>

      <View style={styles.form}>
        {/* Phone Number */}
        <AppText variant={TEXT_VARIANTS.h4_large} style={styles.inputLabel}>
          Phone Number
        </AppText>
        <View style={styles.phoneInputContainer}>
          <TextInput
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.inputLabel}
            style={styles.phoneInput}
            cursorColor={colors.black}
            selectionColor={colors.black}
          />
        </View>
        {errors.mobileNumber && (
          <AppText style={styles.errorText} variant={TEXT_VARIANTS.h4_small}>
            {errors.mobileNumber}
          </AppText>
        )}

        {/* Password */}
        <AppText variant={TEXT_VARIANTS.h4_large} style={[styles.inputLabel, { marginTop: verticalScale(16) }]}>
          Password
        </AppText>
        <View style={[styles.phoneInputContainer, { paddingRight: scale(10) }]}>
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.inputLabel}
            style={[styles.phoneInput, { flex: 1 }]}
            cursorColor={colors.black}
            selectionColor={colors.black}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: scale(8) }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {showPassword ? (
              <EyeIcon width={scale(24)} height={scale(24)} color={colors.gray1000} />
            ) : (
              <EyeOffIcon width={scale(24)} height={scale(24)} color={colors.gray1000} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <AppText style={styles.errorText} variant={TEXT_VARIANTS.h4_small}>
            {errors.password}
          </AppText>
        )}

        <AppButton
          onPress={handleLogin}
          disabled={loading}
          loading={loading}
          style={{ marginTop: verticalScale(32) }}
          rightSideIcon={
            !loading ? (
              <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
            ) : undefined
          }
        >
          Sign in
        </AppButton>

        {/* Membership Link */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://jewellerpro.in/membership/').catch(err => {
              logger.error('Login Screen - Failed to open membership URL', err as Error);
            });
          }}
          style={styles.membershipLinkContainer}
          activeOpacity={0.7}
        >
          <Text style={styles.membershipLinkText}>
            Not a member? <Text style={styles.membershipLink}>Join Now</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <AppText style={styles.versionText} variant={TEXT_VARIANTS.h4_small}>
          Version 1.0.0
        </AppText>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <ImageBackground
          source={Images.APP_BACKGROUND}
          style={styles.fixedBackgroundImage}
          resizeMode="stretch"
        />
      </View>

      {/* Foreground Content */}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={styles.foregroundContent} behavior="padding">
          {content}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.foregroundContent}>{content}</View>
      )}

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccessOverlay}
        message="You have logged in successfully"
        onClose={() => setShowSuccessOverlay(false)}
        autoCloseDelay={2000}
      />
    </View>
  );
};
