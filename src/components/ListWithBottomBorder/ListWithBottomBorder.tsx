// LocationList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { styles } from './ListWithBottomBorder.style';
import { outerShadow } from '../../utils/CommonStyles';

interface LocationListProps {
  data: string[];
}

const ListWithBottomBorder: React.FC<LocationListProps> = ({ data }) => {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={[outerShadow, styles.container]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ListWithBottomBorder;
