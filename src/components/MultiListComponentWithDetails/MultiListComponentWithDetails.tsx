import React, { useState, useEffect } from 'react';
import { Divider, Layout, List, Text } from '@ui-kitten/components';
import { Keyboard, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/theme';
import { styles } from './styles';
import AppImage from '../AppImage/AppImage';
import NoResultsFoundScreen from '../../modules/UtilityScreens/NoResultsFoundScreen';
import { moderateScale } from '../../utils/Responsive';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import { NAVI_CONST } from '../../utils/Const';
import { CheckmarkCircleIcon } from '../../assets/icons/svgIcons/appSVGIcons';

interface ListItemData {
  id: number;
  name: string;
  code: string;
  disabled?: boolean;
  isPrimary?: boolean;
  company?: { name: string; id: number };
  road?: { id: number };
  user?: { id: number; profileImage: string };
}

interface ListComponentProps {
  data: ListItemData[];
  onItemSelect: (selectedItem: ListItemData | null) => void;
  selectedConcern?: string;
}

const MultiListComponentWithDetails: React.FC<ListComponentProps> = ({
  data,
  onItemSelect,
  selectedConcern,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // set default selected item based on selectedConcern
  useEffect(() => {
    if (selectedConcern) {
      setSelectedId(selectedConcern);
    }
  }, [selectedConcern]);

  const handleSelect = (item: ListItemData) => {
    Keyboard.dismiss();

    // toggle same item, otherwise select new
    const newSelectedId = selectedId === item.id ? null : item.id;
    setSelectedId(newSelectedId);

    const selectedItem = data.find(i => i.id === newSelectedId) || null;
    onItemSelect(selectedItem);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ListItemData>) => {
    const isSelected = selectedId === item.id;
    const { small } = defaultIconSizes;
    const isLastItem = index === data.length - 1;

    let textColor = styles.text.color;
    if (item.disabled) {
      textColor = colors.gray400;
    } else if (item.isPrimary) {
      textColor = colors.red;
    }

    return (
      <TouchableOpacity
        onPress={() => !item.disabled && handleSelect(item)}
        disabled={!!item.disabled}
        style={[
          outerShadow,
          styles.shadowLayer1,
          {
            borderColor: isSelected ? colors.black : 'transparent',
            backgroundColor: colors.white,
            marginBottom: isLastItem ? moderateScale(24) : moderateScale(8),
            opacity: item.disabled ? 0.5 : 1,
            borderWidth: isSelected ? 2 : 0,
          },
        ]}
      >
        <Layout style={{ flex: 1, flexDirection: 'column' }}>
          {/* Top Row */}
          <Layout style={{ flex: 1, flexDirection: 'row' }}>
            {item.name && (
              <Layout style={{ flex: 1 }}>
                <Text style={styles.labelStyle}>{item.name}</Text>
              </Layout>
            )}

            {item.code && (
              <Layout style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.subLableStyle}>{item.code}</Text>
              </Layout>
            )}
          </Layout>

          {/* Divider */}
          <View style={styles.deviderContainer}>
            <Divider style={styles.divider} />
          </View>

          {/* Bottom Row */}

          {item.company && (
            <Layout style={{ flex: 1, flexDirection: 'row' }}>
              {item.user?.profileImage && (
                <Layout style={{ flex: 0.5 }}>
                  <AppImage
                    image={item.user?.profileImage}
                    mainStyle={styles.companyImageSection}
                    imageStyle={styles.companyImageCard}
                    resizeMode="cover"
                    isDisabled
                    from={NAVI_CONST.DETAILS_SCREEN}
                  />
                </Layout>
              )}
              {
                <Layout style={styles.fullflex}>
                  <Text style={styles.fullFlexAddress}>
                    {typeof item.company === 'string' ? item.company : item.company?.name}
                  </Text>
                </Layout>
              }

              <Layout style={{ flex: 1, alignItems: 'flex-end' }}>
                {isSelected && !item.disabled && (
                  <CheckmarkCircleIcon
                    width={small}
                    height={moderateScale(20)}
                    color={colors.black}
                  />
                )}
              </Layout>
            </Layout>
          )}
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <List
      contentContainerStyle={styles.ccs}
      style={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<NoResultsFoundScreen />}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default MultiListComponentWithDetails;
