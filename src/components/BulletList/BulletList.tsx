import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '../AppText/AppText';
import { styles } from './BulletList.style';
import { Divider } from '@ui-kitten/components';
import { RootState } from '../../store';

type BulletListProps = {
  items?: Array<{ id: number; name: string; description: string | null }> | number[];
  title?: string;
  icon?: any;
  iconOnPress?: () => void;
};

const BulletList: React.FC<BulletListProps> = ({ items = [], title, icon, iconOnPress }) => {
  // Get concern types from Redux
  const { concernTypes } = useSelector((state: RootState) => state.concernType);

  if (!items || items.length === 0) {
    return null;
  }

  // Process items based on whether they are IDs or objects
  const processedItems = React.useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      // Check if first item is a number (ID) or object
      if (typeof items[0] === 'number') {
        // Items are IDs, need to fetch from Redux
        const ids = items as number[];
        return concernTypes
          .filter(concern => ids.includes(concern.id))
          .map(concern => ({
            id: concern.id,
            name: concern.name,
            description: concern.description || null,
          }));
      } else {
        // Items are already objects with id, name, description
        const objectItems = items as Array<{
          id: number;
          name: string;
          description: string | null;
        }>;
        return objectItems.filter(item => item && item.id && item.name);
      }
    }
    return [];
  }, [items, concernTypes]);

  if (processedItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppText style={styles.concernTitle}>{title}</AppText>
        <TouchableOpacity onPress={iconOnPress}>{icon}</TouchableOpacity>
      </View>

      <View style={styles.deviderContainer}>
        <Divider style={styles.divider} />
      </View>

      {processedItems.map(item => (
        <View key={item.id} style={styles.listItem}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default BulletList;
