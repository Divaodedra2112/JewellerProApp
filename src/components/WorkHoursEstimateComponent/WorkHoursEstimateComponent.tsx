import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './WorkHoursEstimateComponent.style';
import { AppButton } from '../../components';

interface WorkHoursEstimateComponentProps {
  visible: boolean;
  initialHours?: number;
  initialMinutes?: number;
  onClose: () => void;
  onSubmit: (hours: number, minutes: number) => void;
}

const WorkHoursEstimateComponent: React.FC<WorkHoursEstimateComponentProps> = ({
  visible,
  initialHours = 0,
  initialMinutes = 30,
  onClose,
  onSubmit,
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);

  useEffect(() => {
    if (visible) {
      setHours(initialHours);
      setMinutes(initialMinutes);
    }
  }, [visible, initialHours, initialMinutes]);

  const increment = () => {
    if (minutes === 30) {
      setHours(prev => prev + 1);
      setMinutes(0);
    } else {
      setMinutes(30);
    }
  };

  const decrement = () => {
    if (hours === 0 && minutes === 0) return;

    if (minutes === 0) {
      if (hours > 0) {
        setHours(prev => prev - 1);
        setMinutes(30);
      }
    } else {
      setMinutes(0);
    }
  };

  const formatTime = (): string => {
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const isZeroTime = hours === 0 && minutes === 0;
  const isDecrementDisabled = isZeroTime;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Pick your work hours {'\n'} estimate</Text>

          <View style={styles.timerContainer}>
            <TouchableOpacity
              onPress={decrement}
              disabled={isDecrementDisabled}
              style={[styles.circle, isDecrementDisabled && styles.disabledCircle]}
            >
              <Text style={[styles.circleText, isDecrementDisabled && styles.disabledText]}>−</Text>
            </TouchableOpacity>

            <Text style={styles.timeText}>{formatTime()}</Text>

            <TouchableOpacity onPress={increment} style={styles.circle}>
              <Text style={styles.circleText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.unit}>hour(s)</Text>

          <AppButton
            onPress={() => onSubmit(hours, minutes)}
            style={[styles.fullWidthButton, isZeroTime && styles.disabledButton]}
            disabled={isZeroTime}
          >
            <Text style={[styles.submitText, isZeroTime && styles.disabledText]}>Submit</Text>
          </AppButton>

          <AppButton onPress={onClose} style={styles.fullWidthButto2}>
            <Text style={styles.cancelText}>No, keep going!</Text>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

export default WorkHoursEstimateComponent;
