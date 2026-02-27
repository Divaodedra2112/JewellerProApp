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
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { requestOtp } from './loginActions';
import { RootState } from '../../../store';
import { AuthStackParamList } from '../../../types/navigation';
import { styles } from './styles';
import { AppImage, AppButton, AppInputField } from '../../../components';
import { Images } from '../../../utils';
import { showToast, TOAST_TYPE, TOAST_MESSAGES } from '../../../utils/toast';
import { logger } from '../../../utils/logger';
const LOGIN_LOGO = require('../../../assets/images/JP-Logo.png');
import { verticalScale, isTab, scale } from '../../../utils/Responsive';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { AppText } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { ArrowRightIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { BackIconHeader } from '../../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../../utils/CommonStyles';

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const dynamicMarginTop = isTab || isLandscape ? verticalScale(50) : verticalScale(80);
  const navigation = useNavigation<LoginNavigationProp>();

  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState<{ mobileNumber?: string }>({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleMobileNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const finalNumber = numericValue.slice(0, 10);
    setMobileNumber(finalNumber);
    if (errors.mobileNumber) {
      setErrors(prev => ({ ...prev, mobileNumber: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!mobileNumber || mobileNumber.trim() === '') {
      newErrors.mobileNumber = TOAST_MESSAGES.AUTH.MOBILE_NUMBER_REQUIRED;
    } else if (mobileNumber.length !== 10) {
      newErrors.mobileNumber = TOAST_MESSAGES.AUTH.INVALID_MOBILE_NUMBER;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (!validateForm()) {
      const firstError = errors.mobileNumber;
      if (firstError) showToast(TOAST_TYPE.ERROR, firstError);
      return;
    }

    try {
      const result = await dispatch(requestOtp(mobileNumber.trim()));
      if (requestOtp.fulfilled.match(result)) {
        navigation.navigate('OTP', { phoneNumber: mobileNumber.trim() });
      } else if (requestOtp.rejected.match(result)) {
        const payload = result.payload as string;
        const message =
          payload === 'MOBILE_NOT_FOUND' || payload === 'MOBILE_NOT_REGISTERED'
            ? TOAST_MESSAGES.AUTH.MOBILE_NOT_REGISTERED
            : payload === 'NETWORK_ERROR' || payload === 'Network Error'
              ? TOAST_MESSAGES.GENERIC.NETWORK_ERROR
              : payload || 'Failed to send code';
        showToast(TOAST_TYPE.ERROR, message);
      }
    } catch (error: any) {
      logger.error('Login Screen - Send OTP exception', error as Error);
      showToast(TOAST_TYPE.ERROR, error?.message || TOAST_MESSAGES.GENERIC.NETWORK_ERROR);
    }
  };

  const content = (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header: Back + Log in */}
      <View style={styles.authHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={35} style={styles.backButton}>
          <BackIconHeader width={defaultIconSizes.small} height={defaultIconSizes.small} color={colors.primary} />
        </TouchableOpacity>
        <AppText variant={TEXT_VARIANTS.h4_large} style={styles.authHeaderTitle}>
          Log in
        </AppText>
        <View style={styles.backButton} />
      </View>

      <View style={[styles.logoContainer, { marginTop: dynamicMarginTop }]}>
        <AppImage image={LOGIN_LOGO} mainStyle={styles.logo} isDisabled from="Login" />
        <AppText variant={TEXT_VARIANTS.h1} style={styles.titleText}>
          Secure Member Access
        </AppText>
        <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.subtitleText}>
          Enter your registered mobile number to continue
        </AppText>
      </View>

      <View style={styles.form}>
        <AppInputField
          label="Phone Number"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="Enter your phone number"
          error={errors.mobileNumber}
          labelStyle={styles.inputLabel}
        />

        <AppButton
          onPress={handleContinue}
          disabled={loading}
          loading={loading}
          style={{ marginTop: verticalScale(32) }}
          rightSideIcon={
            !loading ? (
              <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
            ) : undefined
          }
        >
          Continue
        </AppButton>

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
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={styles.foregroundContent} behavior="padding">
          {content}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.foregroundContent}>{content}</View>
      )}
    </View>
  );
};
