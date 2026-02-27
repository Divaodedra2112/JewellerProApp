import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
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
import { ChevronRightIcon, FilterIcon, SearchIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuestionsStackParamList } from '../../../types/navigation';

type NavProp = NativeStackNavigationProp<QuestionsStackParamList, 'QuestionsList'>;

const PRIMARY_BLUE = '#173051';

export default function QuestionsListScreen() {
  const navigation = useNavigation<NavProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState<FilterCategoryId>('all');
  const [filterPopoverVisible, setFilterPopoverVisible] = useState(false);
  const [popoverSelected, setPopoverSelected] = useState<Set<FilterCategoryId>>(new Set(['all']));

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

  const openFilterPopover = () => setFilterPopoverVisible(true);
  const closeFilterPopover = () => setFilterPopoverVisible(false);

  const applyPopoverSelection = (id: FilterCategoryId) => {
    setSelectedChip(id);
    setPopoverSelected(new Set([id]));
    closeFilterPopover();
  };

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
        <TouchableOpacity onPress={openFilterPopover} style={styles.filterButton}>
          <FilterIcon width={scale(22)} height={scale(22)} color={colors.textPrimary} />
        </TouchableOpacity>
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
      <Modal
        visible={filterPopoverVisible}
        transparent
        animationType="fade"
        onRequestClose={closeFilterPopover}
      >
        <Pressable style={styles.modalOverlay} onPress={closeFilterPopover}>
          <View style={styles.popover}>
            {FILTER_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.popoverRow}
                onPress={() => applyPopoverSelection(cat.id)}
              >
                <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.popoverLabel}>
                  {cat.label}
                </AppText>
                {popoverSelected.has(cat.id) || selectedChip === cat.id ? (
                  <AppText style={styles.checkmark}>✓</AppText>
                ) : null}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.popoverRow}
              onPress={() => applyPopoverSelection('all')}
            >
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.popoverLabel}>
                All
              </AppText>
              {selectedChip === 'all' ? <AppText style={styles.checkmark}>✓</AppText> : null}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
    gap: scale(12),
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: scale(44),
    height: verticalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: verticalScale(100),
    paddingRight: moderateScale(16),
  },
  popover: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    minWidth: scale(180),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  popoverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
  },
  popoverLabel: {
    color: colors.textPrimary,
  },
  checkmark: {
    color: PRIMARY_BLUE,
    fontSize: scale(16),
    fontWeight: '700',
  },
});
