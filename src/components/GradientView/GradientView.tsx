import React from 'react';
import { View, ViewStyle, StyleSheet, Platform } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface GradientViewProps {
  colors: string[];
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

const gradientStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  svgContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export const GradientView: React.FC<GradientViewProps> = ({
  colors,
  locations = [0, 1],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
}) => {
  // Generate unique ID for gradient to avoid conflicts
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <View style={[gradientStyles.container, style]}>
      <Svg
        style={gradientStyles.svgContainer}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id={gradientId} x1={`${start.x * 100}%`} y1={`${start.y * 100}%`} x2={`${end.x * 100}%`} y2={`${end.y * 100}%`}>
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={`${locations[index] * 100}%`}
                stopColor={color}
                stopOpacity="1"
              />
            ))}
          </LinearGradient>
        </Defs>
        <Rect width="100" height="100" fill={`url(#${gradientId})`} />
      </Svg>
      <View style={gradientStyles.content}>
        {children}
      </View>
    </View>
  );
};

