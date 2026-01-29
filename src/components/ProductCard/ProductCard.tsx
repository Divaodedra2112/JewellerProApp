import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { Swipeable } from 'react-native-gesture-handler';
import { colors } from '../../utils/theme';
import { DeleteIcon, EditIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import styles from './ProductCard.styles';
import { ProductDetail } from '../../modules/main/Products/Product/ProductTypes';
import { useSwipeable } from './useSwipeable';
import { usePermission } from '../../rbac';
import { showToast, TOAST_TYPE } from '../../utils/toast';
import { createSwipeActionStyles } from '../../utils/swipeActionStyles';

interface ProductCardProps {
  item: ProductDetail;
  onEdit?: (item: ProductDetail) => void;
  onDelete?: (item: ProductDetail) => void;
  onPress: (item: ProductDetail) => void;
  setOpenSwipeable: (ref: Swipeable | null) => void;
  currentOpenSwipeable: React.MutableRefObject<Swipeable | null>;
  testID?: string;
  moduleKey?: string; // For permission checking
  index?: number; // Index of the item in the list
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onEdit,
  onDelete,
  onPress,
  setOpenSwipeable,
  currentOpenSwipeable,
  testID,
  moduleKey = 'product', // Default to 'product' for backward compatibility
  index = 0,
}) => {
  const { xsmall, small } = defaultIconSizes;
  const { has } = usePermission();
  const { swipeableRef, handleSwipeableOpen, closeSwipeable } = useSwipeable({
    currentOpenSwipeable,
    setOpenSwipeable,
  });

  const handleEdit = useCallback(() => {
    closeSwipeable();
    if (!has(moduleKey, 'update')) {
      showToast(TOAST_TYPE.ERROR, `You do not have permission to edit this ${moduleKey}`);
      return;
    }
    onEdit?.(item);
  }, [closeSwipeable, onEdit, item, has, moduleKey]);

  const handleDelete = useCallback(() => {
    closeSwipeable();
    if (!has(moduleKey, 'delete')) {
      showToast(TOAST_TYPE.ERROR, `You do not have permission to delete this ${moduleKey}`);
      return;
    }
    onDelete?.(item);
  }, [closeSwipeable, onDelete, item, has, moduleKey]);

  const handlePress = useCallback(() => {
    closeSwipeable();
    onPress(item);
  }, [closeSwipeable, onPress, item]);

  const renderSwipeActions = useCallback(() => {
    const dynamicStyles = createSwipeActionStyles({
      hasEdit: Boolean(onEdit && hasEditPermission),
      hasDelete: Boolean(onDelete && hasDeletePermission),
    });

    return (
      <View style={styles.swipContent}>
        {onEdit && hasEditPermission && (
          <TouchableOpacity
            onPress={handleEdit}
            style={dynamicStyles.swipIconWithOutBackground}
            accessibilityLabel={`Edit ${moduleKey}`}
            accessibilityRole="button"
          >
            <EditIcon width={small} height={small} color={colors.Gray80} />
          </TouchableOpacity>
        )}

        {onDelete && hasDeletePermission && (
          <TouchableOpacity
            onPress={handleDelete}
            style={dynamicStyles.swipIconWithBackground}
            accessibilityLabel={`Delete ${moduleKey}`}
            accessibilityRole="button"
          >
            <DeleteIcon width={small} height={small} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    );
  }, [
    handleEdit,
    handleDelete,
    small,
    onEdit,
    onDelete,
    hasEditPermission,
    hasDeletePermission,
    moduleKey,
  ]);

  // ADDED: Grades pills + toggle
  const MAX_VISIBLE = 3;
  const [expanded, setExpanded] = useState(false);
  const grades = useMemo(() => item?.grades ?? [], [item]);
  const hasOverflow = grades.length > MAX_VISIBLE;
  const visibleGrades = expanded || !hasOverflow ? grades : grades.slice(0, MAX_VISIBLE);

  // Only enable swipe if there are actions available AND user has permissions
  const hasEditPermission = has(moduleKey, 'update');
  const hasDeletePermission = has(moduleKey, 'delete');
  const hasSwipeActions = (onEdit && hasEditPermission) || (onDelete && hasDeletePermission);

  const cardContent = (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityLabel={`Product: ${item.productName}`}
      accessibilityRole="button"
    >
      <Layout style={styles.content}>
        {/* Text Section */}
        <Layout style={styles.textSection}>
          <Layout style={styles.commonMarginBottom}>
            <AppText variant={TEXT_VARIANTS.h5_medium} style={styles.title}>
              {item.productName}
            </AppText>
          </Layout>
          <Layout style={styles.commonMarginBottom}>
            <AppText variant={TEXT_VARIANTS.h5_medium} style={styles.description}>
              {(() => {
                // Handle categories array (new format)
                if (
                  item.categories &&
                  Array.isArray(item.categories) &&
                  item.categories.length > 0
                ) {
                  return item.categories
                    .map((cat: { id: number; name: string }) => cat.name)
                    .join(', ');
                }
                // Fallback to single category (backward compatibility)
                if (item.category?.name) {
                  return item.category.name;
                }
                return 'Others';
              })()}
            </AppText>
          </Layout>

          {/* ADDED: Grades pills row (shows "Show all" only when > 3) */}
          {grades.length > 0 && (
            <Layout style={styles.pillsRow}>
              {visibleGrades.map(g => (
                <View
                  key={g.id}
                  style={styles.pill}
                  accessibilityRole="text"
                  accessibilityLabel={`Grade: ${g.name}`}
                >
                  <AppText variant={TEXT_VARIANTS.h5_medium} style={styles.pillText}>
                    {g.name}
                  </AppText>
                </View>
              ))}

              {hasOverflow && (
                <View style={styles.showAllBtnContainer}>
                  <TouchableOpacity
                    onPress={() => setExpanded(v => !v)}
                    accessibilityRole="button"
                    accessibilityLabel={expanded ? 'Show less grades' : 'Show all grades'}
                    style={styles.showAllBtn}
                  >
                    <AppText variant={TEXT_VARIANTS.h5_medium} style={styles.expandBtnText}>
                      {expanded ? 'Show less' : 'Show all'}
                    </AppText>
                  </TouchableOpacity>
                </View>
              )}
            </Layout>
          )}
        </Layout>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <View
      style={[outerShadow, styles.swipBackground, index === 0 && styles.firstItemMarginTop]}
      testID={testID}
    >
      {hasSwipeActions ? (
        <Swipeable
          ref={swipeableRef}
          onSwipeableWillOpen={handleSwipeableOpen}
          renderRightActions={renderSwipeActions}
          friction={2}
          overshootFriction={8}
          animationOptions={{ duration: 150 }}
          overshootRight={false}
          containerStyle={styles.commonBorder}
        >
          {cardContent}
        </Swipeable>
      ) : (
        <View style={styles.commonBorder}>{cardContent}</View>
      )}
    </View>
  );
};

export default React.memo(ProductCard);
