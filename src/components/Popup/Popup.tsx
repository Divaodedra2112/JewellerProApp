import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Popup.styles';

interface ConfirmPopupProps {
  visible: boolean;
  title: string;
  message: string;
  onOk: () => void;
  onCancel: () => void;
  icon?: React.ReactNode | string;
  positiveActionText?: string;
  negativeActionText?: string;
  positiveButtonColor?: string;
  isLoading?: boolean;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  visible,
  title,
  message,
  onOk,
  onCancel,
  icon,
  positiveActionText = 'Yes, Delete',
  negativeActionText = 'No',
  positiveButtonColor,
  isLoading = false,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        {icon != null ? (
          <View style={styles.iconStyle}>
            {typeof icon === 'string' ? <Text>{icon}</Text> : icon}
          </View>
        ) : null}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.buttonBorder,
              positiveButtonColor && { backgroundColor: positiveButtonColor },
              isLoading && { opacity: 0.7 },
            ]}
            onPress={isLoading ? () => {} : onOk}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText2}>{positiveActionText}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>{negativeActionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmPopup;
