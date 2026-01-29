import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './SegmentedToggle.style';

interface SegmentedToggleProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

const SegmentedToggle: React.FC<SegmentedToggleProps> = ({ options, selected, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = option === selected;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.option, isSelected && styles.selectedOption]}
          >
            <Text style={[styles.optionText, isSelected && styles.selectedText]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedToggle;
