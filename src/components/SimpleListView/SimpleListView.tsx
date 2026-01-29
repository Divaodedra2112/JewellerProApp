import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { AppText } from '../AppText/AppText';
import { Swipeable } from 'react-native-gesture-handler';
import { colors } from '../../utils/theme';
import { DeleteIcon, EditIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import styles from './styles';
import { useSwipeable } from '../ProductCard/useSwipeable';
import { SHOW_DESCRIPTION } from '../../utils/Const';
import { usePermission } from '../../rbac';
import { showToast, TOAST_TYPE } from '../../utils/toast';
import { createSwipeActionStyles } from '../../utils/swipeActionStyles';

interface SimpleListViewProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  setOpenSwipeable: (ref: Swipeable | null) => void;
  currentOpenSwipeable: React.MutableRefObject<Swipeable | null>;
  testID?: string;
  moduleKey?: string; // For permission checking
}

type BaseListItem = {
  id: number | string;
  name?: string;
  description?: string | null;
  status: string;
  [key: string]: any;
};

const SimpleListView = <T extends BaseListItem>({
  item,
  onEdit,
  onDelete,
  setOpenSwipeable,
  currentOpenSwipeable,
  testID,
  moduleKey = 'item', // Default module key
}: SimpleListViewProps<T>) => {
  const { small } = defaultIconSizes;
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

  // -------------------------------
  // 🔹 Show More / Show Less (line-based)
  // -------------------------------
  const MAX_VISIBLE_LINES = 2;
  const [canExpand, setCanExpand] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded(prev => !prev);
  }, []);

  // Show expand button only for descriptions that are likely to span more than 2 lines
  React.useEffect(() => {
    if (item.description && item.description.trim().length > 0) {
      // Use a more conservative character count - only show button for longer text
      // Assuming ~30-40 characters per line on mobile, show button for 80+ characters
      const shouldShowButton = item.description.length > 80;
      setCanExpand(shouldShowButton);
      setIsDescriptionExpanded(false);
    } else {
      setCanExpand(false);
      setIsDescriptionExpanded(false);
    }
  }, [item.description]);

  const renderSwipeActions = useCallback(() => {
    const hasEditPermission = onEdit && has(moduleKey, 'update');
    const hasDeletePermission = onDelete && has(moduleKey, 'delete');
    const dynamicStyles = createSwipeActionStyles({
      hasEdit: Boolean(hasEditPermission),
      hasDelete: Boolean(hasDeletePermission),
    });

    return (
      <View style={styles.swipContent}>
        {hasEditPermission && (
          <TouchableOpacity
            onPress={handleEdit}
            style={dynamicStyles.swipIconWithOutBackground}
            accessibilityLabel={`Edit ${moduleKey}`}
            accessibilityRole="button"
          >
            <EditIcon width={small} height={small} color={colors.Gray80} />
          </TouchableOpacity>
        )}

        {hasDeletePermission && (
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
  }, [handleEdit, handleDelete, small, onEdit, onDelete, has, moduleKey]);

  // Enable swipe only if user has any permitted action and handler exists
  const hasEditPermission = onEdit && has(moduleKey, 'update');
  const hasDeletePermission = onDelete && has(moduleKey, 'delete');
  // Disable swipe if item name contains "Other"
  const isOtherItem = item.name?.toLowerCase().includes('other') ?? false;
  const hasSwipeActions = Boolean((hasEditPermission || hasDeletePermission) && !isOtherItem);

  const CardBody = (
    <Layout style={canExpand ? styles.layoutContainer : styles.layoutContainerWithMarginBottom}>
      {item.name && (
        <Layout style={[item.description ? styles.commonMarginBottom : null]}>
          <AppText style={styles.gradeTitle}>{item.name}</AppText>
        </Layout>
      )}

      {Boolean(item.description) && (
        <Layout>
          <AppText
            style={styles.gradeDescription}
            numberOfLines={isDescriptionExpanded ? undefined : MAX_VISIBLE_LINES}
            ellipsizeMode="tail"
          >
            {item.description}
          </AppText>

          {canExpand && (
            <View style={styles.showMoreLessContainer}>
              <TouchableOpacity onPress={toggleDescription}>
                <AppText style={styles.showMoreLess}>
                  {isDescriptionExpanded ? SHOW_DESCRIPTION.SHOW_LESS : SHOW_DESCRIPTION.SHOW_MORE}
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </Layout>
      )}
    </Layout>
  );

  return (
    <View style={[outerShadow, styles.swipBackground]} testID={testID}>
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
          {CardBody}
        </Swipeable>
      ) : (
        <View style={styles.commonBorder}>{CardBody}</View>
      )}
    </View>
  );
};

export default React.memo(SimpleListView) as typeof SimpleListView;
