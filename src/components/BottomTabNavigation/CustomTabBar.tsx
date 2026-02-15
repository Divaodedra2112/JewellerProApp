import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { moderateScale } from '../../utils/Responsive';

const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  const { state } = props;
  const activeIndex = state.index;
  const [tabBarWidth, setTabBarWidth] = useState(0);
  
  // Calculate active tab center position
  const tabCount = state.routes.length;
  const tabWidth = tabBarWidth / tabCount;
  const activeTabCenter = tabWidth * activeIndex + tabWidth / 2;
  const activeTabLeft = tabBarWidth > 0 ? activeTabCenter - moderateScale(42.5) : undefined;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabBarWidth(width);
  };

  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.outerContainer}>
        {/* Single consistent background */}
        <View style={styles.glassBackground} />
        
        {/* Active tab background - rendered separately to avoid clipping */}
        {activeTabLeft !== undefined && (
          <View
            style={[
              styles.activeTabBackground,
              {
                left: activeTabLeft,
              },
            ]}
          />
        )}
        
        {/* Content layer */}
        <View 
          style={styles.tabBarWrapper}
          onLayout={handleLayout}
        >
          <BottomTabBar {...props} style={styles.tabBar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  outerContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 40,
    overflow: 'visible', // Allow active tab to extend beyond container
    // Subtle shadow for light background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    // Solid medium-dark gray background matching Figma
    backgroundColor: '#9CA3AF', // Medium-dark gray background (solid, no two-shade effect)
  },
  tabBarWrapper: {
    borderRadius: 40,
    backgroundColor: 'transparent',
    height: 72,
    justifyContent: 'center',
    overflow: 'visible', // Allow active tab background to show
    zIndex: 2, // Ensure it's above the background
    elevation: 2,
  },
  tabBar: {
    height: '100%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(4),
    backgroundColor: 'transparent',
  },
  activeTabBackground: {
    position: 'absolute',
    backgroundColor: '#E5E7EB', // Light gray/off-white background
    borderRadius: moderateScale(32), // Very rounded for oval/pill shape
    width: moderateScale(85),
    height: moderateScale(60),
    top: moderateScale(6),
    zIndex: 1,
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default CustomTabBar;
