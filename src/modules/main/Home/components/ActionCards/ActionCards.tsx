import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { ZoomMeeting } from '../../../HomeTypes';
import { ArrowRightCircleIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { styles } from './styles';

interface ActionCardsProps {
  zoomMeeting?: ZoomMeeting;
  panCardLinkUrl?: string; // Static Pan Card link URL
}

export const ActionCards: React.FC<ActionCardsProps> = ({
  zoomMeeting,
  panCardLinkUrl = 'https://jewellerpro.in/verify-pan-card', // Default placeholder
}) => {
  const handleCardPress = async (linkUrl: string) => {
    if (linkUrl) {
      const canOpen = await Linking.canOpenURL(linkUrl);
      if (canOpen) {
        await Linking.openURL(linkUrl);
      }
    }
  };

  const hasZoomMeeting = zoomMeeting && zoomMeeting.status === 'ACTIVE';

  return (
    <View style={styles.container}>
      {hasZoomMeeting ? (
        // Two cards side by side
        <>
          <TouchableOpacity
            style={[styles.card, styles.halfWidthCard]}
            onPress={() => handleCardPress(panCardLinkUrl)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <ArrowRightCircleIcon width={scale(24)} height={scale(24)} />
            </View>
            <View style={styles.cardContent}>
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.cardTitle}>
                Verify Pan Card
              </AppText>
              <AppText variant={TEXT_VARIANTS.h6_small} style={styles.cardSubtitle}>
                Built on Trust
              </AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.halfWidthCard]}
            onPress={() => handleCardPress(zoomMeeting.linkUrl)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <ArrowRightCircleIcon width={scale(24)} height={scale(24)} />
            </View>
            <View style={styles.cardContent}>
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.cardTitle}>
                Join the Meeting
              </AppText>
              <AppText variant={TEXT_VARIANTS.h6_small} style={styles.cardSubtitle}>
                {zoomMeeting.meetingTime ? `At ${zoomMeeting.meetingTime}` : 'Join Now'}
              </AppText>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        // Single full-width card
        <TouchableOpacity
          style={[styles.card, styles.fullWidthCard]}
          onPress={() => handleCardPress(panCardLinkUrl)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <ArrowRightCircleIcon width={scale(24)} height={scale(24)} />
          </View>
          <View style={styles.cardContent}>
            <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.cardTitle}>
              Verify Pan Card
            </AppText>
            <AppText variant={TEXT_VARIANTS.h6_small} style={styles.cardSubtitle}>
              Built on Trust
            </AppText>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

