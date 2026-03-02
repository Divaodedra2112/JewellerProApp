import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { ArrowRightIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { styles } from './styles';

export const UpdatesButton: React.FC = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Updates');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.touchable}>
        <AppText variant={TEXT_VARIANTS.h5_small} style={styles.text}>
          Get the Latest Updates
        </AppText>
        <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

