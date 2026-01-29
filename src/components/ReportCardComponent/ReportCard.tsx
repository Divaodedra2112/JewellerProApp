import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './ReportCard.styles';
import { AppText } from '../AppText/AppText';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';
import { defaultIconSizes, outerShadow } from '../../utils/CommonStyles';
import { Divider } from '@ui-kitten/components';
import { CircleIcon, CheckmarkCircleIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import AppImage from '../AppImage/AppImage';
import { DEMO_IMAGES, NAVI_CONST } from '../../utils/Const';
import { truncateText } from '../../utils/commonFunctions';
import ConcernStatusComponent from '../ConcernStatusComponent/ConcernStatusComponent';

// Add type for props
interface ReportCardProps {
  item: { id: string; title: string };
  selected: boolean;
  onSelect: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ selected, onSelect }) => {
  const { small } = defaultIconSizes;

  return (
    <TouchableOpacity style={[outerShadow, styles.container]} onPress={onSelect}>
      <View style={styles.rowTop}>
        <View style={styles.titleContainer}>
          <AppText style={styles.titleText}>
            {truncateText('Missing manufacturing or expiry', 30)}
          </AppText>
        </View>
        <View style={styles.selectIconContainer}>
          {selected ? (
            <CheckmarkCircleIcon width={small} height={moderateScale(20)} color={colors.black} />
          ) : (
            <CircleIcon width={small} height={moderateScale(20)} color={colors.black} />
          )}
        </View>
      </View>
      <View style={styles.rowMiddle}>
        <View style={styles.middleLabelContainer}>
          <AppImage
            image={DEMO_IMAGES}
            mainStyle={styles.companyImageSection}
            imageStyle={styles.companyImageCard}
            resizeMode="cover"
            isDisabled
            from={NAVI_CONST.DETAILS_SCREEN}
          />
        </View>
        <View style={styles.middleValueContainer}>
          <AppText style={styles.middleValueText}>
            {truncateText('AAJVETO MFG PVT LTD LOREM IPSUM', 40)}
          </AppText>
        </View>
      </View>
      <View style={styles.rowBranch}>
        <View style={styles.branchNameContainer}>
          <AppText style={styles.branchNameText}>{truncateText('Ghuntu Road Branch', 20)}</AppText>
        </View>
        <View style={styles.branchCodeContainer}>
          <AppText style={styles.branchCodeText}>{truncateText('GHU12345', 12)}</AppText>
        </View>
      </View>
      <View style={styles.deviderContainer}>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.rowBottom}>
        <View style={styles.dueDateContainer}>
          <AppText style={styles.dueDateText}>{truncateText('Due date: ', 12)}</AppText>
          <AppText style={styles.dueDateText}>{truncateText('25 Apr, 2025', 15)}</AppText>
        </View>
        <View style={styles.statusContainer}>
          {/* <AppText style={styles.statusText}>{truncateText('STATUS', 10)}</AppText> */}

          {/* When api is avable make it dynamic data */}
          <ConcernStatusComponent
            initialStatus={'Not Started'}
            initialStatusId={12}
            // backgroundColor={}
            // fontColor={}
            //   iconName={iconName}
            //   onStatusSelect={status => {
            //     handleUpdateTask(taskDetail?.id, status, 'statusId');
            //   }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportCard;
