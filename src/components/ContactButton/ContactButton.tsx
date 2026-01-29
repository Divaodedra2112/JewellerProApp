import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, Fonts } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';

interface ContactButtonProps {
  text: string;
  onPress: () => void;
  icon?: 'phone' | 'email' | 'map';
  disabled?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  text,
  onPress,
  icon = 'phone',
  disabled = false,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'phone':
        return '📞';
      case 'email':
        return '✉️';
      case 'map':
        return '📍';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary || '#007AFF',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: moderateScale(64), // Large touch target for elderly users
    marginTop: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    backgroundColor: colors.textSecondary || '#CCCCCC',
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: moderateScale(24),
    marginRight: moderateScale(12),
  },
  text: {
    fontSize: moderateScale(18), // Large text for readability
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
    flex: 1,
  },
  arrow: {
    fontSize: moderateScale(20),
    color: '#FFFFFF',
    marginLeft: moderateScale(8),
  },
});

export default ContactButton;


