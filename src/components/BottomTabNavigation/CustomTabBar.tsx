import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { moderateScale } from '../../utils/Responsive';

const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.outerContainer}>
        {/* Single consistent background */}
        <View style={styles.glassBackground} />
        
        {/* Content layer */}
        <View style={styles.tabBarWrapper}>
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
    overflow: 'hidden',
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
  },
  tabBar: {
    height: '100%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(4),
    backgroundColor: 'transparent',
  },
});

export default CustomTabBar;
