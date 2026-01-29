// MultiListComponent.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Keyboard, TouchableOpacity, View } from 'react-native';
import { List, Text } from '@ui-kitten/components';
import { colors } from '../../utils/theme';
import { styles } from './styles';
import {
  CheckmarkCircleIcon,
  DeselectCircleIcon,
  RefreshIcon,
} from '../../assets/icons/svgIcons/appSVGIcons';
import NoResultsFoundScreen from '../../modules/UtilityScreens/NoResultsFoundScreen';
import { moderateScale } from '../../utils/Responsive';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';

// Search + count header bits
import AppImage from '../AppImage/AppImage';
import { Images } from '../../utils';
import SearchBar from '../SearchComponent/SearchBar';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';

interface ListItemData {
  id: string;
  name: string;
  disabled?: boolean;
  isPrimary?: boolean;
}

interface ListComponentProps {
  data: ListItemData[];
  onItemSelect: (selectedItems: ListItemData[]) => void;
  selectedConcern?: string[];

  /** Optional header props */
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof ListItemData)[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showMetaHeader?: boolean;
  metaLabel?: string;
  searchLeftIcon?: React.ReactNode;
  searchBarProps?: Partial<{
    autoFocus: boolean;
    returnKeyType: string;
    onSubmitEditing: () => void;
  }>;

  /** Optional: select-all toggle (works on filtered, enabled items) */
  showSelectAllToggle?: boolean;

  /** Optional: pagination props */
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMoreData?: boolean;

  /** Optional: external search control (for API-based search) */
  onSearchChange?: (text: string) => void;
  searchValue?: string;
  isSearching?: boolean;
  totalCount?: number; // Total count from API (for showing "All Results (X)")
}

