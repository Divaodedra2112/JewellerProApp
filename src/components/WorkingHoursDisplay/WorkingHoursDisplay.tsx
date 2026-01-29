import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

interface WorkingHoursDisplayProps {
  hours: {
    [key: string]: string;
  };
}

const WorkingHoursDisplay: React.FC<WorkingHoursDisplayProps> = ({ hours }) => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day) => {
        const hoursForDay = hours[day] || 'Closed';
        const isClosed = hoursForDay.toLowerCase() === 'closed';

        return (
          <View key={day} style={styles.row}>
            <Text style={styles.day}>{day}:</Text>
            <Text
              style={[
                styles.hours,
                isClosed && styles.closed,
              ]}
            >
              {hoursForDay}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border || '#E0E0E0',
  },
  day: {
    fontSize: moderateScale(16), // Readable size
    fontFamily: Fonts.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  hours: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.regular,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  closed: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default WorkingHoursDisplay;


