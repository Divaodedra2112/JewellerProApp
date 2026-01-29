import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import styles from './SearchBar.styles';
import { SearchIcon, CloseIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../utils/CommonStyles';
import { colors } from '../../utils/theme';

interface SearchBarProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  isLoading?: boolean;
  debounceDelay?: number; // Optional: allow custom debounce delay, default 500ms
}

const SearchBar: React.FC<SearchBarProps> = ({
  leftIcon,
  rightIcon,
  onRightIconPress,
  isLoading,
  value,
  onChangeText,
  debounceDelay = 500,
  ...textInputProps
}) => {
  const { small } = defaultIconSizes;
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Sync local value with prop value when it changes externally
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Debounced function to call onChangeText after delay
  const debouncedOnChange = useCallback(
    (text: string) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        if (onChangeText) {
          onChangeText(text);
        }
        timeoutRef.current = undefined;
      }, debounceDelay);
    },
    [onChangeText, debounceDelay]
  );

  const handleTextChange = (text: string) => {
    // Update local state immediately for UI responsiveness
    setLocalValue(text);
    // Debounce the onChangeText callback (API call)
    debouncedOnChange(text);
  };

  const handleClear = () => {
    // Clear local state immediately
    setLocalValue('');
    // Cancel any pending debounced calls
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    // Call onChangeText immediately when clearing
    if (onChangeText) {
      onChangeText('');
    }
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      {leftIcon ? (
        <TouchableOpacity onPress={onRightIconPress}>{leftIcon}</TouchableOpacity>
      ) : (
        <SearchIcon width={small} height={small} color={colors.gray1000} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={colors.gray1000}
        value={localValue}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
        cursorColor={colors.black}
        selectionColor={colors.black}
      />
      <View style={styles.rightContainer}>
        {isLoading && (
          <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
        )}
        {localValue && !isLoading && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <CloseIcon width={small} height={small} color={colors.gray1000} />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <TouchableOpacity
            onPress={() => {
              if (onRightIconPress) {
                onRightIconPress();
              }
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
