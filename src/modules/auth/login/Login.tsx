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
  TouchableOpacity,
} from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginAppAction } from './loginActions';
import { RootState } from '../../../store';
import { styles } from './styles';
import { AppButton, AppImage } from '../../../components';
import { Images } from '../../../utils';
import { showToast, TOAST_TYPE, TOAST_MESSAGES } from '../../../utils/toast';
import { verticalScale, isTab, scale, moderateScale } from '../../../utils/Responsive';
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
  const countryCode = '91'; // Fixed country code for India
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    mobileNumber?: string;
    password?: string;
  }>({});
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

    if (!validateForm()) {
      // Show the first error found
      const firstError = errors.mobileNumber || errors.password;
      if (firstError) {
        showToast(TOAST_TYPE.ERROR, firstError);
      }
      return;
    }

    try {
      const result = await dispatch(
        loginAppAction({
          countryCode: countryCode.trim(),
          mobileNumber: mobileNumber.trim(),
          password: password.trim(),
        })
      );

      if (loginAppAction.fulfilled.match(result)) {
        // Don't show toast here, navigation will happen automatically via RootNavigator
        // The token is already stored and Redux state is updated
      } else if (loginAppAction.rejected.match(result)) {
        const payload = result.payload as string;
        let errorMessage: string = TOAST_MESSAGES.AUTH.LOGIN_FAILED;

        // Handle specific error codes
        if (payload === 'INVALID_CREDENTIALS' || payload === 'INVALID_MOBILE_NUMBER_OR_PASSWORD') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_CREDENTIALS;
        } else if (payload === 'USER_NOT_FOUND' || payload === 'MOBILE_NOT_FOUND') {
          errorMessage = TOAST_MESSAGES.AUTH.USER_NOT_FOUND;
        } else if (payload === 'INVALID_PASSWORD' || payload === 'WRONG_PASSWORD') {
          errorMessage = TOAST_MESSAGES.AUTH.INVALID_PASSWORD;
        } else if (payload === 'ACCOUNT_LOCKED') {
          errorMessage = TOAST_MESSAGES.AUTH.ACCOUNT_LOCKED;
        } else if (payload === 'ACCOUNT_SUSPENDED') {
          errorMessage = TOAST_MESSAGES.AUTH.ACCOUNT_SUSPENDED;
        } else if (payload === 'SESSION_EXPIRED') {
          errorMessage = TOAST_MESSAGES.AUTH.SESSION_EXPIRED;
        } else if (payload === 'NETWORK_ERROR' || payload === 'ERR_NETWORK') {
          errorMessage = TOAST_MESSAGES.AUTH.NETWORK_ERROR;
        } else if (payload === 'SERVER_ERROR' || payload?.includes('500')) {
          errorMessage = TOAST_MESSAGES.AUTH.SERVER_ERROR;
        } else if (payload) {
          // Use the error code as message if it's a known error
          errorMessage = payload;
        }

        showToast(TOAST_TYPE.ERROR, errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.code || TOAST_MESSAGES.GENERIC.NETWORK_ERROR;
      showToast(TOAST_TYPE.ERROR, errorMessage);
    }
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
        <AppImage image={Images.LOGO} mainStyle={styles.logo} isDisabled from="Login" />
        <AppText variant={TEXT_VARIANTS.h1}>Sign In</AppText>
      </View>

      <View style={styles.form}>
        {/* Mobile Number with Country Code */}
        <AppText variant={TEXT_VARIANTS.h4_large} style={styles.inputLabel}>
          Mobile Number
        </AppText>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+{countryCode}</Text>
          <TextInput
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter your mobile number"
            placeholderTextColor={colors.gray1000}
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
            placeholderTextColor={colors.gray1000}
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
            activeOpacity={0.7}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              style={{ width: scale(24), height: scale(24), tintColor: colors.gray1000 }}
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <AppText style={styles.errorText} variant={TEXT_VARIANTS.h4_small}>
            {errors.password}
          </AppText>
        )}

        <AppButton
          onPress={handleLogin}
          style={{ marginTop: verticalScale(32), marginBottom: verticalScale(50) }}
          loading={loading}
        >
          Sign In
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
