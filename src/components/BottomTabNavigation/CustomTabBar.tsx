import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { colors } from '../../utils/theme';

const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  return (
    <SafeAreaView edges={[]} style={{ height: 80, backgroundColor: colors.ScreenBGColor }}>
      <View style={styles.outerContainer}>
        <View style={styles.tabBarWrapper}>
          <BottomTabBar {...props} style={styles.tabBar} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 40,
    backgroundColor: 'transparent',
    // Stronger bottom shadow for iOS
    shadowColor: colors.gray1000,
    shadowOffset: { width: 0, height: 16 }, // More bottom shadow
    shadowOpacity: 0.45, // More visible
    shadowRadius: 24, // Softer, larger spread
    // Softer shadow for Android
    elevation: 4,
  },
  tabBarWrapper: {
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderLeftColor: 'rgba(0,0,0,0.08)',
    borderRightColor: 'rgba(0,0,0,0.08)',
    height: 72, // Adjust based on your Figma design
    justifyContent: 'center',
  },
  tabBar: {
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 4, // Reduced to decrease space between menu items
  },
});

export default CustomTabBar;
