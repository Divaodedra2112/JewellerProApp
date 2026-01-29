import React, { useRef, useState, useEffect } from 'react';
import { Input as UIKittenInput } from '@ui-kitten/components';
import { Platform, View, TouchableOpacity, Text, InputAccessoryView, Keyboard } from 'react-native';
import styles from './styles';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

interface MultilineInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: object;
  onSubmit?: () => void;
}

export const MultilineInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  onSubmit,
}: MultilineInputProps): React.ReactElement => {
  const inputRef = useRef<any>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardShow = Keyboard.addListener(showEvent, () => setIsKeyboardOpen(true));
    const keyboardHide = Keyboard.addListener(hideEvent, () => setIsKeyboardOpen(false));

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const handleDone = () => {
    // Access the underlying TextInput through UIKitten's ref
    const textInput = (inputRef.current as any)?.textInputRef?.current;
    if (textInput) {
      textInput.blur();
    }
    onSubmit?.();
  };

  const textStyle = {
    ...styles.inputTextStyle,
    paddingBottom: isKeyboardOpen ? moderateScale(100) : moderateScale(16),
  };

  return (
    <View>
      <UIKittenInput
        ref={inputRef}
        style={[styles.input, style]}
        multiline
        textStyle={textStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray1000}
        maxLength={5000}
        returnKeyType="default"
        blurOnSubmit={false}
        scrollEnabled={true}
        onSubmitEditing={() => {
          // Prevent default behavior - allow newline insertion
          // This ensures return key creates a new line instead of submitting
        }}
        inputAccessoryViewID={onSubmit ? 'multiline-input-accessory' : undefined}
        cursorColor={colors.black}
        selectionColor={colors.black}
      />
      {Platform.OS === 'ios' && onSubmit && (
        <InputAccessoryView nativeID="multiline-input-accessory">
          <View style={styles.accessoryView}>
            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};
