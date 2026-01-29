import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { colors } from '../../utils/theme';
import styles from './FloatingActionButton.style';
import {
  HamburgerMenuIcon,
  CloseIcon,
  PlusIcon,
  PlusIconWithRoundBorder,
  AddIcon,
} from '../../assets/icons/svgIcons/appSVGIcons';

interface FloatingAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ color: string; width: number; height: number }>;
  onPress: () => void;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      tension: 50,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Action Items */}
      {isOpen &&
        actions.map((action, index) => {
          const reverseIndex = actions.length - 1 - index;
          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(reverseIndex + 1) * 64],
          });

          const opacity = animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          });

          const scale = animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.3, 0.5, 1],
          });

          const IconComponent = action.icon;

          const handleActionPress = () => {
            // Navigate immediately
            action.onPress();
            // Close menu after a brief delay to allow navigation to start
            setTimeout(() => {
              toggleMenu();
            }, 200);
          };

          return (
            <Animated.View
              key={action.id}
              style={[
                styles.actionItemContainer,
                {
                  transform: [{ translateY }, { scale }],
                  opacity,
                },
              ]}
              pointerEvents="box-none"
            >
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.labelContainer}
                  onPress={handleActionPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.actionLabel} numberOfLines={5}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleActionPress}
                  activeOpacity={0.7}
                >
                  <IconComponent color={colors.black} width={22} height={22} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        })}

      {/* Main FAB Button */}
      <TouchableOpacity style={styles.mainButton} onPress={toggleMenu} activeOpacity={0.8}>
        {isOpen ? (
          <CloseIcon color={colors.black} width={24} height={24} />
        ) : (
          <AddIcon color={colors.black} width={50} height={50} />
        )}
      </TouchableOpacity>

      {/* Overlay */}
      {isOpen && <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu} />}
    </View>
  );
};

export default FloatingActionButton;
