import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { UPDATES_MOCK, type UpdateItem, type UpdateIconType } from './updatesData';
import {
  ChevronDownIcon,
  CalendarIcon,
  InfoIcon,
  InformationIcon,
  WarningShieldIcon,
} from '../../../assets/icons/svgIcons/appSVGIcons';

const PRIMARY_BLUE = '#173051';

function UpdateIcon({ type, size }: { type: UpdateIconType; size: number }) {
  const iconColor = colors.white;
  switch (type) {
    case 'calendar':
      return <CalendarIcon width={size} height={size} color={iconColor} />;
    case 'document':
      return <InfoIcon width={size} height={size} color={iconColor} />;
    case 'notice':
      return <InformationIcon width={size} height={size} color={iconColor} />;
    case 'alert':
      return <WarningShieldIcon width={size} height={size} color={iconColor} />;
    default:
      return <InfoIcon width={size} height={size} color={iconColor} />;
  }
}

const UpdatesScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>('2');

  const onLearnMore = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Updates" showBackButton={false} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {UPDATES_MOCK.map((item: UpdateItem) => {
          const isExpanded = expandedId === item.id;
          const text = isExpanded && item.descriptionFull ? item.descriptionFull : item.description;
          return (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
                style={styles.cardInner}
              >
                <View style={styles.iconCircle}>
                  <UpdateIcon type={item.iconType} size={scale(24)} />
                </View>
                <View style={styles.cardBody}>
                  <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.cardTitle}>
                    {item.title}
                  </AppText>
                  <AppText
                    variant={TEXT_VARIANTS.h4_small}
                    style={styles.cardDescription}
                    numberOfLines={isExpanded ? undefined : 3}
                  >
                    {text}
                  </AppText>
                  {item.learnMoreUrl && (
                    <TouchableOpacity
                      onPress={e => {
                        e.stopPropagation();
                        onLearnMore(item.learnMoreUrl);
                      }}
                      style={styles.learnMoreWrap}
                    >
                      <AppText style={styles.learnMore}>Learn More</AppText>
                    </TouchableOpacity>
                  )}
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
        })}
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
    padding: scale(16),
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  cardBody: {
    flex: 1,
    marginRight: scale(8),
  },
  cardTitle: {
    color: colors.textPrimary,
    marginBottom: verticalScale(6),
  },
  cardDescription: {
    color: colors.textSecondary,
    lineHeight: scale(20),
    marginBottom: verticalScale(6),
  },
  learnMoreWrap: {
    alignSelf: 'flex-start',
    marginTop: verticalScale(2),
  },
  learnMore: {
    color: PRIMARY_BLUE,
    fontSize: scale(14),
    fontWeight: '600',
  },
  chevronWrap: {
    paddingTop: scale(2),
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
});

export default UpdatesScreen;
