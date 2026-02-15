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
import { Images } from '../../utils';

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
            {/* Icon */}
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

            {/* Message */}
            <AppText
              variant={TEXT_VARIANTS.h2}
              style={styles.messageText}
            >
              {message}
            </AppText>

            {/* Action Buttons (for confirmation mode) */}
            {isConfirmation && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onSecondaryAction || handleClose}
                >
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
    maxWidth: moderateScale(400),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(24),
    paddingHorizontal: moderateScale(32),
    paddingVertical: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.commonShadowColor,
    shadowOffset: {
      width: 0,
      height: moderateScale(8),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(16),
    elevation: 10,
    minWidth: moderateScale(280),
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
    lineHeight: moderateScale(26),
    paddingHorizontal: moderateScale(8),
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
  button: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
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

