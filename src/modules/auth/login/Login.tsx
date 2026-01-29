import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { requestOtp } from './loginActions';
import { RootState } from '../../../store';
import { styles } from './styles';
import { AppButton, AppImage } from '../../../components';
import { Images } from '../../../utils';
import { showToast, TOAST_TYPE, TOAST_MESSAGES } from '../../../utils/toast';
import { verticalScale, isTab } from '../../../utils/Responsive';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { AppText } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import packageJson from '../../../../package.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestAllPermissions } from '../../../utils/permissionModule';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const PERMISSIONS_REQUESTED_KEY = '@permissions_requested';

export const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const dynamicMarginTop = isTab || isLandscape ? verticalScale(50) : verticalScale(140);

  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Request permissions on first login (using native system dialogs)
  useEffect(() => {
    const requestPermissionsIfNeeded = async () => {
      try {
        // For testing: To force request permissions every time, uncomment:
        // await AsyncStorage.removeItem(PERMISSIONS_REQUESTED_KEY);

        const hasRequested = await AsyncStorage.getItem(PERMISSIONS_REQUESTED_KEY);
        console.log('[Login] ===== Permission Check =====');
        console.log('[Login] Has requested before?', hasRequested);
        console.log('[Login] Platform:', Platform.OS);
        console.log('[Login] Permission key:', PERMISSIONS_REQUESTED_KEY);

        if (!hasRequested) {
          console.log('[Login] ✅ Permissions not requested yet, will request after 1 second...');
          // Wait a bit for login screen to render
          setTimeout(async () => {
            try {
              console.log('[Login] ===== Starting permission requests =====');
              console.log('[Login] Calling requestAllPermissions()...');
              const permissions = await requestAllPermissions();
              console.log('[Login] ===== Permission requests completed =====');
              console.log('[Login] Final permissions result:', JSON.stringify(permissions, null, 2));

              // Mark as requested (even if some were denied)
              await AsyncStorage.setItem(PERMISSIONS_REQUESTED_KEY, 'true');
              console.log('[Login] ✅ Saved permission request flag to AsyncStorage');
            } catch (error) {
              console.error('[Login] ❌ Error in permission request timeout:', error);
              console.error('[Login] Error details:', error instanceof Error ? error.stack : String(error));
            }
          }, 1000);
        } else {
          console.log('[Login] ⚠️ Permissions already requested previously, skipping...');
          console.log('[Login] To test again, uncomment: await AsyncStorage.removeItem(PERMISSIONS_REQUESTED_KEY);');
        }
      } catch (error) {
        console.error('[Login] ❌ Error checking permission status:', error);
        console.error('[Login] Error details:', error instanceof Error ? error.stack : String(error));
      }
    };

    requestPermissionsIfNeeded();
  }, []);

  const handlePhoneNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    // Allow up to 10 digits
    const finalNumber = numericValue.slice(0, 10);
    setPhoneNumber(finalNumber);
  };

  const validatePhoneNumber = (number: string): boolean => {
    // Validate as 10-digit number (allows 91 as part of the 10 digits)
    return number.length === 10;
  };

  const handleContinue = async () => {
    Keyboard.dismiss();

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.AUTH.PHONE_NUMBER_INVALID);
      return;
    }

    try {
      const result = await dispatch(requestOtp(phoneNumber));
      if (requestOtp.fulfilled.match(result)) {
        // Login response doesn't include PIN, so just navigate to PIN screen
        navigation.navigate('OTP', { phoneNumber });
      } else if (requestOtp.rejected.match(result)) {
        const payload = result.payload as string;
        let errorMessage: string = TOAST_MESSAGES.GENERIC.SOMETHING_WENT_WRONG;

        if (payload === 'USER_NOT_FOUND' || payload === 'MOBILE_NOT_FOUND') {
          errorMessage = TOAST_MESSAGES.AUTH.PHONE_NUMBER_DOES_NOT_EXIST;
        } else if (payload === 'MOBILE_NOT_REGISTERED') {
          errorMessage = TOAST_MESSAGES.AUTH.MOBILE_NOT_REGISTERED;
        } else if (payload === 'WAIT_OTP_ONE_MIN') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_MIN;
        } else if (payload === 'WAIT_OTP_ONE_HOUR') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_OTP_ONE_HOUR;
        } else if (payload === 'WAIT_BEFORE_RESEND_OTP') {
          errorMessage = TOAST_MESSAGES.AUTH.WAIT_BEFORE_RESEND_OTP;
        } else if (payload === 'UNAUTHORIZED_DEVICE') {
          errorMessage = TOAST_MESSAGES.AUTH.UNAUTHORIZED_DEVICE;
        } else if (payload === 'MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED') {
          errorMessage = TOAST_MESSAGES.AUTH.MULTIPLE_SMS_TO_SAME_NUMBER_NOT_ALLOWED;
        } else if (payload === 'INVALID_COUNTRY_CODE') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_COUNTRY_CODE;
        } else if (payload === 'PIN_THROTTLED') {
          errorMessage = TOAST_MESSAGES.AUTH.PIN_THROTTLED;
        }

        if (payload === 'PIN_THROTTLED') {
          showToast(
            TOAST_TYPE.ERROR,
            errorMessage,
            'bottom',
            undefined,
            TOAST_MESSAGES.AUTH.PIN_THROTTLED_SUBTITLE
          );
        } else {
          showToast(TOAST_TYPE.ERROR, errorMessage);
        }
      }
    } catch (error) {
      showToast(TOAST_TYPE.ERROR, TOAST_MESSAGES.GENERIC.NETWORK_ERROR);
    }
  };

  useEffect(() => {
    // Auto-submit when 10 digits are entered
    if (phoneNumber.length === 10) {
      handleContinue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

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
        <AppImage image={Images.LOGO} mainStyle={styles.logo} isDisabled from="Login" />
        <AppText variant={TEXT_VARIANTS.h1}>Sign In</AppText>
      </View>

      <View style={styles.form}>
        <AppText variant={TEXT_VARIANTS.h4_large}>Phone Number</AppText>

        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter your number"
            placeholderTextColor={colors.gray1000}
            style={styles.phoneInput}
            cursorColor={colors.black}
            selectionColor={colors.black}
          />
        </View>

        <AppText style={styles.infoText} variant={TEXT_VARIANTS.h4_small}>
        Enter your PIN to securely access your account.
        </AppText>

        <AppButton
          onPress={handleContinue}
          style={{ marginBottom: verticalScale(50) }}
          loading={loading}
        >
          Continue
        </AppButton>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <AppText style={styles.versionText} variant={TEXT_VARIANTS.h4_small}>
          Version {packageJson.version}
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
    </View>
  );
};
