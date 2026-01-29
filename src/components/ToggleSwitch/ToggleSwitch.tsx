import React, { useEffect, useMemo } from 'react';
import { View, Pressable, Animated, Easing, ViewStyle } from 'react-native';
import { styles } from './ToggleSwitch.style';
import { colors } from '../../utils/theme';
import { moderateScale, scale } from '../../utils/Responsive';

type Props = {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  size?: number;
  onColor?: string;
  offColor?: string;
  knobColor?: string;
};

const ToggleSwitch: React.FC<Props> = ({
  value,
  onValueChange,
  disabled = false,
  style,
  size = 28,
  onColor = colors.lightBlackColor,
  offColor = colors.grayColor,
  knobColor = colors.background,
}) => {
  // apply responsive scaling
  const rSize = Math.max(20, Math.min(scale(size), 44));
  const padding = Math.max(2, Math.round(scale(3)));
  const trackW = Math.round(rSize * 2);
  const knobSize = rSize - padding * 2;

  // animated 0..1
  const progress = useMemo(() => new Animated.Value(value ? 1 : 0), []);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [value, progress]);

  const knobTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackW - knobSize - padding * 2],
  });

  const bgColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [offColor, onColor],
  });

  return (
    <View style={[styles.row, style]}>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        onPress={() => !disabled && onValueChange(!value)}
        style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.9 : 1 }]}
        hitSlop={{
          top: moderateScale(6),
          right: moderateScale(6),
          bottom: moderateScale(6),
          left: moderateScale(6),
        }}
      >
        <Animated.View
          style={[
            {
              width: trackW,
              height: rSize,
              borderRadius: rSize / 2,
              backgroundColor: bgColor as any,
              padding,
            },
            styles.track,
          ]}
        >
          <Animated.View
            style={[
              {
                width: knobSize,
                height: knobSize,
                borderRadius: knobSize / 2,
                transform: [{ translateX: knobTranslate }],
                backgroundColor: knobColor,
              },
              styles.knob,
            ]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ToggleSwitch;
