import React, { useRef } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { defaultIconSizes } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import styles from './SampleRequestStatusComponent.style.ts';
import { AppText } from '../AppText/AppText';
import ListComponent from '../SingleListComponent/ListComponent';
import {
  CloseIcon,
  StatusIconCreated,
  StatusIconAccepted,
  StatusIconDispatch,
  StatusIconDelivered,
  StatusIconGrinding,
  StatusIconInTrial,
  StatusIconPassed,
  StatusIconRejected,
} from '../../assets/icons/svgIcons/appSVGIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getSampleRequestStatus, getForwardStatuses } from '../../utils/commonFunctions';

interface SampleRequestStatusComponentProps {
  style?: any;
  initialStatus?: string;
  initialStatusId?: number;
  backgroundColor?: string;
  fontColor?: string;
  iconName?: string;
  onStatusSelect?: (statusId: number) => void;
}

const SampleRequestStatusComponent: React.FC<SampleRequestStatusComponentProps> = ({
  style,
  initialStatus,
  initialStatusId,
  backgroundColor,
  fontColor,
  iconName,
  onStatusSelect,
}) => {
  // get priority from redux store
  const { taskTypes } = useSelector((state: RootState) => state.statusAndPriority);
  // get status from redux store
  const allStatuses = getSampleRequestStatus(taskTypes) || [];

  // Find current status object by statusId to check its code
  const currentStatus = allStatuses.find((status: any) => status.id === initialStatusId);
  const isPassedStatus = currentStatus?.code === 'passed';
  const isRejectedStatus = currentStatus?.code === 'rejected';

  // Filter out backward statuses based on current status
  const statuses = getForwardStatuses(initialStatusId || 0, allStatuses);

  const sheetRef = useRef<ActionSheetRef>(null);
  const { small, xsmall } = defaultIconSizes;

  // Dynamic icon mapping
  const getIconComponent = (iconNameParam?: string) => {
    switch (iconNameParam) {
      case 'StatusIconCreated':
        return StatusIconCreated;
      case 'StatusIconAccepted':
        return StatusIconAccepted;
      case 'StatusIconDispatch':
        return StatusIconDispatch;
      case 'StatusIconDelivered':
        return StatusIconDelivered;
      case 'StatusIconGrinding':
        return StatusIconGrinding;
      case 'StatusIconInTrial':
        return StatusIconInTrial;
      case 'StatusIconPassed':
        return StatusIconPassed;
      case 'StatusIconRejected':
        return StatusIconRejected;

      default:
        return null;
    }
  };

  const IconComponent = getIconComponent(iconName);

  const showPriorityOptions = () => {
    // Don't show status options if status is "passed" or "rejected"
    if (isPassedStatus || isRejectedStatus) {
      return;
    }
    sheetRef.current?.show();
  };

  const hidePriorityOptions = () => {
    sheetRef.current?.hide();
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style, backgroundColor && { backgroundColor }]}
        onPress={showPriorityOptions}
      >
        {IconComponent && (
          <IconComponent width={xsmall} height={xsmall} color={colors.goldenOrange} />
        )}
        <AppText
          style={[styles.priorityText, fontColor ? { color: fontColor } : null]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {initialStatus}
        </AppText>
        <ActionSheet
          ref={sheetRef}
          containerStyle={styles.modalView}
          indicatorStyle={styles.indicatorStyle}
          gestureEnabled={true}
          closeOnTouchBackdrop={true}
          defaultOverlayOpacity={0.3}
          useBottomSafeAreaPadding
          drawUnderStatusBar={false}
        >
          <View style={styles.titleContiner}>
            <Text style={styles.modalTitle}>Select Status</Text>
            <TouchableOpacity onPress={hidePriorityOptions} hitSlop={30}>
              <CloseIcon width={xsmall} height={xsmall} color={colors.gray1000} />
            </TouchableOpacity>
          </View>

          <ListComponent
            data={statuses}
            onItemSelect={(item: any) => {
              hidePriorityOptions();
              if (onStatusSelect) {
                onStatusSelect(item.id);
              }
            }}
            selectedConcern={initialStatusId}
          />
        </ActionSheet>
      </TouchableOpacity>
    </>
  );
};

export default SampleRequestStatusComponent;
