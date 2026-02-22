import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRightIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { GradientView } from '../../../../../components/GradientView/GradientView';
import { styles } from './styles';

export const UpdatesButton: React.FC = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    // Navigate to Updates screen/tab
    navigation.navigate('Updates');
  };

  return (
    <GradientView
      colors={['rgba(23, 48, 81, 0.8)', 'rgba(23, 48, 81, 1)']}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <Text style={styles.text}>
          Get the Latest Updates
        </Text>
        <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
      </TouchableOpacity>
    </GradientView>
  );
};

