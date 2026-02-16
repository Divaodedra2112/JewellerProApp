import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { moderateScale } from '../../utils/Responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Spring animation configuration for iOS-like feel
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
};


const GlassTabBar: React.FC<BottomTabBarProps> = props => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();
  const activeIndex = state.index;

  // Animated values
  const indicatorPosition = useSharedValue(0);
  const tabBarWidth = useSharedValue(0);
  const tabButtonPositions = useRef<{ [key: number]: number }>({});

  // Calculate tab width and positions
  const indicatorWidth = moderateScale(100);
  const edgePadding = moderateScale(4); // Reduced padding from edges for better centering

  // Update indicator position when active tab changes
  useEffect(() => {
    const tabCenter = tabButtonPositions.current[activeIndex];
    if (tabCenter !== undefined && tabBarWidth.value > 0) {
      const targetPosition = tabCenter - (indicatorWidth / 2);
      // Constrain the indicator to stay within tab bar bounds with padding
      const minPosition = edgePadding; // Add padding from the start
      const maxPosition = tabBarWidth.value - indicatorWidth - edgePadding; // Add padding from the end
      const constrainedPosition = Math.max(minPosition, Math.min(maxPosition, targetPosition));
      indicatorPosition.value = withSpring(constrainedPosition, SPRING_CONFIG);
    }
  }, [activeIndex, tabBarWidth.value]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    tabBarWidth.value = width;
  };

  const handleTabButtonLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const tabCenter = x + width / 2;
    tabButtonPositions.current[index] = tabCenter;
    
    // Update indicator if this is the active tab
    if (index === activeIndex && tabBarWidth.value > 0) {
      const targetPosition = tabCenter - (indicatorWidth / 2);
      // Constrain the indicator to stay within tab bar bounds with padding
      const minPosition = edgePadding; // Add padding from the start
      const maxPosition = tabBarWidth.value - indicatorWidth - edgePadding; // Add padding from the end
      const constrainedPosition = Math.max(minPosition, Math.min(maxPosition, targetPosition));
      indicatorPosition.value = withSpring(constrainedPosition, SPRING_CONFIG);
    }
  };

  // Animated style for sliding indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      opacity: withSpring(1, SPRING_CONFIG),
    };
  });

  // Build tab items - use React Navigation's built-in tab bar but customize it
  // We'll render the default tab bar but with our glass background

  return (
    <View style={[styles.safeAreaContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.outerContainer} onLayout={handleLayout}>
          {/* Frosted Glass Background */}
          {Platform.OS === 'ios' ? (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={40}
              reducedTransparencyFallbackColor="rgba(116, 130, 150, 0.5)"
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.androidBlur]} />
          )}

          {/* Semi-transparent overlay for glass effect - more transparent to see background */}
          <View style={styles.overlay} />

          {/* Thin white highlight border */}
          <View style={styles.border} />

        {/* Sliding Active Indicator */}
        <Animated.View style={[styles.activeIndicator, indicatorStyle]}>
          <View style={styles.indicatorInner} />
        </Animated.View>

        {/* Tab Items - Render React Navigation's default tab bar */}
        <View style={styles.tabItemsContainer} pointerEvents="box-none">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const icon = options.tabBarIcon;
            const iconColor = isFocused ? '#173051' : '#FFFFFF'; // Dark blue for active, white for inactive
            const labelColor = isFocused ? '#173051' : '#FFFFFF'; // Dark blue for active, white for inactive

            return (
              <TabButton
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                icon={icon ? (props: any) => icon({ ...props, size: props.size ?? moderateScale(24) }) : undefined}
                label={String(label)}
                isFocused={isFocused}
                iconColor={iconColor}
                labelColor={labelColor}
                onLayout={(event) => handleTabButtonLayout(index, event)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

// Individual Tab Button Component with animations
interface TabButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  icon: ((props: { focused: boolean; color: string; size?: number }) => React.ReactNode) | undefined;
  label: string;
  isFocused: boolean;
  iconColor: string;
  labelColor: string;
  onLayout: (event: LayoutChangeEvent) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  onPress,
  onLongPress,
  icon,
  label,
  isFocused,
  iconColor,
  labelColor,
  onLayout,
}) => {
  const scale = useSharedValue(isFocused ? 1.1 : 1);
  const opacity = useSharedValue(isFocused ? 1 : 0.7);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, SPRING_CONFIG);
    opacity.value = withSpring(isFocused ? 1 : 0.7, SPRING_CONFIG);
  }, [isFocused]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View onLayout={onLayout} style={styles.tabButtonWrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabButton}
      >
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          {icon ? icon({ color: iconColor, focused: isFocused, size: moderateScale(24) }) : null}
        </Animated.View>
        <Animated.Text style={[styles.tabLabel, { color: labelColor }, labelStyle]}>
          {label}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  outerContainer: {
    position: 'absolute',
    left: moderateScale(16),
    right: moderateScale(16),
    bottom: moderateScale(8),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    overflow: 'hidden',
    // Ensure consistent background - no color variants on edges
    backgroundColor: 'transparent',
    // Soft shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(116, 130, 150, 0.5)', // Gray background with transparency to see background
    borderRadius: moderateScale(35),
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(35),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Lighter border for darker background
    pointerEvents: 'none',
  },
  androidBlur: {
    backgroundColor: 'rgba(116, 130, 150, 0.9)', // Gray background with transparency for Android
    borderRadius: moderateScale(35),
  },
  activeIndicator: {
    position: 'absolute',
    width: moderateScale(100),
    height: moderateScale(58),
    top: moderateScale(6),
    borderRadius: moderateScale(29),
    backgroundColor: '#E3EFFF', // Active pill color
    // Subtle shadow for indicator
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  indicatorInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(29),
    backgroundColor: 'rgba(227, 239, 255, 0.8)', // Slightly transparent version of active pill color
  },
  tabItemsContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(8),
    zIndex: 2,
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(4),
    width: '100%',
  },
  tabLabel: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GlassTabBar;

