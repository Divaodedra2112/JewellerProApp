import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AppText } from '../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { CustomHeader, AppButton } from '../../../components';
import { styles } from './styles';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors, Fonts } from '../../../utils/theme';
import { EditProfileIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { ProfilIcon } from '../../../assets/icons/svgIcons/appSVGIcons';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.mobile || '');

  const handleSaveChanges = () => {
    // TODO: Implement save changes API call
    console.log('Save changes:', { firstName, lastName, phoneNumber });
  };

  const handleEditProfilePicture = () => {
    // TODO: Implement profile picture edit
    console.log('Edit profile picture');
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={t('profile.title', 'Profile')} showBackButton={true} />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Profile Picture Section */}
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureWrapper}>
                {user?.photo ? (
                  <Image
                    source={{ uri: user.photo }}
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

            {/* Form Fields */}
            <View style={styles.form}>
              {/* First Name */}
              <AppText variant={TEXT_VARIANTS.h4_large} style={styles.inputLabel}>
                {t('profile.firstName', 'First Name')}
              </AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={t('profile.firstNamePlaceholder', 'Enter your first name')}
                  placeholderTextColor={colors.inputLabel}
                  style={styles.input}
                  cursorColor={colors.black}
                  selectionColor={colors.black}
                />
              </View>

              {/* Last Name */}
              <AppText
                variant={TEXT_VARIANTS.h4_large}
                style={[styles.inputLabel, { marginTop: verticalScale(16) }]}
              >
                {t('profile.lastName', 'Last Name')}
              </AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={t('profile.lastNamePlaceholder', 'Enter your last name')}
                  placeholderTextColor={colors.inputLabel}
                  style={styles.input}
                  cursorColor={colors.black}
                  selectionColor={colors.black}
                />
              </View>

              {/* Phone Number */}
              <AppText
                variant={TEXT_VARIANTS.h4_large}
                style={[styles.inputLabel, { marginTop: verticalScale(16) }]}
              >
                {t('profile.phoneNumber', 'Phone Number')}
              </AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder={t('profile.phoneNumberPlaceholder', 'Enter your phone number')}
                  placeholderTextColor={colors.inputLabel}
                  style={styles.input}
                  cursorColor={colors.black}
                  selectionColor={colors.black}
                  editable={false}
                />
              </View>

              {/* Save Changes Button */}
              <AppButton
                onPress={handleSaveChanges}
                style={styles.saveButton}
                
              >
                {t('profile.saveChanges', 'Save Changes')}
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;

