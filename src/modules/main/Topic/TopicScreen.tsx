import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Linking, Share, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../../../store';
import { CustomHeader, AppButton, EmptyState } from '../../../components';
import { AppText } from '../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { fetchTopic } from './TopicActions';
import { MainStackParamList } from '../../../types/navigation';
import { TopicSkeleton } from './components/TopicSkeleton/TopicSkeleton';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';
import { DownloadIcon, ShareIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { styles } from './styles';
import { logger } from '../../../utils/logger';
import { showToast, TOAST_TYPE } from '../../../utils/toast';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;
type TopicRouteProp = RouteProp<MainStackParamList, 'Topic'>;

const TopicScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TopicRouteProp>();
  const { id, title: routeTitle, type } = route.params;

  const { topic, loading, error } = useSelector((state: RootState) => state.topic);

  // Fetch topic on mount
  useEffect(() => {
    dispatch(fetchTopic(id));
  }, [dispatch, id]);

  // Handle PDF download
  const handleDownloadPDF = useCallback(async () => {
    const topicToUse = topic;
    if (!topicToUse?.pdfUrl) {
      showToast(TOAST_TYPE.ERROR, t('topic.noPdf', 'PDF not available'));
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(topicToUse.pdfUrl);
      if (canOpen) {
        await Linking.openURL(topicToUse.pdfUrl);
        logger.info('Topic Screen - PDF opened', { pdfUrl: topicToUse.pdfUrl });
      } else {
        showToast(TOAST_TYPE.ERROR, t('topic.pdfError', 'Unable to open PDF'));
      }
    } catch (error: any) {
      logger.error('Topic Screen - Error opening PDF', error as Error);
      showToast(TOAST_TYPE.ERROR, t('topic.pdfError', 'Unable to open PDF'));
    }
  }, [topic, t]);

  // Handle share
  const handleShare = useCallback(async () => {
    const topicToUse = topic;
    if (!topicToUse) {
      return;
    }

    try {
      const shareContent: { message: string; title?: string; url?: string } = {
        message: `${topicToUse.title}\n\n${topicToUse.content.substring(0, 200)}...`,
        title: topicToUse.title,
      };

      if (topicToUse.pdfUrl) {
        shareContent.url = topicToUse.pdfUrl;
      }

      if (Platform.OS === 'android') {
        shareContent.title = topicToUse.title;
      }

      const result = await Share.share(shareContent, {
        ...(Platform.OS === 'android' && {
          dialogTitle: topicToUse.title,
        }),
        ...(Platform.OS === 'ios' && {
          subject: topicToUse.title,
        }),
      });

      if (result.action === Share.sharedAction) {
        showToast(TOAST_TYPE.SUCCESS, t('topic.shared', 'Content shared successfully'));
      }
    } catch (error: any) {
      logger.error('Topic Screen - Error sharing', error as Error);
      showToast(TOAST_TYPE.ERROR, t('topic.shareError', 'Failed to share content'));
    }
  }, [topic, t]);

  const displayTitle = topic?.title || routeTitle || t('topic.title', 'Topic');
  const displayContent = topic?.content || '';
  const hasPDF = !!topic?.pdfUrl;

  return (
    <View style={styles.container}>
      <CustomHeader
        title={displayTitle}
        showBackButton={true}
        rightIcon={
          <ShareIcon
            width={scale(24)}
            height={scale(24)}
            color={colors.primary}
          />
        }
        onRightIconPress={handleShare}
      />

      {(loading && !topic) || (error && !topic) ? (
        <TopicSkeleton />
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Tag/Badge */}
          {topic?.tag && (
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <AppText variant={TEXT_VARIANTS.h6_small} style={styles.tagText}>
                  {topic.tag}
                </AppText>
              </View>
            </View>
          )}

          {/* Title */}
          <AppText variant={TEXT_VARIANTS.h1} style={styles.title}>
            {displayTitle}
          </AppText>

          {/* Content */}
          {displayContent && (
            <View style={styles.contentSection}>
              <AppText variant={TEXT_VARIANTS.h4_small} style={styles.contentText}>
                {displayContent}
              </AppText>
            </View>
          )}

          {/* Download PDF Button */}
          {hasPDF && (
            <View style={styles.buttonContainer}>
              <AppButton
                onPress={handleDownloadPDF}
                style={styles.downloadButton}
                rightSideIcon={
                  <DownloadIcon width={scale(20)} height={scale(20)} color={colors.white} />
                }
              >
                {t('topic.downloadPdf', 'Download PDF')}
              </AppButton>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TopicScreen;

