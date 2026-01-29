import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { GenericParamList } from '../../types/navigation';
import { Icon } from '@ui-kitten/components';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { AppText, TEXT_VARIANTS } from '../AppText/AppText';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<DrawerNavigationProp<GenericParamList>>();

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu-outline"
            fill={colors.textPrimary}
            style={{ width: moderateScale(24), height: moderateScale(24) }}
          />
          {title && (
            <AppText variant={TEXT_VARIANTS.h2} style={styles.headerTitle}>
              {title}
            </AppText>
          )}
        </TouchableOpacity>
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
    paddingHorizontal: moderateScale(16),
  },
  menuButton: {
    padding: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: moderateScale(120),
    color: colors.textPrimary,
  },
});

export default Header;
