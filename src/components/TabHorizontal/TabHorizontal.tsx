// TabHorizontal.tsx
import React, { memo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { styles } from './TabHorizontal.style';
import { AppText } from '../AppText/AppText';

export type SegmentOption<T extends string = string> = { label: string; value: T };

type Props<T extends string = string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  style?: ViewStyle;
  disabled?: boolean;
};

function TabHorizontalInner<T extends string>({
  options,
  value,
  onChange,
  style,
  disabled,
}: Props<T>) {
  return (
    <View style={[styles.container, style]} accessibilityRole="tablist">
      {options.map(opt => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            accessibilityRole="tab"
            accessibilityState={{ selected, disabled: !!disabled }}
            disabled={disabled}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              styles.pill,
              selected && styles.pillSelected,
              pressed && !selected && styles.pillPressed,
            ]}
          >
            <AppText style={[styles.label, selected && styles.labelSelected]}>{opt.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export const TabHorizontal = memo(TabHorizontalInner) as typeof TabHorizontalInner;
