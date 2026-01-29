import React from 'react';
import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import styles from './GridItem.style';
import { ConcernOption } from '../../modules/main/AddProduct/AddProduct.type';

type GridItemProps = {
  data: ConcernOption;
  selectedIndex: number | null;
  onPress: (index: number) => void;
};

const GridItem: React.FC<GridItemProps> = ({ data, selectedIndex, onPress }) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: { title: string };
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      style={[styles.card, selectedIndex === index && styles.selected]}
      onPress={() => onPress(index)}
    />
  );

  return (
    <Layout>
      <List data={data} renderItem={renderItem} />
    </Layout>
  );
};

export default GridItem;
