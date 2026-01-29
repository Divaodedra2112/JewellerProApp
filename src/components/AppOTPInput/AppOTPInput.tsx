import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';
import { colors } from '../../utils/theme';

interface AppOTPInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  autoFocusOnClear?: boolean;
}

export const AppOTPInput: React.FC<AppOTPInputProps> = ({
  length,
  value,
  onChange,
  autoFocusOnClear = true,
}) => {
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    if (autoFocusOnClear) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  useEffect(() => {
    if (autoFocusOnClear && (!value || value.length === 0)) {
      inputRefs.current[0]?.focus();
      setFocusedIndex(0);
    }
  }, [value, autoFocusOnClear]);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    const cleanText = text.replace(/[^0-9]/g, '').slice(-1); // Only one digit

    if (cleanText) {
      newValue[index] = cleanText;
      onChange(newValue.join(''));

      // Auto-focus next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newValue = value.split('');

      if (newValue[index]) {
        // If current box has value, clear it
        newValue[index] = '';
        onChange(newValue.join(''));
        setFocusedIndex(index); // Keep focus here
      } else if (index > 0) {
        // If current box is empty, move to previous box
        inputRefs.current[index - 1]?.focus();
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            style={[styles.input, focusedIndex === index && styles.focusedInput]}
            maxLength={1}
            keyboardType="number-pad"
            value={value[index] || ''}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            selectTextOnFocus={false}
            cursorColor={colors.black}
            selectionColor={colors.black}
          />
        ))}
    </View>
  );
};
