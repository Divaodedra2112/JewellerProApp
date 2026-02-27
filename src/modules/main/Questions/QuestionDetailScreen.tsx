import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { QUESTION_DETAILS } from './questionsData';
import { ChevronDownIcon, SearchIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { QuestionsStackParamList } from '../../../types/navigation';

type DetailRouteProp = RouteProp<QuestionsStackParamList, 'QuestionDetail'>;

export default function QuestionDetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const { questionId, questionTitle } = params;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const pairs = QUESTION_DETAILS[questionId] ?? [
    { question: questionTitle, answer: 'No details available for this topic.' },
  ];

  const filteredPairs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pairs;
    return pairs.filter(
      p =>
        p.question.toLowerCase().includes(q) || p.answer.toLowerCase().includes(q)
    );
  }, [pairs, searchQuery]);

  return (
    <View style={styles.container}>
      <CustomHeader title={questionTitle} showBackButton={true} />
      <View style={styles.searchBarWrap}>
        <View style={styles.searchBar}>
          <SearchIcon width={scale(20)} height={scale(20)} color={colors.gray1000} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.gray1000}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredPairs.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View key={index} style={styles.accordionItem}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setExpandedIndex(isExpanded ? null : index)}
                activeOpacity={0.7}
              >
                <AppText
                  variant={TEXT_VARIANTS.h4_medium}
                  style={styles.accordionQuestion}
                  numberOfLines={isExpanded ? undefined : 2}
                >
                  {index + 1}. {item.question}
                </AppText>
                <View style={isExpanded ? styles.chevronUp : undefined}>
                  <ChevronDownIcon width={scale(22)} height={scale(22)} color={colors.textPrimary} />
                </View>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.accordionBody}>
                  <AppText variant={TEXT_VARIANTS.h4_small} style={styles.accordionAnswer}>
                    {item.answer}
                  </AppText>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBarWrap: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: moderateScale(50),
    paddingHorizontal: scale(16),
    height: verticalScale(44),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textPrimary,
    paddingVertical: 0,
    marginLeft: scale(10),
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(100),
  },
  accordionItem: {
    marginBottom: verticalScale(8),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.gray100,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
  },
  accordionQuestion: {
    flex: 1,
    color: colors.textPrimary,
    marginRight: scale(12),
  },
  accordionBody: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: 0,
  },
  accordionAnswer: {
    color: colors.textSecondary,
    lineHeight: scale(22),
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
});
