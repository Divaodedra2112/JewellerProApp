import React from 'react';
import { View, Modal, TouchableOpacity, Image } from 'react-native';
import styles from './AppModal.styles';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { Images } from '../../utils';
import AppImage from '../AppImage/AppImage';
import { colors } from '../../utils/theme';

interface AppModalProps {
  visible: boolean;
  message: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  showTopIcon?: boolean;
  primaryButtonColor?: string;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  message,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
  showTopIcon = false,
  primaryButtonColor,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {showTopIcon && (
            <AppImage tintColor={colors.success} image={Images.RIGHT_ICON} mainStyle={styles.iconStyle} />
          )}

          <AppText variant={TEXT_VARIANTS.h3_medium} style={styles.message}>
            {message}
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onSecondaryAction}>
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.secondaryButtonText}>
                {secondaryLabel}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.primaryButton,
                primaryButtonColor && { backgroundColor: primaryButtonColor },
              ]}
              onPress={onPrimaryAction}
            >
              <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.primaryButtonText}>
                {primaryLabel}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;
