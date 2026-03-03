import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { ArrowRightIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { GradientView } from '../../../../../components/GradientView/GradientView';
import { scale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { styles } from './styles';

// Linear gradient: left dark (#173051) → right lighter (80% opacity)
const GRADIENT_COLORS = ['rgba(23, 48, 81, 1)', 'rgba(23, 48, 81, 0.8)'];
const GRADIENT_LOCATIONS = [0, 1];

export const UpdatesButton: React.FC = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Updates');
  };

  return (
    <View style={styles.container}>
       <GradientView
      colors={['rgba(23, 48, 81, 1)', 'rgba(23, 48, 81, 0.8)']}
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
          <View style={styles.touchable}>
            <AppText variant={TEXT_VARIANTS.h5_small} style={styles.text}>
              Get the Latest Updates
            </AppText>
            <ArrowRightIcon width={scale(20)} height={scale(20)} color={colors.white} />
          </View>
        </TouchableOpacity>
      </GradientView>
    </View>
  );
};

