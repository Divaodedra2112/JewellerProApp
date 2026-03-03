import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { ChevronDownIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { getUpdates } from './UpdatesService';
import { Update, UpdateTypeApi } from './UpdatesTypes';
import { getUpdateIconXml } from './updateIcons';

const PRIMARY_BLUE = '#173051';

const UpdatesScreen = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchUpdates = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await getUpdates();
      setUpdates(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load updates');
      setUpdates([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  const onRefresh = useCallback(() => {
    fetchUpdates(true);
  }, [fetchUpdates]);

  const onLearnMore = useCallback((url: string) => {
    Linking.openURL(url).catch(() => {});
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Updates" showBackButton={false} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={PRIMARY_BLUE} />
          <AppText variant={TEXT_VARIANTS.h4_small} style={styles.loadingText}>
            Loading updates...
          </AppText>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Updates" showBackButton={false} />
        <View style={styles.centered}>
          <AppText variant={TEXT_VARIANTS.h4_small} style={styles.errorText}>
            {error}
          </AppText>
          <TouchableOpacity onPress={() => fetchUpdates()} style={styles.retryButton}>
            <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.retryText}>
              Retry
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Updates" showBackButton={false} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY_BLUE} />
        }
      >
        {updates.length === 0 ? (
          <View style={styles.centered}>
            <AppText variant={TEXT_VARIANTS.h4_small} style={styles.emptyText}>
              No updates at the moment.
            </AppText>
          </View>
        ) : (
          updates.map((item) => {
            const isExpanded = expandedId === item.id;
            const text =
              isExpanded && item.content ? item.content : item.description || item.content || '';
            return (
              <View key={item.id} style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setExpandedId(isExpanded ? null : item.id)}
                  style={styles.cardInner}
                >
                  <View style={styles.iconCircle}>
                    <SvgXml
                      xml={getUpdateIconXml(item.updateType as UpdateTypeApi)}
                      width={scale(20)}
                      height={scale(20)}
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <AppText variant={TEXT_VARIANTS.h3} style={styles.cardTitle}>
                      {item.title}
                    </AppText>
                    <AppText
                      variant={TEXT_VARIANTS.h4_small}
                      style={styles.cardDescription}
                      numberOfLines={isExpanded ? undefined : 4}
                    >
                      {text}
                    </AppText>
                    {item.link ? (
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          onLearnMore(item.link!);
                        }}
                        style={styles.learnMoreWrap}
                        activeOpacity={0.7}
                      >
                        <AppText style={styles.learnMore}>Learn More</AppText>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View style={[styles.chevronWrap, isExpanded && styles.chevronUp]}>
                    <ChevronDownIcon
                      width={scale(20)}
                      height={scale(20)}
                      color={colors.gray1000}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(100),
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: verticalScale(12),
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: verticalScale(16),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    backgroundColor: PRIMARY_BLUE,
    borderRadius: moderateScale(8),
  },
  retryText: {
    color: colors.white,
  },
  emptyText: {
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardInner: {
    flexDirection: 'row',
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(18),
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(28),
    backgroundColor: PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(14),
  },
  cardBody: {
    flex: 1,
    marginRight: scale(8),
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: scale(17),
    fontWeight: '700',
    marginBottom: verticalScale(8),
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: scale(15),
    lineHeight: scale(22),
    marginBottom: verticalScale(6),
  },
  learnMoreWrap: {
    alignSelf: 'flex-start',
    marginTop: verticalScale(4),
  },
  learnMore: {
    color: PRIMARY_BLUE,
    fontSize: scale(15),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  chevronWrap: {
    paddingTop: scale(2),
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
});

export default UpdatesScreen;
