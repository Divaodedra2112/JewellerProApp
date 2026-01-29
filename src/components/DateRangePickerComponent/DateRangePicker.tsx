import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import DateTimePicker from 'react-native-ui-datepicker';
import styles from './DateRangePicker.style';
import { CalendarIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import { AppButton } from '../../components';

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

interface CalendarRangeComponentProps {
  onRangeSelect?: (range: DateRange) => void;
  fontStyle?: any;
  initialStartDate?: string; // YYYY-MM-DD format
  initialEndDate?: string; // YYYY-MM-DD format
}

const CalendarRangeComponent: React.FC<CalendarRangeComponentProps> = ({
  onRangeSelect,
  fontStyle,
  initialStartDate,
  initialEndDate,
}) => {
  const { small } = defaultIconSizes;
  const sheetRef = useRef<ActionSheetRef>(null);

  // Convert string dates to Date objects (parse as local date, not UTC)
  const getInitialDate = (dateString?: string): Date | undefined => {
    if (!dateString) {
      return undefined;
    }
    // Parse YYYY-MM-DD as local date to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    if (year && month && day) {
      const date = new Date(year, month - 1, day);
      return !isNaN(date.getTime()) ? date : undefined;
    }
    return undefined;
  };

  const [range, setRange] = useState<DateRange>({
    startDate: getInitialDate(initialStartDate),
    endDate: getInitialDate(initialEndDate),
  });
  const [tempRange, setTempRange] = useState<DateRange>({
    startDate: getInitialDate(initialStartDate),
    endDate: getInitialDate(initialEndDate),
  });

  // Update range when initial dates change
  useEffect(() => {
    const newStartDate = getInitialDate(initialStartDate);
    const newEndDate = getInitialDate(initialEndDate);
    const newRange = {
      startDate: newStartDate,
      endDate: newEndDate,
    };
    setRange(newRange);
    setTempRange(newRange);

    // If dates are cleared (both undefined), notify parent
    if (!newStartDate && !newEndDate) {
      onRangeSelect?.({ startDate: undefined, endDate: undefined });
    }
  }, [initialStartDate, initialEndDate, onRangeSelect]);

  // Format date as YYYY-MM-DD or return empty string if invalid
  const showFormattedDate = (date?: Date) =>
    date instanceof Date && !isNaN(date.getTime())
      ? date.toLocaleDateString('en-CA') // YYYY-MM-DD format in local timezone
      : '';

  // Label displays either formatted range, single date, or placeholder
  const getRangeLabel = () => {
    if (range.startDate && range.endDate) {
      return `${showFormattedDate(range.startDate)} to ${showFormattedDate(range.endDate)}`;
    }
    if (range.startDate) {
      return showFormattedDate(range.startDate);
    }
    return 'Select Date Range';
  };

  const showPicker = () => {
    setTempRange(range);
    sheetRef.current?.show();
  };

  const hidePicker = () => {
    if (tempRange.startDate) {
      setRange(tempRange);
      onRangeSelect?.(tempRange);
    }
    sheetRef.current?.hide();
  };

  const handleChange = (params: any) => {
    // Handle both range mode (with startDate/endDate) and single mode
    if (params.startDate !== undefined || params.endDate !== undefined) {
      setTempRange({ startDate: params.startDate, endDate: params.endDate });
    } else if (params.date) {
      // Single date mode - not used here but handle for type safety
      setTempRange({ startDate: params.date, endDate: undefined });
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container1}
        onPress={showPicker}
        accessibilityLabel="Select date range"
        accessibilityRole="button"
      >
        <Layout style={styles.commonFlex7}>
          <Text style={fontStyle || styles.textStyle}>{getRangeLabel()}</Text>
        </Layout>
        <Layout style={[styles.commonFlex3, styles.commonAlignRight]}>
          <CalendarIcon width={small} height={small} color={colors.Gray40} />
        </Layout>
      </TouchableOpacity>

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
        <View style={styles.calendarContainer}>
          <DateTimePicker
            mode="range"
            startDate={tempRange.startDate}
            endDate={tempRange.endDate}
            onChange={handleChange}
            styles={{
              day_label: styles.dayLabel,
              selected_label: styles.selectedLabel,
              today_label: styles.todayLabel,
              disabled_label: styles.disabledLabel,
              today: styles.calendarToday,
              selected: styles.selectedRange,
              range_fill: styles.rangeDay,
              range_middle: styles.rangeDay,
              range_middle_label: styles.rangeMiddleLabel,
              button_prev_image: styles.buttonPrevImage,
              button_next_image: styles.buttonNextImage,
              month_selector_label: styles.monthSelectorLabel,
              year_selector_label: styles.yearSelectorLabel,
              weekday_label: styles.weekdayLabel,
            }}
          />

          {tempRange.startDate && tempRange.endDate && (
            <AppButton onPress={hidePicker} style={styles.doneButtonStyle}>
              Done
            </AppButton>
          )}
        </View>
      </ActionSheet>
    </>
  );
};

export default CalendarRangeComponent;
