import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../../../store';
import { CustomHeader, EmptyState } from '../../../components';
import { AppText } from '../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../components/AppText/AppText';
import { fetchSubCategories } from './SubCategoryActions';
import { setCategoryInfo } from '../../../store/slices/subCategorySlice';
import { MainStackParamList } from '../../../types/navigation';
import { SubCategory } from './SubCategoryTypes';
import { SubCategorySkeleton } from './components/SubCategorySkeleton/SubCategorySkeleton';
import { scale, verticalScale, moderateScale } from '../../../utils/Responsive';
import { colors } from '../../../utils/theme';
import { ChevronRightIcon } from '../../../assets/icons/svgIcons/appSVGIcons';
import { styles } from './styles';
import { logger } from '../../../utils/logger';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;
type SubCategoryRouteProp = RouteProp<MainStackParamList, 'SubCategory'>;

const SubCategoryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SubCategoryRouteProp>();
  const { categoryId, categoryTitle } = route.params;

  const { subCategories, loading, error } = useSelector(
    (state: RootState) => state.subCategory
  );

  // Set category info and fetch subcategories on mount
  useEffect(() => {
    dispatch(setCategoryInfo({ categoryId, categoryTitle }));
    dispatch(fetchSubCategories(categoryId));
  }, [dispatch, categoryId, categoryTitle]);

  // Handle subcategory press
  const handleSubCategoryPress = useCallback(
    (subCategory: SubCategory) => {
      logger.info('SubCategory Screen - SubCategory pressed', {
        subCategoryId: subCategory.id,
        subCategoryTitle: subCategory.title,
      });
      navigation.navigate('Topic', {
        id: subCategory.id,
        title: subCategory.title,
        type: 'subcategory',
      });
    },
    [navigation]
  );

  // Filter only ACTIVE subcategories and sort by order
  const activeSubCategories = subCategories
    .filter(subCategory => subCategory.status === 'ACTIVE')
    .sort((a, b) => a.order - b.order);

  return (
    <View style={styles.container}>
      <CustomHeader title={categoryTitle || t('subCategory.title', 'Sub Categories')} showBackButton={true} />
      
      {(loading && subCategories.length === 0) || (error && subCategories.length === 0) ? (
        <SubCategorySkeleton />
      ) : activeSubCategories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState
            message={t('subCategory.empty', 'No subcategories available')}
            description={t('subCategory.emptyDescription', 'Check back later for updates')}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeSubCategories.map((subCategory) => (
            <TouchableOpacity
              key={subCategory.id}
              style={styles.card}
              onPress={() => handleSubCategoryPress(subCategory)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.title}>
                    {subCategory.title}
                  </AppText>
                  {subCategory.description && (
                    <AppText variant={TEXT_VARIANTS.h6_small} style={styles.description}>
                      {subCategory.description}
                    </AppText>
                  )}
                </View>
                <View style={styles.chevronContainer}>
                  <ChevronRightIcon
                    width={scale(20)}
                    height={scale(20)}
                    color={colors.gray400}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SubCategoryScreen;

