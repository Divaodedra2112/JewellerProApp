import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        {title && (
          <AppText variant={TEXT_VARIANTS.h2} style={styles.headerTitle}>
            {title}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : moderateScale(44), // handles notch area
    backgroundColor: colors.white,
    paddingBottom:10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),
  },
  headerTitle: {
    color: colors.textPrimary,
  },
});

export default Header;
