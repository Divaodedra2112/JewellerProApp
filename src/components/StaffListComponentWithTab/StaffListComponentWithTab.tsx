import React, { useMemo, useState, useCallback } from 'react';
import { TouchableOpacity, View, Keyboard } from 'react-native';

import { defaultIconSizes, defaultImageSize, outerShadow } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import styles from './StaffListComponentWithTab.style';
import { AppText } from '../AppText/AppText';
import {
  CheckmarkCircleIcon,
  CloseIcon,
  DeselectCircleIcon,
} from '../../assets/icons/svgIcons/appSVGIcons';
import { moderateScale } from '../../utils/Responsive';
import { StaffDetail } from '../../modules/main/Staff/StaffList/StaffListType';
import { Avatar } from '@kolking/react-native-avatar';
import { TabHorizontal, SegmentOption } from '../TabHorizontal/TabHorizontal';
import { FlatList } from 'react-native-gesture-handler';
import { truncateText } from '../../utils/commonFunctions';
import SearchBar from '../SearchComponent/SearchBar';
import { Images } from '../../utils';
import AppImage from '../AppImage/AppImage';

interface StaffListComponentWithTabProps {
  title?: string;
  style?: any;
  staffList: StaffDetail[];
  selectedId?: number | null;
  onItemSelect: (staff: StaffDetail | null) => void;
  imageShow?: boolean;
  roadId?: any;
  roadName?: string;
  onClose: () => void;
  // Pagination props
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

type TabKey = 'related' | 'all';

const makeTabOptions = (roadLabel?: string): SegmentOption<TabKey>[] => [
  {
    label: truncateText(`${roadLabel?.trim() || 'Selected'} staff`, 15),
    value: 'related',
  },
  {
    label: 'Other road staff',
    value: 'all',
  },
];

const StaffListComponentWithTab: React.FC<StaffListComponentWithTabProps> = ({
  title,
  style,
  staffList = [],
  selectedId,
  onItemSelect,
  imageShow = false,
  roadId,
  roadName,
  onClose,
  // Pagination props
  loading = false,
  hasMore = false,
  onLoadMore,
  refreshing = false,
  onRefresh,
}) => {
  // Local search state
  const [searchQuery, setSearchQuery] = useState('');
  const { small } = defaultIconSizes;

  // Local selection fallback (if parent doesn't control selectedId)
  const [localSelectedId, setLocalSelectedId] = useState<number | null>(selectedId ?? null);
  const effectiveSelectedId = selectedId ?? localSelectedId;

  // Tabs state
  const [tab, setTab] = useState<TabKey>('related');

  // Normalize staff list
  const normalizedStaff = useMemo(
    () =>
      (Array.isArray(staffList) ? staffList : []).filter(
        (s): s is StaffDetail => !!s && typeof s.id === 'number'
      ),
    [staffList]
  );

  // Helper: is staff on this road?
  const isOnThisRoad = useCallback(
    (s: StaffDetail) => {
      const roadIdStr = roadId == null ? '' : String(roadId);
      if (!roadIdStr) {
        return false;
      }
      const ids = Array.isArray((s as any).roads)
        ? (s as any).roads.map((r: any) => (r?.id == null ? null : String(r.id))).filter(Boolean)
        : [];
      return ids.includes(roadIdStr);
    },
    [roadId]
  );

  // Derive road display name if roadName not passed
  const roadLabel = useMemo(() => {
    if (roadName && roadName.trim()) {
      return roadName;
    }
    if (!roadId) {
      return undefined;
    }
    const staffWithRoad = normalizedStaff.find(isOnThisRoad);
    const roadObj = Array.isArray((staffWithRoad as any)?.roads)
      ? (staffWithRoad as any).roads.find((r: any) => String(r?.id) === String(roadId))
      : undefined;
    return roadObj?.name ?? undefined;
  }, [roadName, roadId, normalizedStaff, isOnThisRoad]);

  // Filter logic for tabs
  const filteredStaffByTab = useMemo(() => {
    if (tab === 'related') {
      if (!roadId) {
        return [];
      }
      return normalizedStaff.filter(isOnThisRoad);
    }
    return roadId ? normalizedStaff.filter(s => !isOnThisRoad(s)) : normalizedStaff;
  }, [normalizedStaff, tab, roadId, isOnThisRoad]);

  // Further filter by search query (min 2 chars)
  const filteredStaff = useMemo(() => {
    if (searchQuery.trim().length < 2) {
      return filteredStaffByTab;
    }
    const lowerSearch = searchQuery.toLowerCase();
    return filteredStaffByTab.filter(
      s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(lowerSearch) ||
        s.role?.some(r => r.name?.toLowerCase().includes(lowerSearch))
    );
  }, [filteredStaffByTab, searchQuery]);

  const onPressItem = (item: StaffDetail) => {
    Keyboard.dismiss();

    // If the same item is already selected, deselect it
    if (item.id === effectiveSelectedId) {
      setLocalSelectedId(null);
      onItemSelect(null);
    } else {
      setLocalSelectedId(item.id);
      onItemSelect(item);
    }
  };

  // Pagination handlers
  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore]);

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const renderStaffItem = ({ item, index }: { item: StaffDetail; index: number }) => {
    const isSelected = item.id === effectiveSelectedId;
    const isLastItem = index === filteredStaff.length - 1;

    // Debug logging
    const fullName = `${item.firstName || ''} ${item.lastName || ''}`.trim();
    const profileImageValue = item.profileImage;
    // Check if profileImage is valid (not null, undefined, or empty string)
    const hasProfileImage = !!(
      profileImageValue &&
      typeof profileImageValue === 'string' &&
      profileImageValue.trim().length > 0
    );

    console.log('=== Staff Avatar Debug (WithTab) ===');
    console.log('imageShow:', imageShow);
    console.log('Staff ID:', item.id);
    console.log('First Name:', item.firstName);
    console.log('Last Name:', item.lastName);
    console.log('Full Name:', fullName);
    console.log('Full Name Length:', fullName.length);
    console.log('Has Profile Image:', hasProfileImage);
    console.log('Profile Image Value:', profileImageValue);
    console.log('Profile Image Type:', typeof profileImageValue);
    console.log('Profile Image is null?:', profileImageValue === null);
    console.log('Profile Image is undefined?:', profileImageValue === undefined);
    console.log('Profile Image Length:', profileImageValue?.length);
    console.log(
      'Source prop:',
      hasProfileImage ? { uri: item.profileImage } : 'OMITTED (will use defaultSource)'
    );
    console.log('Avatar will receive:', {
      ...(hasProfileImage ? { source: { uri: item.profileImage } } : {}),
      name: fullName,
      nameLength: fullName.length,
      hasName: fullName.length > 0,
      colorize: true,
      size: defaultImageSize.medium,
    });
    console.log('====================================');

    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[
          outerShadow,
          styles.shadowLayer1,
          isSelected ? styles.selectedItem : styles.unselectedItem,
          {
            backgroundColor: isSelected ? colors.gray1100 : colors.white,
            marginBottom: isLastItem ? moderateScale(240) : moderateScale(8),
          },
        ]}
      >
        <View style={styles.staffItemContainer}>
          <View style={styles.staffContentContainer}>
            {imageShow && (
              <Avatar
                {...(hasProfileImage ? { source: { uri: item.profileImage! } } : {})}
                name={fullName}
                size={defaultImageSize.medium}
                colorize={true}
                // style={[styles.imageSection, styles.imageCard]}
              />
            )}

            <View style={styles.textContainer}>
              <AppText style={styles.nameLabel} numberOfLines={0}>
                {`${item.firstName || ''} ${item.lastName || ''}`}
              </AppText>

              <AppText style={styles.roleLabel} numberOfLines={0}>
                {item?.role?.[0]?.name || ''}
              </AppText>
            </View>
          </View>

          <View style={styles.staffIconContainer}>
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style}>
      {/* Title */}

      <View style={styles.titleContainer}>
        <AppText style={styles.title}>{title} </AppText>
        <TouchableOpacity
          onPress={() => {
            setSearchQuery('');
            onClose();
          }}
        >
          <CloseIcon width={small} height={small} color={colors.gray1000} />
        </TouchableOpacity>
      </View>

      {/* Tabs header */}

      <TabHorizontal
        options={makeTabOptions(roadLabel)}
        value={tab}
        onChange={setTab}
        style={{ marginHorizontal: moderateScale(5), marginBottom: moderateScale(8) }}
      />

      {/* Search UI */}
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
          placeholder="Search staff"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Staff list */}
      <FlatList
        data={filteredStaff}
        renderItem={renderStaffItem}
        keyExtractor={(item, index) => (item?.id ?? index).toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View
            style={{ padding: moderateScale(16), justifyContent: 'center', alignItems: 'center' }}
          >
            <AppText>
              {tab === 'related'
                ? `No related staff found for ${roadLabel ?? 'this'}.`
                : 'No staff found for other roads.'}
            </AppText>
          </View>
        }
        ListFooterComponent={
          loading && filteredStaff.length > 0 ? (
            <View style={styles.loadingFooter}>
              <AppText>Loading more staff...</AppText>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default StaffListComponentWithTab;
