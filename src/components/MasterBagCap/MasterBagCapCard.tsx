import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Swipeable } from 'react-native-gesture-handler';
import { colors } from '../../utils/theme';
import { DeleteIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import styles from './MasterBagCapCard.styles';
import { useSwipeable } from './useSwipeable';
import { usePermission } from '../../rbac';
import { showToast, TOAST_TYPE } from '../../utils/toast';
import { createSwipeActionStyles } from '../../utils/swipeActionStyles';
import { MasterBagCapDetail } from '../../modules/main/MasterBagCap/ListMasterBagCap/MasterBagCapTypes';
import { AppText } from '../AppText/AppText';
import { Avatar } from '@kolking/react-native-avatar';
import { defaultImageSize } from '../../utils/CommonStyles';
import { formatDate, formatTextWithCapitalize } from '../../utils/commonFunctions';

interface MasterBagCapCardProps {
  item: MasterBagCapDetail;
  onDelete?: (item: MasterBagCapDetail) => void;
  onPress: (item: MasterBagCapDetail) => void;
  setOpenSwipeable: (ref: Swipeable | null) => void;
  currentOpenSwipeable: React.MutableRefObject<Swipeable | null>;
  testID?: string;
  moduleKey?: string; // For permission checking
}

const MasterBagCapCard: React.FC<MasterBagCapCardProps> = ({
  item,
  onDelete,
  onPress,
  setOpenSwipeable,
  currentOpenSwipeable,
  testID,
  moduleKey = 'product', // Default to 'product' for backward compatibility
}) => {
  const { medium } = defaultIconSizes;
  const { has } = usePermission();
  const { swipeableRef, handleSwipeableOpen, closeSwipeable } = useSwipeable({
    currentOpenSwipeable,
    setOpenSwipeable,
  });

  console.log('item in master bag cap card', item);

  // Only enable swipe if there are actions available AND user has permissions
  const hasDeletePermission = has(moduleKey || 'product', 'delete');
  const hasSwipeActions = onDelete && hasDeletePermission;

  const handleDelete = useCallback(() => {
    closeSwipeable();
    if (!has(moduleKey || 'product', 'delete')) {
      showToast(
        TOAST_TYPE.ERROR,
        `You do not have permission to delete this ${moduleKey || 'product'}`
      );
      return;
    }
    onDelete?.(item);
  }, [closeSwipeable, onDelete, item, has, moduleKey]);

  const handlePress = useCallback(() => {
    closeSwipeable();
    onPress(item);
  }, [closeSwipeable, onPress, item]);

  const formatStripTest = (stripTest: string | undefined): string => {
    if (!stripTest) {
      return '';
    }
    const stripTestMap: Record<string, string> = {
      FOLLOW: 'Follow',
      RARELY: 'Yes, Rarely',
      NOT_FOLLOW: 'Not follow',
    };
    return stripTestMap[stripTest] || formatTextWithCapitalize(stripTest);
  };

  const renderSwipeActions = useCallback(() => {
    const dynamicStyles = createSwipeActionStyles({
      hasEdit: false,
      hasDelete: Boolean(onDelete && hasDeletePermission),
    });

    return (
      <View style={styles.swipContent}>
        {onDelete && hasDeletePermission && (
          <TouchableOpacity
            onPress={handleDelete}
            style={dynamicStyles.swipIconWithBackground}
            accessibilityLabel={`Delete ${moduleKey || 'product'}`}
            accessibilityRole="button"
          >
            <DeleteIcon width={medium} height={medium} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    );
  }, [handleDelete, medium, onDelete, hasDeletePermission, moduleKey]);

  const cardContent = (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      //   accessibilityLabel={`Product: ${item.}`}
      accessibilityRole="button"
    >
      <Layout style={styles.content}>
        <Layout style={styles.commonflex2}>
          <Avatar
            {...(item?.company?.customer?.profileImage
              ? { source: { uri: item.company.customer.profileImage } }
              : {})}
            name={item?.company?.name || ''}
            size={defaultImageSize.medium}
            colorize={true}
            type="company"
            // style={[
            //   styles.imageMainStyle &&
            //     Object.fromEntries(
            //       Object.entries(styles.imageMainStyle).filter(([key]) => key !== 'backgroundColor')
            //     ),
            //   styles.imageStyle &&
            //     Object.fromEntries(
            //       Object.entries(styles.imageStyle).filter(([key]) => key !== 'backgroundColor')
            //     ),
            // ]}
          />
        </Layout>
        <Layout style={styles.detailContext}>
          <AppText style={styles.appTextCompanyName}>{item?.company?.name}</AppText>
          <AppText style={styles.appTextRoadName}>
            Strip test: {formatStripTest(item?.stripTest)}
          </AppText>
          <AppText style={styles.appTextDate}>
            {item?.dateOfVisit ? formatDate(item.dateOfVisit) : ''}
          </AppText>
        </Layout>
      </Layout>
    </TouchableOpacity>
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
          {cardContent}
        </Swipeable>
      ) : (
        <View style={styles.commonBorder}>{cardContent}</View>
      )}
    </View>
  );
};

export default React.memo(MasterBagCapCard);
