import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader/Header';
import { AppText, TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { colors } from '../../../utils/theme';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import {
  FILTER_CATEGORIES,
  QUESTIONS_LIST,
  type FilterCategoryId,
  type QuestionItem,
} from './questionsData';
import { ChevronRightIcon, SearchIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuestionsStackParamList } from '../../../types/navigation';

type NavProp = NativeStackNavigationProp<QuestionsStackParamList, 'QuestionsList'>;

const PRIMARY_BLUE = '#173051';

export default function QuestionsListScreen() {
  const navigation = useNavigation<NavProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState<FilterCategoryId>('all');

  const filteredQuestions = useMemo(() => {
    let list = QUESTIONS_LIST;
    if (selectedChip !== 'all') {
      list = list.filter(q => q.categoryId === selectedChip);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(item => item.title.toLowerCase().includes(q));
    }
    return list;
  }, [selectedChip, searchQuery]);

  const handleQuestionPress = (item: QuestionItem) => {
    navigation.navigate('QuestionDetail', { questionId: item.id, questionTitle: item.title });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Queries" showBackButton={false} />
      <View style={styles.searchRow}>
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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        style={styles.chipsScroll}
      >
        {FILTER_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedChip(cat.id)}
            style={[styles.chip, selectedChip === cat.id && styles.chipSelected]}
          >
            <AppText
              variant={TEXT_VARIANTS.h4_small}
              style={[styles.chipText, selectedChip === cat.id && styles.chipTextSelected]}
            >
              {cat.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredQuestions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.questionRow}
            onPress={() => handleQuestionPress(item)}
            activeOpacity={0.7}
          >
            <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.questionTitle} numberOfLines={2}>
              {item.title}
            </AppText>
            <ChevronRightIcon width={scale(20)} height={scale(20)} color={colors.gray1000} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
  },
  searchBar: {
    width: '100%',
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
  chipsScroll: {
    maxHeight: verticalScale(44),
    marginTop: verticalScale(8),
  },
  chipsContainer: {
    paddingHorizontal: moderateScale(16),
    gap: scale(10),
    paddingBottom: verticalScale(12),
  },
  chip: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(50),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  chipSelected: {
    backgroundColor: PRIMARY_BLUE,
    borderColor: PRIMARY_BLUE,
  },
  chipText: {
    color: colors.textPrimary,
  },
  chipTextSelected: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(100),
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(8),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  questionTitle: {
    flex: 1,
    color: colors.textPrimary,
    marginRight: scale(12),
  },
});
