import React, { useRef } from 'react';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { defaultIconSizes } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import styles from './SampleRequestPriorityComponent.style.ts';
import { AppText } from '../AppText/AppText';
import { CloseIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getSampleRequestPriority } from '../../utils/commonFunctions';
import ListComponent from '../SingleListComponent/ListComponent';

interface SampleRequestPriorityComponentProps {
  style?: any;
  initialPriority?: string;
  initialPriorityId?: number;
  backgroundColor?: string;
  fontColor?: string;
  onPrioritySelect?: (priorityId: number) => void;
}

const SampleRequestPriorityComponent: React.FC<SampleRequestPriorityComponentProps> = ({
  style,
  initialPriority,
  initialPriorityId,
  backgroundColor,
  fontColor,
  onPrioritySelect,
}) => {
  const sheetRef = useRef<ActionSheetRef>(null);
  const { small, xsmall } = defaultIconSizes;

  const showPriorityOptions = () => {
    if (sheetRef.current && typeof sheetRef.current.show === 'function') {
      sheetRef.current.show();
    }
  };

  const hidePriorityOptions = () => {
    if (sheetRef.current && typeof sheetRef.current.hide === 'function') {
      sheetRef.current.hide();
    }
  };

  const { taskTypes } = useSelector((state: RootState) => state.statusAndPriority);
  const priorities = getSampleRequestPriority(taskTypes) || [];

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          style,
          initialPriority ? { backgroundColor: backgroundColor } : null, // apply only if priority exists
        ]}
        onPress={showPriorityOptions}
      >
        {initialPriority ? (
          <AppText style={[styles.priorityText, { color: fontColor }]}>{initialPriority}</AppText>
        ) : (
          <AppText style={styles.NoPriorityText}>Select priority</AppText>
        )}

        <ActionSheet
          ref={sheetRef}
          containerStyle={styles.modalView}
          indicatorStyle={{ width: 100 }}
          gestureEnabled={true}
          closeOnTouchBackdrop={true}
          defaultOverlayOpacity={0.3}
          useBottomSafeAreaPadding
          drawUnderStatusBar={false}
        >
          <View style={styles.titleContiner}>
            <Text style={styles.modalTitle}>Select priority</Text>
            <TouchableOpacity onPress={hidePriorityOptions} hitSlop={30}>
              <CloseIcon width={xsmall} height={xsmall} color={colors.gray1000} />
            </TouchableOpacity>
          </View>

          <ListComponent
            data={priorities}
            onItemSelect={(item: any) => {
              hidePriorityOptions();
              if (typeof onPrioritySelect === 'function') {
                onPrioritySelect(item.id);
              }
            }}
            selectedConcern={initialPriorityId}
          />
        </ActionSheet>
      </TouchableOpacity>
    </>
  );
};

export default SampleRequestPriorityComponent;
