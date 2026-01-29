import React, { useState } from 'react';
import { View, Image, ImageStyle, ViewStyle, Text, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { styles } from './Avatar.styles';

interface AvatarProps {
  image?: string | null;
  firstName?: string;
  lastName?: string;
  name?: string; // For company or single name
  size?: number;
  mainStyle?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle | ImageStyle[];
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  isDisabled?: boolean;
  onPress?: () => void;
  type?: 'staff' | 'company'; // To differentiate between staff and company
}

// Generate a consistent color based on a string
const generateColorFromString = (str: string): string => {
  if (!str || str.length === 0) {
    return colors.gray100;
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color with good contrast (not too dark, not too light)
  const hue = hash % 360;
  const saturation = 65 + (hash % 20); // 65-85%
  const lightness = 45 + (hash % 15); // 45-60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Get initials for staff (first char of firstName + first char of lastName)
const getStaffInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.trim().charAt(0).toUpperCase() || '';
  const last = lastName?.trim().charAt(0).toUpperCase() || '';
  const initials = `${first}${last}`;
  return initials.length > 0 ? initials : '?';
};

// Get initials for company (first char only)
const getCompanyInitials = (name?: string): string => {
  if (!name || name.trim().length === 0) {
    return '?';
  }
  return name.trim().charAt(0).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  image,
  firstName,
  lastName,
  name,
  size = moderateScale(50),
  mainStyle,
  imageStyle,
  resizeMode = 'cover',
  isDisabled = false,
  onPress,
  type = 'staff',
}) => {
  const [hasError, setHasError] = useState(false);

  // Check if image is valid
  const isValidImage =
    image &&
    image !== null &&
    typeof image === 'string' &&
    image.trim() !== '' &&
    !image.startsWith('file://') &&
    !hasError;

  // Get initials based on type
  const initials =
    type === 'staff' ? getStaffInitials(firstName, lastName) : getCompanyInitials(name || firstName);

  // Generate background color from the full name
  const fullName = type === 'staff' 
    ? `${firstName || ''} ${lastName || ''}`.trim()
    : (name || firstName || '');
  const backgroundColor = generateColorFromString(fullName || 'default');

  // Calculate text size based on avatar size
  const textSize = size * 0.4; // 40% of avatar size

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    ...(mainStyle as object),
  };

  const avatarImageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    ...(imageStyle as object),
  };

  const initialsContainerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={isDisabled || !onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {isValidImage ? (
        <Image
          source={{ uri: image }}
          style={avatarImageStyle}
          resizeMode={resizeMode}
          onError={() => setHasError(true)}
        />
      ) : (
        <View style={initialsContainerStyle}>
          <Text
            style={[
              styles.initialsText,
              {
                fontSize: textSize,
                color: colors.white,
              },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