const MultiListComponent: React.FC<ListComponentProps> = ({
  data,
  onItemSelect,
  selectedConcern,

  searchable = false,
  searchPlaceholder = 'Search',
  searchKeys = ['name'],
  onRefresh,
  isRefreshing = false,
  showMetaHeader = false,
  metaLabel = 'All Results',
  searchLeftIcon,
  searchBarProps,

  showSelectAllToggle = false,

  onLoadMore,
  isLoadingMore = false,
  hasMoreData = false,

  onSearchChange,
  searchValue,
  isSearching = false,
  totalCount,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  // Use external search value if provided, otherwise use internal state
  const currentSearchValue = onSearchChange ? searchValue || '' : query;
  const isUsingExternalSearch = !!onSearchChange;

  // hydrate default selections from parent
  useEffect(() => {
    if (Array.isArray(selectedConcern)) {
      const defaultSelectedIds = data
        .filter(item => selectedConcern.includes(item.id))
        .map(item => item.id);
      setSelectedIds(defaultSelectedIds);
    }
  }, [selectedConcern, data]);

  // Handle search text change
  const handleSearchChange = (text: string) => {
    if (isUsingExternalSearch) {
      onSearchChange!(text);
    } else {
      setQuery(text);
    }
  };

  // filter based on query - only filter locally if not using external search
  const filtered = useMemo(() => {
    // If using external search, data is already filtered from API
    if (isUsingExternalSearch) {
      return data;
    }
    // Otherwise, do client-side filtering
    const q = query.trim().toLowerCase();
    if (!q) {
      return data;
    }
    return data.filter(item =>
      searchKeys.some(k =>
        String(item[k] ?? '')
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, query, searchKeys, isUsingExternalSearch]);

  const handleSelect = (item: ListItemData) => {
    Keyboard.dismiss();
    const already = selectedIds.includes(item.id);
    const next = already ? selectedIds.filter(id => id !== item.id) : [...selectedIds, item.id];

    setSelectedIds(next);
    onItemSelect(data.filter(i => next.includes(i.id)));
  };

  const handleToggleSelectAll = () => {
    const enabledIds = filtered.filter(i => !i.disabled).map(i => i.id);
    const allSelected = enabledIds.length > 0 && enabledIds.every(id => selectedIds.includes(id));
    const next = allSelected
      ? selectedIds.filter(id => !enabledIds.includes(id)) // clear only filtered enabled
      : Array.from(new Set([...selectedIds, ...enabledIds]));

    setSelectedIds(next);
    onItemSelect(data.filter(i => next.includes(i.id)));
  };

  // Handle load more for pagination
  const handleLoadMore = useCallback(() => {
    if (onLoadMore && hasMoreData && !isLoadingMore) {
      onLoadMore();
    }
  }, [onLoadMore, hasMoreData, isLoadingMore]);

  const renderItem = ({ item, index }: { item: ListItemData; index: number }) => {
    const isSelected = selectedIds.includes(item.id);
    const { small } = defaultIconSizes;
    const isLastItem = index === filtered.length - 1;

    let textColor = styles.text.color as string;
    if (item.disabled) {
      textColor = colors.gray400;
    } else if (item.isPrimary) {
      textColor = colors.red;
    }

    return (
      <TouchableOpacity
        onPress={() => !item.disabled && handleSelect(item)}
        disabled={!!item.disabled}
        style={[
          outerShadow,
          styles.shadowLayer1,
          {
            borderColor: isSelected ? colors.black : 'transparent',
            backgroundColor: isSelected ? colors.gray1100 : colors.white,
            marginBottom: isLastItem ? moderateScale(24) : moderateScale(8),
            opacity: item.disabled ? 0.5 : 1,
            borderWidth: isSelected ? 2 : 0,
          },
        ]}
        accessibilityRole="button"
      >
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: textColor }]}>{item.name}</Text>
          {isSelected ? (
            <CheckmarkCircleIcon
              width={defaultIconSizes.small}
              height={defaultIconSizes.small}
              color={colors.commonShadowColor}
            />
          ) : (
            <DeselectCircleIcon
              width={defaultIconSizes.small}
              height={defaultIconSizes.small}
              color={colors.gray100}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const showHeader = searchable || showMetaHeader || showSelectAllToggle;

  // derive header toggle state once
  const filteredEnabledIds = filtered.filter(i => !i.disabled).map(i => i.id);
  const allFilteredEnabledSelected =
    filteredEnabledIds.length > 0 && filteredEnabledIds.every(id => selectedIds.includes(id));

  return (
    <View style={styles.commonFlex1}>
      {showHeader && (
        <View style={styles.searchBarContainer}>
          {searchable && (
            <SearchBar
              leftIcon={
                searchLeftIcon ?? (
                  <AppImage
                    image={Images.SEARCH_ICON}
                    mainStyle={styles.image}
                    resizeMode="contain"
                    from="search"
                  />
                )
              }
              placeholder={searchPlaceholder}
              value={currentSearchValue}
              onChangeText={handleSearchChange}
              rightIcon={null}
              onRightIconPress={() => {}}
              isLoading={isUsingExternalSearch && isSearching}
            />
          )}

          <View style={styles.allResultsContainer}>
            <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.roadCount}>
              {metaLabel} ({totalCount !== undefined ? totalCount : filtered.length})
            </AppText>

            {(onRefresh || isRefreshing) && (
              <TouchableOpacity
                onPress={onRefresh}
                disabled={!onRefresh || isRefreshing}
                style={styles.refreshTouch}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Refresh list"
              >
                {isRefreshing ? (
                  <ActivityIndicator size="small" color={colors.black} />
                ) : (
                  <RefreshIcon />
                )}
              </TouchableOpacity>
            )}

            {showSelectAllToggle && (
              <TouchableOpacity
                onPress={handleToggleSelectAll}
                style={styles.selectAllIconTouch}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={allFilteredEnabledSelected ? 'Clear all' : 'Select all'}
              >
                {allFilteredEnabledSelected ? (
                  <CheckmarkCircleIcon
                    width={defaultIconSizes.small}
                    height={defaultIconSizes.small}
                    color={colors.commonShadowColor}
                  />
                ) : (
                  <DeselectCircleIcon
                    width={defaultIconSizes.small}
                    height={defaultIconSizes.small}
                    color={colors.gray100}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <List
        contentContainerStyle={styles.ccs}
        style={styles.list}
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoResultsFoundScreen />}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        ListFooterComponent={
          isLoadingMore && filtered.length > 0 ? (
            <View style={{ paddingVertical: moderateScale(16), alignItems: 'center' }}>
              <ActivityIndicator size="small" color={colors.black} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default MultiListComponent;
