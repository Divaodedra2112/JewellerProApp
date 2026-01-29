import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ContactButton from '../ContactButton/ContactButton';
import WorkingHoursDisplay from '../WorkingHoursDisplay/WorkingHoursDisplay';
import { makePhoneCall, sendEmail, openMap } from '../../services/contactService';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

const AssociationInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const associationInfo = useSelector((state: RootState) => state.association.info);
  const loading = useSelector((state: RootState) => state.association.loading);

  if (loading && !associationInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!associationInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('common.error')}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Association Name */}
        <Text style={styles.associationName}>{associationInfo.name}</Text>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.label}>{t('association.address')}</Text>
          <Text style={styles.value}>{associationInfo.address}</Text>
          <ContactButton
            text={t('association.openMap')}
            onPress={() => openMap(associationInfo.address)}
            icon="map"
          />
        </View>

        {/* Phone Section */}
        <View style={styles.section}>
          <Text style={styles.label}>{t('association.phone')}</Text>
          <ContactButton
            text={associationInfo.phone}
            onPress={() => makePhoneCall(associationInfo.phone)}
            icon="phone"
          />
        </View>

        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.label}>{t('association.email')}</Text>
          <ContactButton
            text={associationInfo.email}
            onPress={() => sendEmail(associationInfo.email)}
            icon="email"
          />
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={styles.label}>{t('association.workingHours')}</Text>
          <WorkingHoursDisplay hours={associationInfo.workingHours} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: moderateScale(20),
  },
  container: {
    padding: moderateScale(20),
    backgroundColor: colors.background,
  },
  associationName: {
    fontSize: moderateScale(28), // Large for elderly users
    fontFamily: Fonts.bold,
    color: colors.textPrimary,
    marginBottom: moderateScale(24),
    textAlign: 'center',
    lineHeight: moderateScale(36),
  },
  section: {
    marginBottom: moderateScale(28),
  },
  label: {
    fontSize: moderateScale(18), // Large labels
    fontFamily: Fonts.semiBold,
    color: colors.textSecondary,
    marginBottom: moderateScale(12),
  },
  value: {
    fontSize: moderateScale(16), // Readable text
    fontFamily: Fonts.regular,
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
    marginBottom: moderateScale(8),
  },
  loadingText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: moderateScale(20),
  },
  errorText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.regular,
    color: colors.error || '#FF0000',
    textAlign: 'center',
    padding: moderateScale(20),
  },
});

export default AssociationInfoCard;


