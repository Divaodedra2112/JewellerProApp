import React, { useState, useEffect, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity, View, FlatList, Keyboard } from 'react-native';

import { defaultIconSizes, defaultImageSize, outerShadow } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import styles from './StaffListComponent.style';
import { AppText } from '../AppText/AppText';
import ListComponent from '../SingleListComponent/ListComponent';
import { Const, NAVI_CONST } from '../../utils/Const';
import { CheckmarkCircleIcon, CloseIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { moderateScale } from '../../utils/Responsive';
import { StaffDetail } from '../../modules/main/Staff/StaffList/StaffListType';
import { Avatar } from '@kolking/react-native-avatar';

interface StaffListComponentProps {
  style?: any;
  staffList: StaffDetail[];
  selectedId?: number | null;
  onItemSelect: (staff: StaffDetail) => void;
  imageShow?: boolean;
}

const StaffListComponent: React.FC<StaffListComponentProps> = ({
  style,
  staffList,
  selectedId,
  onItemSelect,
  imageShow = false,
}) => {
  const { small } = defaultIconSizes;

  const renderStaffItem = ({ item, index }: { item: StaffDetail; index: number }) => {
    const isSelected = item.id === selectedId;
    const isLastItem = index === staffList.length - 1;
    const { small } = defaultIconSizes;

    // Debug logging
    const fullName = `${item.firstName || ''} ${item.lastName || ''}`.trim();
    const profileImageValue = item.profileImage;
    // Check if profileImage is valid (not null, undefined, or empty string)
    const hasProfileImage = !!(
      profileImageValue &&
      typeof profileImageValue === 'string' &&
      profileImageValue.trim().length > 0
    );

    console.log('=== Staff Avatar Debug ===');
    console.log('imageShow:', imageShow);
    console.log('Staff ID:', item.id);
    console.log('First Name:', item.firstName);
    console.log('Last Name:', item.lastName);
    console.log('Full Name:', fullName);
    console.log('Full Name Length:', fullName.length);
    console.log('Has Profile Image:', hasProfileImage);
    console.log('Profile Image Value:', profileImageValue);
    console.log('Profile Image Type:', typeof profileImageValue);
    console.log('Profile Image is null?:', profileImageValue === null);
    console.log('Profile Image is undefined?:', profileImageValue === undefined);
    console.log('Profile Image Length:', profileImageValue?.length);
    console.log(
      'Source prop:',
      hasProfileImage ? { uri: item.profileImage } : 'OMITTED (will use defaultSource)'
    );
    console.log('Avatar will receive:', {
      ...(hasProfileImage ? { source: { uri: item.profileImage } } : {}),
      name: fullName,
      nameLength: fullName.length,
      hasName: fullName.length > 0,
      colorize: true,
      size: defaultImageSize.medium,
    });
    console.log('========================');

    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          onItemSelect(item);
        }}
        style={[
          outerShadow,
          styles.shadowLayer1,
          {
            borderColor: isSelected ? colors.black : 'transparent',
            backgroundColor: isSelected ? colors.gray1100 : colors.white,
            marginBottom: isLastItem ? moderateScale(24) : moderateScale(8),
            borderWidth: isSelected ? 1 : 0,
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {imageShow && (
              <Avatar
                {...(hasProfileImage ? { source: { uri: item.profileImage! } } : {})}
                name={fullName}
                size={defaultImageSize.medium}
                colorize={true}
                style={[styles.imageSection, styles.imageCard]}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.text}>{`${item.firstName} ${item.lastName}`}</Text>
            </View>
          </View>
          {isSelected && <CheckmarkCircleIcon width={small} height={small} color={colors.black} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={staffList}
      renderItem={renderStaffItem}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={style}
    />
  );
};

export default StaffListComponent;
