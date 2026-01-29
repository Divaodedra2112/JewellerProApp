import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { outerShadow } from '../../utils/CommonStyles';
import { styles } from './ListWithDivider.style';

interface ListItem {
  id: number;
  name: string;
}

interface ListWithDividerProps {
  items: ListItem[];
  title: string;
}

const ListWithDivider: React.FC<ListWithDividerProps> = ({ items, title }) => {
  const MAX_VISIBLE = 5;
  const [expanded, setExpanded] = useState(false);

  const hasOverflow = items.length > MAX_VISIBLE;
  const visibleItems = useMemo(() => {
    return expanded || !hasOverflow ? items : items.slice(0, MAX_VISIBLE);
  }, [items, expanded, hasOverflow]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={[outerShadow, styles.card]}>
      <AppText style={styles.title}>{title}</AppText>
      {visibleItems.map((item, idx) => (
        <View key={item.id}>
          <View style={styles.item}>
            <AppText style={styles.itemName}>{item.name}</AppText>
          </View>
          {idx !== visibleItems.length - 1 && <View style={styles.divider} />}
        </View>
      ))}

      {hasOverflow && (
        <View style={styles.showAllBtnContainer}>
          <TouchableOpacity
            onPress={() => setExpanded(v => !v)}
            accessibilityRole="button"
            accessibilityLabel={expanded ? `Show less ${title}` : `Show all ${title}`}
            style={styles.showAllBtn}
          >
            <AppText variant={TEXT_VARIANTS.h5_medium} style={styles.expandBtnText}>
              {expanded ? 'Show less' : 'Show all'}
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ListWithDivider;
