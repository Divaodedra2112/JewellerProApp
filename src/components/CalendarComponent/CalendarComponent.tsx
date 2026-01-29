import React, { useState, useEffect, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { CalendarIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';
import { Calendar } from 'react-native-calendars';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import styles from './CalendarComponent.style';

interface CalendarComponentProps {
  initialDate?: string;
  onDateSelect?: (date: string) => boolean | void;
  showSimpleDate?: boolean;
  fontStyle?: any;
  containerStyle?: any;
  /**
   * If true, calendar won't open (but won't dim like `disabled`).
   * Useful for display-only UI.
   */
  readOnly?: boolean;
  /**
   * Optional formatter for the displayed date text.
   * Receives the internal YYYY-MM-DD date string.
   */
  formatDisplayDate?: (yyyyMmDd: string) => string;
  maxDate?: string; // Maximum selectable date (YYYY-MM-DD format)
  minDate?: string; // Minimum selectable date (YYYY-MM-DD format)
  disabled?: boolean; // If true, prevents calendar from opening
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  initialDate = '',
  onDateSelect,
  showSimpleDate,
  fontStyle,
  containerStyle,
  readOnly = false,
  formatDisplayDate,
  maxDate,
  minDate,
  disabled = false,
}) => {
  const { small } = defaultIconSizes;
  const sheetRef = useRef<ActionSheetRef>(null);
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}/${date.getFullYear()}`;
  };

  const convertToYYYYMMDD = (dateString: string) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (initialDate) {
      const convertedDate = convertToYYYYMMDD(initialDate);
      setSelectedDate(convertedDate);
    } else {
      setSelectedDate('');
    }
  }, [initialDate]);

  const showCalendar = () => {
    if (disabled || readOnly) {
      return; // Don't open calendar if disabled
    }
    sheetRef.current?.show();
  };

  const hideCalendar = () => {
    sheetRef.current?.hide();
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    selectedDate.setHours(14, 30, 0, 0);
    const formattedDate = selectedDate.toISOString();

    // Call onDateSelect first and check if it returns false (validation failed)
    const shouldUpdate = onDateSelect?.(formattedDate);

    // Only update the internal state if validation passed (not explicitly false)
    if (shouldUpdate !== false) {
      setSelectedDate(day.dateString);
    }
    hideCalendar();
  };

  return (
    <>
      {showSimpleDate ? (
        <TouchableOpacity
          style={[styles.container1, containerStyle, disabled && { opacity: 0.6 }]}
          onPress={showCalendar}
          disabled={disabled}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Layout style={styles.commonFlex7}>
            <Text style={fontStyle || styles.textStyle}>
              {(formatDisplayDate ? formatDisplayDate(selectedDate) : formatDate(selectedDate)) ||
                'Select Date'}
            </Text>
          </Layout>
          <Layout style={[styles.commonFlex3, styles.commonAlignRight]}>
            <CalendarIcon width={small} height={small} color={colors.Gray40} />
          </Layout>

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
            <View style={styles.calendarContainer}>
              <Calendar
                current={selectedDate}
                onDayPress={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: colors.gray1000 },
                }}
                enableSwipeMonths={true}
                theme={{
                  arrowColor: colors.black,
                  todayTextColor: colors.black,
                  selectedDayBackgroundColor: colors.black,
                  selectedDayTextColor: colors.white,
                }}
              />
            </View>
          </ActionSheet>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.container2, containerStyle, disabled && { opacity: 0.6 }]}
          onPress={showCalendar}
          disabled={disabled}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={fontStyle || styles.textStyle2}>
            {formatDisplayDate ? formatDisplayDate(selectedDate) : formatDate(selectedDate)}
          </Text>

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
            <View style={styles.calendarContainer}>
              <Calendar
                current={selectedDate}
                onDayPress={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: colors.gray1000 },
                }}
                enableSwipeMonths={true}
                theme={{
                  arrowColor: colors.black,
                  todayTextColor: colors.black,
                  selectedDayBackgroundColor: colors.black,
                  selectedDayTextColor: colors.white,
                }}
              />
            </View>
          </ActionSheet>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CalendarComponent;
