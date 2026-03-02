import React from 'react';
import { View, TouchableOpacity, Linking, Image } from 'react-native';
import { AppText } from '../../../../../components/AppText/AppText';
import { TEXT_VARIANTS } from '../../../../../components/AppText/AppText';
import { ArrowRightIcon } from '../../../../../assets/icons/svgIcons/appSVGIcons';
import { scale, verticalScale, moderateScale } from '../../../../../utils/Responsive';
import { colors } from '../../../../../utils/theme';
import { Images } from '../../../../../utils';
import { styles } from './styles';

const JEWELLER_PRO_VIEW_URL = 'https://jewellerpro.in';

export const JewellerProAppCard: React.FC = () => {
  const handleViewPress = async () => {
    const canOpen = await Linking.canOpenURL(JEWELLER_PRO_VIEW_URL);
    if (canOpen) {
      await Linking.openURL(JEWELLER_PRO_VIEW_URL);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <AppText variant={TEXT_VARIANTS.h3} style={styles.title}>
            Jeweller Pro App
          </AppText>
          <AppText variant={TEXT_VARIANTS.h6_small} style={styles.description}>
            Stay updated with GST, PMLA, Hallmark and industry regulations – all in one place.
          </AppText>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={handleViewPress}
            activeOpacity={0.8}
          >
            <AppText variant={TEXT_VARIANTS.h5_small} style={styles.viewButtonText}>
              View
            </AppText>
            <ArrowRightIcon width={scale(16)} height={scale(16)} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.illustrationBlock}>
          <Image
            source={Images.HOME_BANNER}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};
