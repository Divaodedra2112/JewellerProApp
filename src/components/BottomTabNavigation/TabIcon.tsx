import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { moderateScale } from '../../utils/Responsive';

interface TabIconProps {
  source: any;
  selectedSource: any;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ source, selectedSource, focused, size = moderateScale(24) }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={focused ? selectedSource : source}
        style={[
          styles.icon, 
          { width: size, height: size },
          !focused && { tintColor: '#FFFFFF' } // White tint for unselected icons
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default TabIcon;

