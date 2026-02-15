import React, { ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { Text, Icon, IconElement } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { colors } from '../../utils/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PermissionGate } from '../../rbac';
import menu from '../../config/menuConfig.json';
import { MainStackParamList } from '../../types/navigation';
import { defaultIconSizes } from '../../utils/CommonStyles';
import {
  BackIconHeader,
  TaskTicketHorizontalIcon,
  TaskTicketVerticalIcon,
  ThreeDotsVerticalIcon,
} from '../../assets/icons/svgIcons/appSVGIcons';
const BackIcon = (props: any): IconElement => <Icon {...props} name="arrow-back" />;

const PlusIcon = (props: any): IconElement => <Icon {...props} name="plus" />;

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onPlusPressNavigateTo?: keyof MainStackParamList;
  onPlusPressParams?: any;
  onBackPress?: () => void;
  style?: ViewStyle;
  backIcon?: ReactElement;
  backgroundColor?: string;
  changeListLayout?: () => void;
  isHorizontalLayout?: boolean;
  handleEdit?: () => void;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
  rightIcon?: ReactElement;
  onRightIconPress?: () => void;
  /** Renders leftmost on the right side (before change layout and add). Order: leftRightIcon | change layout | add */
  leftRightIcon?: ReactElement;
  onLeftRightIconPress?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
  onPlusPressNavigateTo,
  onPlusPressParams,
  onBackPress,
  style,
  backIcon,
  backgroundColor,
  changeListLayout,
  isHorizontalLayout,
  handleEdit,
  showMenuButton = false,
  onMenuPress,
  rightIcon,
  onRightIconPress,
  leftRightIcon,
  onLeftRightIconPress,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = () => {
    if (!onPlusPressNavigateTo) {
      return;
    }

    switch (onPlusPressNavigateTo) {
      case 'Drawer':
        navigation.navigate('Drawer', { screen: 'MainTabs' });
        break;
      case 'AddProductScreen':
        navigation.navigate('AddProductScreen', onPlusPressParams || {});
        break;
      case 'ProductScreen':
        navigation.navigate('ProductScreen');
        break;
      case 'Category':
        navigation.navigate('Category');
        break;
      case 'AddCategoryScreen':
        navigation.navigate('AddCategoryScreen', onPlusPressParams || {});
        break;
      case 'ConcernTypeScreen':
        navigation.navigate('ConcernTypeScreen');
        break;
      case 'AddConcernTypeScreen':
        navigation.navigate('AddConcernTypeScreen', onPlusPressParams || {});
        break;
      case 'RoadScreen':
        navigation.navigate('RoadScreen');
        break;
      case 'AddRoadScreen':
        navigation.navigate('AddRoadScreen', onPlusPressParams || {});
        break;
      case 'AddStaffScreen':
        navigation.navigate('AddStaffScreen', onPlusPressParams || {});
        break;
      case 'AddCustomerScreen':
        navigation.navigate('AddCustomerScreen', onPlusPressParams || {});
        break;
      case 'AddBranchScreen':
        navigation.navigate(
          'AddBranchScreen',
          onPlusPressParams || {
            showCompanyDetails: true,
          }
        );
        break;
      case 'CustomerListScreen':
        navigation.navigate('CustomerListScreen', onPlusPressParams || {});
        break;
      case 'CustomerListScreen':
        navigation.navigate('CustomerListScreen', {});
        break;
      case 'CreateTaskScreen':
        navigation.navigate('CreateTaskScreen');
        break;
      case 'CreateConcernScreen':
        navigation.navigate('CreateConcernScreen');
        break;
      case 'AddSampleRequestScreen':
        navigation.navigate('AddSampleRequestScreen');
        break;
      case 'AddGradeScreen':
        navigation.navigate('AddGradeScreen');
        break;
      case 'AddSampleRequestScreen':
        navigation.navigate('AddSampleRequestScreen');
        break;
      case 'AddMasterBagCapScreen':
        navigation.navigate('AddMasterBagCapScreen');
        break;
      case 'AddDailyVisitScreen':
        navigation.navigate('AddDailyVisitScreen', onPlusPressParams || {});
        break;
      case 'AddCompetitorAnalysisScreen':
        navigation.navigate('AddCompetitorAnalysisScreen', onPlusPressParams || {});
        break;
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const { xmedium, small } = defaultIconSizes;

  return (
    <View style={[styles.header, { backgroundColor: backgroundColor || colors.transparent }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress} hitSlop={35}>
            {backIcon || <BackIconHeader width={small} height={small} color={colors.primary} />}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        {title && <Text style={[styles.title, style]}>{title}</Text>}
      </View>
      {leftRightIcon && onLeftRightIconPress && (
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={onLeftRightIconPress}
            style={styles.headerIconTouchable}
            activeOpacity={0.7}
          >
            {leftRightIcon}
          </TouchableOpacity>
        </View>
      )}
      {changeListLayout && (
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={changeListLayout}
            style={styles.headerIconTouchable}
            activeOpacity={0.7}
          >
            {isHorizontalLayout ? (
              <TaskTicketVerticalIcon width={xmedium} height={xmedium} color={colors.Gray80} />
            ) : (
              <TaskTicketHorizontalIcon width={xmedium} height={xmedium} color={colors.Gray80} />
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.rightContainer}>
        {rightIcon && onRightIconPress && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.headerIconTouchable}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
        {showMenuButton && (
          <TouchableOpacity
            onPress={onMenuPress}
            style={styles.headerIconTouchable}
            activeOpacity={0.7}
          >
            <ThreeDotsVerticalIcon width={xmedium} height={xmedium} color={colors.primary} />
          </TouchableOpacity>
        )}
        {onPlusPressNavigateTo &&
          (() => {
            const addRouteModuleMap: Record<string, string | null> = {
              AddProductScreen: 'product',
              AddCategoryScreen: 'category',
              AddConcernTypeScreen: 'concernType',
              AddRoadScreen: 'road',
              AddStaffScreen: 'staff',
              AddCustomerScreen: 'customer',
              AddSampleRequestScreen: 'sampleRequest',
              AddGradeScreen: 'grade',
            };
            const jsonModule =
              (menu as any[]).find(i => i.id === onPlusPressNavigateTo)?.moduleKey ?? null;
            const moduleKey = addRouteModuleMap[onPlusPressNavigateTo] ?? jsonModule;
            return (
              <PermissionGate moduleKey={moduleKey} action="add">
                {(() => {
                  return null;
                })()}
                <TouchableOpacity
                  onPress={handleNavigation}
                  style={styles.headerIconTouchable}
                  activeOpacity={0.7}
                >
                  <PlusIcon width={xmedium} height={xmedium} fill={colors.primary} />
                </TouchableOpacity>
              </PermissionGate>
            );
          })()}
      </View>
    </View>
  );
};

export default CustomHeader;
