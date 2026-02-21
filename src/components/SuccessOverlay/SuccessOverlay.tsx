import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale, verticalScale } from '../../utils/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppImage from '../AppImage/AppImage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SuccessOverlayProps {
  visible: boolean;
  message?: string;
  onClose?: () => void;
  autoCloseDelay?: number; // in milliseconds
  iconSize?: number;
  showCloseButton?: boolean;
  // Confirmation mode props
  isConfirmation?: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryButtonColor?: string;
  customIcon?: number; // Image source for custom icon
  iconName?: string; // MaterialIcons icon name (e.g., 'logout', 'warning')
  iconComponent?: React.ComponentType<{ color?: string; width?: number; height?: number }>; // SVG icon component
  iconBackgroundColor?: string; // Background color for icon circle
  iconColor?: string; // Color for the icon itself
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  visible,
  message = 'You have logged in successfully',
  onClose,
  autoCloseDelay = 2000,
  iconSize,
  showCloseButton = false,
  isConfirmation = false,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
  primaryButtonColor,
  customIcon,
  iconName,
  iconComponent,
  iconBackgroundColor,
  iconColor,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      checkmarkScale.setValue(0);

      // Animate backdrop fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animate card scale in
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Animate checkmark with delay
      setTimeout(() => {
        Animated.spring(checkmarkScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }).start();
      }, 200);

      // Auto close after delay (only if not in confirmation mode)
      if (!isConfirmation && autoCloseDelay > 0 && onClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);

        return () => {
          clearTimeout(timer);
        };
      }
    } else {
      // Reset animations when hidden
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      checkmarkScale.setValue(0);
    }
    return undefined;
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose();
      });
    }
  };

  if (!visible) {
    return null;
  }

  const calculatedIconSize = iconSize || moderateScale(80);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdrop}
        onPress={isConfirmation || showCloseButton ? undefined : handleClose}
      >
        <Animated.View
          style={[
            styles.backdropOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.card}>
            {/* Icon - Only show if not in confirmation mode or if explicitly provided */}
            {!isConfirmation && (
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: checkmarkScale }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconCircle,
                    {
                      width: calculatedIconSize,
                      height: calculatedIconSize,
                      backgroundColor: iconBackgroundColor || colors.success,
                    },
                  ]}
                >
                  {iconComponent ? (
                    (() => {
                      const IconComponent = iconComponent;
                      return (
                        <IconComponent
                          color={iconColor || colors.white}
                          width={calculatedIconSize * 0.6}
                          height={calculatedIconSize * 0.6}
                        />
                      );
                    })()
                  ) : customIcon ? (
                    <AppImage
                      image={customIcon}
                      mainStyle={{
                        width: calculatedIconSize * 0.6,
                        height: calculatedIconSize * 0.6,
                      }}
                      from="SuccessOverlay"
                    />
                  ) : (
                    <Icon
                      name={iconName || "check"}
                      size={calculatedIconSize * 0.6}
                      color={iconColor || colors.white}
                    />
                  )}
                </View>
              </Animated.View>
            )}

            {/* Message */}
            <AppText
              variant={TEXT_VARIANTS.h1}
              style={[styles.messageText, isConfirmation && styles.confirmationMessageText]}
            >
              {message}
            </AppText>

            {/* Action Buttons (for confirmation mode) */}
            {isConfirmation && (
              <View style={styles.buttonColumn}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onSecondaryAction || handleClose}
                  activeOpacity={0.8}
                >
                  <AppText variant={TEXT_VARIANTS.h4_medium} style={styles.cancelButtonText}>
                    {secondaryLabel}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.logoutButton,
                    primaryButtonColor && { borderColor: primaryButtonColor },
                  ]}
                  onPress={onPrimaryAction}
                  activeOpacity={0.8}
                >
                  <AppText 
                    variant={TEXT_VARIANTS.h4_medium} 
                    style={[
                      styles.logoutButtonText,
                      primaryButtonColor && { color: primaryButtonColor },
                    ]}
                  >
                    {primaryLabel}
                  </AppText>
                </TouchableOpacity>
              </View>
            )}

            {/* Close Button (optional) */}
            {showCloseButton && !isConfirmation && (
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  name="close"
                  size={moderateScale(24)}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Simulate blur effect with opacity
  },
  cardContainer: {
    width: '85%',
    maxWidth: moderateScale(320),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.commonShadowColor,
    shadowOffset: {
      width: 0,
      height: moderateScale(4),
    },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(12),
    elevation: 8,
    width: '100%',
  },
  iconContainer: {
    marginBottom: verticalScale(24),
  },
  iconCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOffset: {
      width: 0,
      height: moderateScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  messageText: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontFamily: Fonts.semi_bold,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(8),
  },
  confirmationMessageText: {
    marginBottom: verticalScale(20),
    fontSize: moderateScale(18),
    fontFamily: Fonts.semi_bold,
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: colors.gray50,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: verticalScale(24),
    gap: moderateScale(12),
    width: '100%',
  },
  buttonColumn: {
    flexDirection: 'column',
    marginTop: verticalScale(4),
    gap: moderateScale(12),
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(48),
  },
  cancelButton: {
    backgroundColor: colors.primary,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderWidth: moderateScale(1),
    borderColor: colors.gray100,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.white,
    fontFamily: Fonts.semi_bold,
    fontSize: moderateScale(16),
  },
  logoutButtonText: {
    color: colors.red,
    fontFamily: Fonts.semi_bold,
    fontSize: moderateScale(16),
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontFamily: Fonts.medium,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: Fonts.medium,
  },
});

export default SuccessOverlay;

