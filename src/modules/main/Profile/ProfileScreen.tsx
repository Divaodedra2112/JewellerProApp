import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setUser } from '../../../store/slices/authSlice';
import { CustomHeader, AppButton, AppInputField } from '../../../components';
import { styles } from './styles';
import { scale, verticalScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';
import { EditProfileIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { ProfilIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import {
  getProfile,
  updateProfile,
  formatPhoneDisplay,
  mapProfileUserToAuthUser,
} from './profileApi';
import { showToast, TOAST_TYPE, TOAST_MESSAGES, getApiErrorMessage } from '../../../utils/toast';
import {
  requestCameraPermission,
  checkCameraPermissionStatus,
  requestStoragePermission,
  checkStoragePermissionStatus,
  showPermissionDeniedAlert,
  openAppSettings,
} from '../../../utils/permissionModule';
import { RESULTS } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  launchCamera as launchImagePickerCamera,
  launchImageLibrary as launchImagePickerLibrary,
} from 'react-native-image-picker';
import { CAMERA_PICKER_OPTIONS, CAMERA_ERROR, IMAGE_SOURCE_ALERT } from '../../../utils/Const';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const displayUser = useSelector((state: RootState) => state.auth.user);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [phoneDisplay, setPhoneDisplay] = useState(
    () =>
      formatPhoneDisplay(user?.countryCode ?? '', user?.mobile ?? '') || (user?.mobile ?? '')
  );

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoadingProfile(true);
    setProfileError(null);
    try {
      const response = await getProfile();
      const apiUser = response.data?.user;
      if (!apiUser) {
        setProfileError(t('profile.fetchFailed', TOAST_MESSAGES.PROFILE.FETCH_FAILED));
        showToast(TOAST_TYPE.ERROR, t('profile.fetchFailed', TOAST_MESSAGES.PROFILE.FETCH_FAILED));
        return;
      }
      const mapped = mapProfileUserToAuthUser(apiUser);
      dispatch(setUser(mapped));
      setFirstName(mapped.firstName ?? '');
      setLastName(mapped.lastName ?? '');
      setPhoneDisplay(
        formatPhoneDisplay(apiUser.countryCode ?? '', apiUser.mobileNumber ?? '') ||
          mapped.mobile ||
          ''
      );
      setProfilePhotoUri(null);
    } catch (err: any) {
      const status = err?.response?.status;
      const message = getApiErrorMessage(err, t('profile.fetchFailed', TOAST_MESSAGES.PROFILE.FETCH_FAILED));
      setProfileError(message);
      if (status === 401) {
        showToast(TOAST_TYPE.ERROR, t('profile.sessionExpired', TOAST_MESSAGES.PROFILE.SESSION_EXPIRED));
      } else {
        showToast(TOAST_TYPE.ERROR, message);
      }
    } finally {
      setLoadingProfile(false);
    }
  }, [dispatch, t]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSaveChanges = async () => {
    const first = firstName.trim();
    const last = lastName.trim();
    if (!first && !last) {
      showToast(
        TOAST_TYPE.ERROR,
        t('profile.validationOneNameRequired', TOAST_MESSAGES.PROFILE.VALIDATION_ONE_NAME_REQUIRED)
      );
      return;
    }

    setSaving(true);
    try {
      const response = await updateProfile({
        firstName: first || undefined,
        lastName: last || undefined,
      });
      const apiUser = response.data?.user;
      if (!apiUser) {
        showToast(TOAST_TYPE.ERROR, t('profile.updateFailed', TOAST_MESSAGES.PROFILE.UPDATE_FAILED));
        return;
      }
      const mapped = mapProfileUserToAuthUser(apiUser);
      dispatch(setUser(mapped));
      setFirstName(mapped.firstName ?? '');
      setLastName(mapped.lastName ?? '');
      setPhoneDisplay(
        formatPhoneDisplay(apiUser.countryCode ?? '', apiUser.mobileNumber ?? '') ||
          mapped.mobile ||
          ''
      );
      showToast(TOAST_TYPE.SUCCESS, t('profile.updateSuccess', TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS));
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401) {
        showToast(TOAST_TYPE.ERROR, t('profile.sessionExpired', TOAST_MESSAGES.PROFILE.SESSION_EXPIRED));
      } else {
        const message =
          err?.response?.data?.message ||
          getApiErrorMessage(err, t('profile.updateFailed', TOAST_MESSAGES.PROFILE.UPDATE_FAILED));
        showToast(TOAST_TYPE.ERROR, message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEditProfilePicture = () => {
    Alert.alert(
      t('profile.selectImageSource', IMAGE_SOURCE_ALERT.TITLE),
      t('profile.selectImageSourceMessage', IMAGE_SOURCE_ALERT.MESSAGE),
      [
        { text: t('common.cancel', IMAGE_SOURCE_ALERT.BUTTONS.CANCEL), style: 'cancel' },
        {
          text: t('profile.takePhoto', IMAGE_SOURCE_ALERT.BUTTONS.CAMERA),
          onPress: () => requestCameraAndOpenCamera(),
        },
        {
          text: t('profile.chooseFromLibrary', IMAGE_SOURCE_ALERT.BUTTONS.GALLERY),
          onPress: () => openLibrary(),
        },
      ]
    );
  };

  const requestCameraAndOpenCamera = async () => {
    try {
      const { status, blocked } = await checkCameraPermissionStatus();
      if (status === RESULTS.GRANTED) {
        await openCameraAndSetPhoto();
        return;
      }
      if (blocked || status === RESULTS.BLOCKED) {
        showPermissionDeniedAlert('camera', openAppSettings);
        return;
      }
      const granted = await requestCameraPermission();
      if (!granted) {
        showPermissionDeniedAlert('camera', openAppSettings);
        return;
      }
      await openCameraAndSetPhoto();
    } catch (err: any) {
      showToast(TOAST_TYPE.ERROR, err?.message ?? CAMERA_ERROR.MESSAGE);
    }
  };

  const openCameraAndSetPhoto = async () => {
    if (Platform.OS === 'android') {
      await openCameraAndroid();
    } else {
      await openCameraIOS();
    }
  };

  const tryCropThenSetPhoto = (uri: string) => {
    if (!displayUser) return;
    ImageCropPicker.openCropper({
      path: uri,
      width: CAMERA_PICKER_OPTIONS.width,
      height: CAMERA_PICKER_OPTIONS.height,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: t('profile.cropPhoto', 'Crop photo'),
    })
      .then((image) => {
        const croppedUri = image?.path ?? (image as any)?.sourceURL ?? null;
        if (croppedUri) {
          dispatch(setUser({ ...displayUser, photo: croppedUri }));
          setProfilePhotoUri(croppedUri);
          showToast(TOAST_TYPE.SUCCESS, t('profile.photoUpdated', 'Profile photo updated'));
        }
      })
      .catch((err: any) => {
        if (err?.code === 'E_PICKER_CANCELLED' || err?.message?.includes('cancel')) return;
        dispatch(setUser({ ...displayUser, photo: uri }));
        setProfilePhotoUri(uri);
        showToast(TOAST_TYPE.SUCCESS, t('profile.photoUpdated', 'Profile photo updated'));
      });
  };

  const openCameraAndroid = async () => {
    try {
      const result = await launchImagePickerCamera({
        mediaType: 'photo',
        quality: 0.7,
        saveToPhotos: false,
      });
      if (result.didCancel || !result.assets?.length) return;
      const uri = result.assets[0]?.uri ?? result.assets[0]?.originalPath ?? null;
      if (!uri || !displayUser) {
        if (result.errorMessage) showToast(TOAST_TYPE.ERROR, result.errorMessage);
        return;
      }
      tryCropThenSetPhoto(uri);
    } catch (err: any) {
      if (err?.code === 'E_PICKER_CANCELLED' || err?.message?.includes('cancel')) return;
      showToast(TOAST_TYPE.ERROR, err?.message ?? CAMERA_ERROR.MESSAGE);
    }
  };

  const openCameraIOS = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        ...CAMERA_PICKER_OPTIONS,
        cropping: true,
        cropperCircleOverlay: true,
      });
      const uri = image?.path ?? (image as any)?.sourceURL ?? null;
      if (uri && displayUser) {
        dispatch(setUser({ ...displayUser, photo: uri }));
        setProfilePhotoUri(uri);
        showToast(TOAST_TYPE.SUCCESS, t('profile.photoUpdated', 'Profile photo updated'));
      }
    } catch (err: any) {
      if (err?.code === 'E_PICKER_CANCELLED' || err?.message?.includes('cancel')) return;
      throw err;
    }
  };

  const openLibrary = async () => {
    if (Platform.OS === 'ios') {
      const { status, blocked } = await checkStoragePermissionStatus();
      if (status !== RESULTS.GRANTED) {
        if (blocked || status === RESULTS.BLOCKED) {
          showPermissionDeniedAlert('storage', openAppSettings);
          return;
        }
        const granted = await requestStoragePermission();
        if (!granted) {
          showPermissionDeniedAlert('storage', openAppSettings);
          return;
        }
      }
      try {
        const image = await ImageCropPicker.openPicker({
          ...CAMERA_PICKER_OPTIONS,
          cropping: true,
          cropperCircleOverlay: true,
        });
        const uri = image?.path ?? (image as any)?.sourceURL ?? null;
        if (uri && displayUser) {
          dispatch(setUser({ ...displayUser, photo: uri }));
          setProfilePhotoUri(uri);
          showToast(TOAST_TYPE.SUCCESS, t('profile.photoUpdated', 'Profile photo updated'));
        }
      } catch (err: any) {
        if (err?.code === 'E_PICKER_CANCELLED' || err?.message?.includes('cancel')) return;
        showToast(TOAST_TYPE.ERROR, err?.message ?? CAMERA_ERROR.MESSAGE);
      }
      return;
    }
    try {
      const result = await launchImagePickerLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.7,
      });
      if (result.didCancel || !result.assets?.length) return;
      const uri = result.assets[0]?.uri ?? result.assets[0]?.originalPath ?? null;
      if (!uri || !displayUser) {
        if (result.errorMessage) showToast(TOAST_TYPE.ERROR, result.errorMessage);
        return;
      }
      tryCropThenSetPhoto(uri);
    } catch (err: any) {
      if (err?.code === 'E_PICKER_CANCELLED' || err?.message?.includes('cancel')) return;
      showToast(TOAST_TYPE.ERROR, err?.message ?? CAMERA_ERROR.MESSAGE);
    }
  };

  const phoneValue =
    phoneDisplay ||
    formatPhoneDisplay(displayUser?.countryCode ?? '', displayUser?.mobile ?? '') ||
    (displayUser?.mobile ?? '');

  return (
    <View style={styles.container}>
      <CustomHeader title={t('profile.title', 'Profile')} showBackButton={true} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {loadingProfile ? (
          <View style={[styles.scrollView, { justifyContent: 'center', alignItems: 'center', paddingVertical: verticalScale(80) }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : profileError ? (
          <View style={[styles.scrollView, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(24), paddingVertical: verticalScale(80) }]}>
            <Text style={{ textAlign: 'center', marginBottom: verticalScale(16), color: colors.gray1000 }}>{profileError}</Text>
            <AppButton onPress={loadProfile}>{t('common.retry', 'Retry')}</AppButton>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.profilePictureContainer}>
                <View style={styles.profilePictureWrapper}>
                  {(profilePhotoUri ?? displayUser?.photo) ? (
                    <Image
                      source={{ uri: profilePhotoUri ?? displayUser?.photo ?? '' }}
                      style={styles.profilePicture}
                    />
                  ) : (
                    <View style={styles.profilePicturePlaceholder}>
                      <ProfilIcon
                        width={scale(60)}
                        height={scale(60)}
                        color={colors.Gray40}
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.editPictureButton}
                    onPress={handleEditProfilePicture}
                    activeOpacity={0.7}
                  >
                    <EditProfileIcon
                      width={scale(28)}
                      height={scale(28)}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.form}>
                <AppInputField
                  label={t('profile.firstName', 'First Name')}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={t('profile.firstNamePlaceholder', 'Enter your first name')}
                  labelStyle={styles.inputLabel}
                />

                <AppInputField
                  label={t('profile.lastName', 'Last Name')}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={t('profile.lastNamePlaceholder', 'Enter your last name')}
                  labelStyle={[styles.inputLabel, { marginTop: verticalScale(16) }]}
                />

                <AppInputField
                  label={t('profile.phoneNumber', 'Phone Number')}
                  value={phoneValue}
                  onChangeText={() => {}}
                  keyboardType="phone-pad"
                  placeholder={t('profile.phoneNumberPlaceholder', 'Enter your phone number')}
                  editable={false}
                  containerStyle={styles.disabledInputContainer}
                  inputStyle={styles.disabledInput}
                  labelStyle={[styles.inputLabel, { marginTop: verticalScale(16) }]}
                />

                <AppButton
                  onPress={handleSaveChanges}
                  style={styles.saveButton}
                  loading={saving}
                  disabled={saving}
                >
                  {t('profile.saveChanges', 'Save Changes')}
                </AppButton>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
