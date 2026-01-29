import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import styles from './LinkComponent.style';
import { CloseIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import AppImage from '../AppImage/AppImage';
import SearchBar from '../SearchComponent/SearchBar';
import { Images } from '../../utils';
import { AppText } from '../AppText/AppText';
import { AppButton } from '../../components/index';
import { FlatList } from 'react-native-gesture-handler';
import { LINKED, UNLINKED, LinkStatus } from '../../utils/Const';
import AppLoder from '../AppLoder/AppLoder';

interface listDataType {
  id: number;
  name: string;
  gradeName?: string; // Single grade (backward compatibility)
  categoryName?: string; // Single category (backward compatibility)
  grades?: Array<{ id: number; name: string }>; // Array of grades from API
  categories?: Array<{ id: number; name: string }>; // Array of categories from API
  productName: string;
  linkStatus: LinkStatus;
}

interface StaffListComponentWithTabProps {
  style?: any;
  onClose: () => void;
  isVisible?: boolean;
  data?: listDataType[];
  linkTo?: number[]; // Array of IDs that should be initially linked
  onStatusChange?: (linkedIds: number[]) => void; // Return all currently linked IDs
  onApply?: (linkedIds: number[]) => void; // Callback for Apply button - receives linked IDs
  loading?: boolean; // Loading state for the Apply button
  // Pagination props
  onLoadMore?: () => void; // Callback to load more data
  hasMore?: boolean; // Whether there are more items to load
  loadingMore?: boolean; // Loading state for pagination
  totalItems?: number; // Total number of items available
  from?: string;
  title?: string;
  placeholder?: string;
  multiSelect?: boolean; // If false, only one item can be linked at a time (default: true)
}

const LinkComponent: React.FC<StaffListComponentWithTabProps> = ({
  style,
  onClose,
  isVisible,
  data = [],
  linkTo = [],
  onStatusChange,
  onApply,
  loading = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  totalItems: _totalItems = 0,
  from: _from,
  title,
  placeholder,
  multiSelect = true, // Default to true for backward compatibility
}) => {
  const { small, xsmall } = defaultIconSizes;
  const [searchQuery, setSearchQuery] = useState(''); // Search state

  // State for original data and working copy
  const [originalData, setOriginalData] = useState<listDataType[]>([]);
  const [listData, setListData] = useState<listDataType[]>([]);

  // Initialize both original and working data when prop data changes
  useEffect(() => {
    // Set link status based on linkTo array (with null safety)
    const updatedData = data.map(item => ({
      ...item,
      linkStatus: linkTo && Array.isArray(linkTo) && linkTo.includes(item.id) ? LINKED : UNLINKED,
    }));

    setOriginalData(updatedData);
    setListData(updatedData);
  }, [data, linkTo]);

  useEffect(() => {
    if (isVisible === false) {
      setSearchQuery('');
    }
  }, [isVisible]);

  // Filter list based on search query
  const filteredData = useMemo(() => {
    const list = Array.isArray(listData) ? listData : [];
    const q = searchQuery.trim().toLowerCase();
    if (q.length === 0) {
      return list;
    }
    return list.filter(item => (item?.name ?? '').toLowerCase().includes(q));
  }, [listData, searchQuery]);

  // Toggle linked/unlinked status
  const toggleLinkStatus = (itemId: number) => {
    setListData(prevState => {
      const itemToToggle = prevState.find(item => item.id === itemId);
      const isCurrentlyLinked = itemToToggle?.linkStatus === LINKED;

      // If multiSelect is false and we're linking a new item, unlink all other items
      if (!multiSelect && !isCurrentlyLinked) {
        return prevState.map(item =>
          item.id === itemId
            ? {
                ...item,
                linkStatus: LINKED,
              }
            : {
                ...item,
                linkStatus: UNLINKED,
              }
        );
      }

      // Default behavior: toggle the clicked item
      return prevState.map(item =>
        item.id === itemId
          ? {
              ...item,
              linkStatus: item.linkStatus === LINKED ? UNLINKED : LINKED,
            }
          : item
      );
    });
  };

  // Get all categories from data.categories array (same logic as ConcernListContent)
  const getCategoryData = (item: listDataType) => {
    let categoryBaseText = '';
    let categoryCount: number | null = null;

    if (item.categories && Array.isArray(item.categories) && item.categories.length > 0) {
      const validCategories = item.categories.filter(cat => cat && cat.name);
      const categoryNames = validCategories.map(cat => cat.name);

      if (categoryNames.length > 3) {
        categoryBaseText = categoryNames.slice(0, 3).join(', ');
        categoryCount = categoryNames.length - 3;
      } else {
        categoryBaseText = categoryNames.join(', ');
      }
    } else {
      categoryBaseText = item.categoryName || '';
    }

    return { categoryBaseText, categoryCount };
  };

  // Get all grades from data.grades array (same logic as ConcernListContent)
  const getGradeData = (item: listDataType) => {
    let gradeBaseText = '';
    let gradeCount: number | null = null;

    if (item.grades && Array.isArray(item.grades) && item.grades.length > 0) {
      const validGrades = item.grades.filter(grade => grade && grade.name);
      const gradeNames = validGrades.map(grade => grade.name);

      if (gradeNames.length > 3) {
        gradeBaseText = gradeNames.slice(0, 3).join(', ');
        gradeCount = gradeNames.length - 3;
      } else {
        gradeBaseText = gradeNames.join(', ');
      }
    } else {
      gradeBaseText = item.gradeName || '';
    }

    return { gradeBaseText, gradeCount };
  };

  const renderData = ({ item }: { item: listDataType }) => {
    const isLinked = item.linkStatus === LINKED;
    const { categoryBaseText, categoryCount } = getCategoryData(item);
    const { gradeBaseText, gradeCount } = getGradeData(item);
    // Show title only for concerns (check if title contains "concern")
    const isConcern = title?.toLowerCase().includes('concern') || false;
    // Determine which is the last item to remove bottom margin
    const hasProduct = !!(item.productName && item.productName !== 'N/A');
    const hasCategory = !!categoryBaseText;
    const hasGrade = !!gradeBaseText;

    return (
      <View style={[outerShadow, styles.renderItemContent]}>
        <View style={styles.itemContent}>
          <View style={styles.itemLeftColumn}>
            {isConcern && item.name && (
              <Text style={styles.itemLabel}>{item.name}</Text>
            )}
            {item.productName && item.productName !== 'N/A' && (
              <>
                <Text style={styles.itemLabelText}>Product:</Text>
                <Text style={[styles.itemProduct, !hasCategory && !hasGrade && { marginBottom: 0 }]}>
                  {item.productName}
                </Text>
              </>
            )}
            {categoryBaseText && (
              <>
                <Text style={styles.itemLabelText}>Category:</Text>
                <Text style={[styles.itemCategory, !hasGrade && { marginBottom: 0 }]}>
                  {categoryBaseText}
                  {categoryCount !== null && (
                    <Text style={styles.countText}> (+{categoryCount})</Text>
                  )}
                </Text>
              </>
            )}
            {gradeBaseText && (
              <>
                <Text style={styles.itemLabelText}>Grade:</Text>
                <Text style={[styles.itemTitle, { marginBottom: 0 }]}>
                  {gradeBaseText}
                  {gradeCount !== null && (
                    <Text style={styles.countText}> (+{gradeCount})</Text>
                  )}
                </Text>
              </>
            )}
          </View>
          <View style={styles.itemRight}>
            <TouchableOpacity
              onPress={() => toggleLinkStatus(item.id)}
              activeOpacity={0.7}
              style={[
                styles.linkButtonBase,
                isLinked ? styles.linkedButton : styles.unlinkedButton,
              ]}
            >
              <AppText style={isLinked ? styles.linkedText : styles.unlinkedText}>
                {isLinked ? 'Unlink' : 'Link'}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Reset button resets working data to original and clears search
  const onResetButton = () => {
    setListData(originalData);
    setSearchQuery('');
  };

  // Apply button commits changes and returns all currently linked IDs
  const onApplyButton = () => {
    // Get all currently linked IDs
    const linkedIds = listData.filter(item => item.linkStatus === LINKED).map(item => item.id);

    // Update originalData to current listData
    setOriginalData(listData);

    // Trigger callback with all linked IDs
    if (onStatusChange) {
      onStatusChange(linkedIds);
    }

    // Call onApply callback if provided (for API calls) - pass linked IDs directly
    if (onApply) {
      onApply(linkedIds);
    }
  };

  // Handle load more for pagination
  const handleLoadMore = () => {
    if (hasMore && !loadingMore && onLoadMore) {
      onLoadMore();
    }
  };

  const renderEmpty = () => (
    <View style={styles.renderEmpty}>
      <Text style={styles.renderEmptyText}>
        {filteredData.length === 0 ? 'No matches found.' : ''}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View style={styles.renderFooter}>
        <AppLoder size="small" color={colors.gray1000} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style}>
      <View style={styles.titleContiner}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            setSearchQuery('');
            onClose();
          }}
        >
          <CloseIcon width={xsmall} height={xsmall} color={colors.gray1000} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchComponent}>
        <SearchBar
          leftIcon={
            <AppImage
              image={Images.SEARCH_ICON}
              mainStyle={styles.image}
              resizeMode="contain"
              from="search"
            />
          }
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.listContiner}>
        <FlatList
          data={filteredData}
          renderItem={renderData}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          keyboardShouldPersistTaps="handled"
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          windowSize={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
        />
      </View>

      <View style={styles.bottomCommonView1}>
        <AppButton
          onPress={onResetButton}
          style={styles.resetButton1}
          textStyle={styles.resetButtonText1}
        >
          Reset all
        </AppButton>
        <AppButton onPress={onApplyButton} style={styles.applyButton1} disabled={loading}>
          {loading ? (
            <AppLoder size="small" color={colors.white} />
          ) : (
            <AppText style={styles.buttonText1}>Apply</AppText>
          )}
        </AppButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LinkComponent;
