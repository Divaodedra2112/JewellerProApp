import React from 'react';
import { ActivityIndicator, View, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../utils/theme';

export type AppLoderProps = {
  size?: 'small' | 'large' | number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const AppLoder: React.FC<AppLoderProps> = ({
  size = 'small',
  color = colors.black,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default AppLoder;
