import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRightIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale } from '../../../../../utils/Responsive';
import { colors, Fonts } from '../../../../../utils/theme';
import { styles } from './styles';

export const UpdatesButton: React.FC = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    // Navigate to Updates screen/tab
    navigation.navigate('Updates');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Text style={styles.text}>
        Get the Latest Updates
      </Text>
      <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
    </TouchableOpacity>
  );
};

