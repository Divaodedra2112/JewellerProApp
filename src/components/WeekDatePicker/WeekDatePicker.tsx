import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './WeekDatePicker.style';

interface WeekDatePickerProps {
  initialSelectedDate: string; // Expects format: 'YYYY-MM-DD'
  onDateSelect?: (date: string) => void;
}

const WeekDatePicker: React.FC<WeekDatePickerProps> = ({
  initialSelectedDate,
  onDateSelect,
}) => {
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(initialSelectedDate);

  useEffect(() => {
    const today = new Date(initialSelectedDate);

    // Generate next 7 days starting from the initial selected date
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });

    setWeekDates(next7Days);
    setSelectedDate(initialSelectedDate);
  }, [initialSelectedDate]);

  const formatToISO = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleSelect = (date: Date) => {
    const iso = formatToISO(date);
    setSelectedDate(iso);
    onDateSelect?.(iso);
  };

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(); // MON, TUE, etc.
  };

  const getDayNumber = (date: Date): number => {
    return date.getDate();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {weekDates.map((date) => {
        const iso = formatToISO(date);
        const isSelected = iso === selectedDate;

        return (
          <TouchableOpacity
            key={iso}
            style={[styles.dateItem, isSelected && styles.selectedDateItem]}
            onPress={() => handleSelect(date)}
          >
            <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>
              {getDayName(date)}
            </Text>
            <Text style={[styles.dayNumber, isSelected && styles.selectedDateText]}>
              {getDayNumber(date)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default WeekDatePicker;
