import React from 'react';
import Svg, { Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const BGImage = props => (
  <Svg width="100%" height="100%" viewBox="0 0 375 812" {...props}>
    <G opacity="0.16">
      <Rect width="375" height="812" fill="url(#grad)" fillOpacity="0.7" />
    </G>
    <Defs>
      <LinearGradient
        id="grad"
        x1="187.5"
        y1="0"
        x2="187.5"
        y2="812"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#EF4444" />
        <Stop offset="0.3" stopColor="#EF4444" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BGImage;
