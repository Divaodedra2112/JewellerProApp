import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, TouchableOpacity, View, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../../utils/theme';
import { styles } from './styles';
import { CheckmarkCircleIcon, DeselectCircleIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';

interface ListItemData {
  id: number | string;
  name: string;
  fontColor?: string;
  backgroundColor?: string;
  icon?: string;
  statusCategory?: string;
  sortOrder?: number;
}

interface ListComponentProps {
  data: ListItemData[];
  selectedConcern?: number | string | null;
  onItemSelect: (item: ListItemData) => void;
  onLoadMore?: () => void;
  hasMoreData?: boolean;
  isLoadingMore?: boolean;
}

const ListComponent: React.FC<ListComponentProps> = ({
  data,
  selectedConcern = null,
  onItemSelect,
  onLoadMore,
  hasMoreData = false,
  isLoadingMore = false,
}) => {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  useEffect(() => {
    if (selectedConcern == null) {
      setSelectedId(null);
      return;
    }
    const defaultItem = data.find(item => item.id === selectedConcern);
    if (defaultItem) {
      setSelectedId(defaultItem.id);
    }
  }, [selectedConcern, data]);

  const renderItem = ({ item, index }: { item: ListItemData; index: number }) => {
    const isSelected = item.id === selectedId;
    const isLastItem = index === data.length - 1;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setSelectedId(item.id);
          onItemSelect(item);
        }}
        style={[
          outerShadow,
          styles.card,
          isSelected && styles.cardSelected,
          { marginBottom: isLastItem ? 24 : 12 },
        ]}
        accessibilityRole="button"
      >
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
          </View>

          <View style={styles.selectItemContainer}>
            {isSelected ? (
              <CheckmarkCircleIcon
                width={defaultIconSizes.small}
                height={defaultIconSizes.small}
                color={colors.primary ?? colors.black}
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

  const keyExtractor = useCallback((item: ListItemData, index: number) => {
    const baseId = item?.id != null ? String(item.id) : 'no-id';
    return `${baseId}-${index}`;
  }, []);

  const handleEndReached = useCallback(() => {
    if (onLoadMore && hasMoreData && !isLoadingMore) {
      onLoadMore();
    }
  }, [onLoadMore, hasMoreData, isLoadingMore]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore && data.length > 0 ? (
            <View style={{ paddingVertical: 8, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={colors.primary ?? colors.black} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ListComponent;
