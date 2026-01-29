import React, { forwardRef, useRef, useCallback } from 'react';
import { TouchableOpacity, View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './AppListViewCard.styles';
import { colors } from '../../utils/theme';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import { DeleteIcon, EditIcon } from '../../assets/icons/svgIcons/appSVGIcons';

interface AppListViewCardProps {
  items: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  handleRefresh: () => void;
}

const AppListViewCard = forwardRef<any, AppListViewCardProps>(
  ({ items, onEdit, onDelete, handleRefresh }, ref) => {
    const swipeableRefs = useRef<{ [key: number]: Swipeable | null }>({});
    const scrollViewRef = useRef<ScrollView>(null);
    const openSwipeableId = useRef<number | null>(null);
    const { xsmall, small } = defaultIconSizes;

    const closeAllSwipeables = useCallback(() => {
      Object.values(swipeableRefs.current).forEach(ref => {
        ref?.close();
      });
      openSwipeableId.current = null;
    }, []);

    const handleScroll = useCallback(() => {
      closeAllSwipeables();
    }, [closeAllSwipeables]);

    const handleTouchStart = useCallback(() => {
      closeAllSwipeables();
    }, [closeAllSwipeables]);

    const renderSwipeActions = (item: any) => (
      <View style={[styles.swipContent]}>
        <TouchableOpacity
          onPress={() => {
            closeAllSwipeables();
            onEdit(item);
          }}
          style={styles.swipIconWithOutBackground}
        >
          <EditIcon width={small} height={small} color={colors.Gray80} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            closeAllSwipeables();
            onDelete(item);
          }}
          style={styles.swipIconWithBackground}
        >
          <DeleteIcon width={small} height={small} color={colors.white} />
        </TouchableOpacity>
      </View>
    );

    const renderItem = (item: any) => (
      <View key={item.id} style={[outerShadow, styles.swipeWrapper]}>
        {item.name.toLowerCase() === 'other' ? (
          <Layout style={styles.card}>
            <Layout style={styles.textSection}>
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.title}>
                {item.name}
              </AppText>
              {item.description && (
                <AppText variant={TEXT_VARIANTS.h6_small} style={styles.description}>
                  {item.description}
                </AppText>
              )}
            </Layout>
          </Layout>
        ) : (
          <Swipeable
            ref={ref => {
              swipeableRefs.current[item.id] = ref;
            }}
            renderRightActions={() => renderSwipeActions(item)}
            friction={2}
            overshootFriction={8}
            animationOptions={{ duration: 150 }}
            overshootRight={false}
            onSwipeableWillOpen={() => {
              if (openSwipeableId.current !== null && openSwipeableId.current !== item.id) {
                swipeableRefs.current[openSwipeableId.current]?.close();
              }
              openSwipeableId.current = item.id;
            }}
            containerStyle={styles.commonBorder}
          >
            <TouchableOpacity onPress={closeAllSwipeables} activeOpacity={0.8}>
              <Layout style={styles.card}>
                <Layout style={styles.textSection}>
                  <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.title}>
                    {item.name}
                  </AppText>
                  {item.description && (
                    <AppText variant={TEXT_VARIANTS.h6_small} style={styles.description}>
                      {item.description}
                    </AppText>
                  )}
                </Layout>
              </Layout>
            </TouchableOpacity>
          </Swipeable>
        )}
      </View>
    );

    React.useImperativeHandle(ref, () => ({
      closeAllSwipeables,
    }));

    return (
      <Pressable onPress={handleTouchStart} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={colors.black}
            />
          }
        >
          {items.map(renderItem)}
        </ScrollView>
      </Pressable>
    );
  }
);

export default AppListViewCard;
