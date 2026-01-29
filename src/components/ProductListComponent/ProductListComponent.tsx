import React, { useState, useMemo } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View, Keyboard } from 'react-native';

import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import styles from './ProductListComponent.style';
import {
  CheckmarkCircleIcon,
  CloseIcon,
  DeselectCircleIcon,
} from '../../assets/icons/svgIcons/appSVGIcons';
import { moderateScale } from '../../utils/Responsive';
import NoResultsFoundScreen from '../../modules/UtilityScreens/NoResultsFoundScreen';
import SearchBar from '../SearchComponent/SearchBar';
import AppImage from '../AppImage/AppImage';
import { Images } from '../../utils';
import { FlatList } from 'react-native-gesture-handler';

// Type Definitions for Product and related data
export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface ProductDetail {
  id: number;
  productName: string;
  isSample: boolean;
  sampleQuantity: number | null;
  measurement: string | null;
  description: string;
  category: Category;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  grades: Grade[];
}

interface ProductListComponentProps {
  title?: string;
  style?: any;
  productList: ProductDetail[];
  selectedId?: number | null;
  onItemSelect: (product: ProductDetail) => void;
  onClose: () => void;
}

const ProductListComponent: React.FC<ProductListComponentProps> = ({
  title,
  style,
  productList,
  selectedId,
  onItemSelect,
  onClose,
}) => {
  // Local search state
  const [searchQuery, setSearchQuery] = useState('');
  const { small } = defaultIconSizes;

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (searchQuery.trim().length < 2) {
      return productList;
    }
    const lowerSearch = searchQuery.toLowerCase();
    return productList.filter(
      product =>
        (product.productName?.toLowerCase() || '').includes(lowerSearch) ||
        (product.description?.toLowerCase() || '').includes(lowerSearch) ||
        (product.category?.name?.toLowerCase() || '').includes(lowerSearch) ||
        product.grades?.some(grade => (grade?.name?.toLowerCase() || '').includes(lowerSearch))
    );
  }, [productList, searchQuery]);

  // Render each product item
  const renderProductItem = ({ item, index }: { item: ProductDetail; index: number }) => {
    const isSelected = item.id === selectedId;
    const isLastItem = index === filteredProducts.length - 1;

    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          onItemSelect(item);
        }}
        style={[
          outerShadow,
          styles.shadowLayer1,
          isSelected ? styles.selectedItem : styles.unselectedItem,
          {
            backgroundColor: isSelected ? colors.gray1100 : colors.white,
            marginBottom: isLastItem ? moderateScale(24) : moderateScale(8),
          },
        ]}
      >
        <View style={styles.productItemContainer}>
          <View style={styles.productContentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.productName}</Text>
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
      <View style={styles.titleContiner}>
        <Text style={styles.modalTitle}>{title} </Text>
        <TouchableOpacity
          onPress={() => {
            setSearchQuery('');
            onClose();
          }}
        >
          <CloseIcon width={small} height={small} color={colors.gray1000} />
        </TouchableOpacity>
      </View>

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
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Product list */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()} // Using id as the key
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: moderateScale(24) }}
        ListEmptyComponent={
          <NoResultsFoundScreen
            title="No products found"
            subtitle="Unfortunately, we couldn't find any product results for now."
          />
        }
      />
    </View>
  );
};

export default ProductListComponent;
