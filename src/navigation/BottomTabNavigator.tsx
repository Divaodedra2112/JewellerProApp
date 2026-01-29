import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GenericParamList } from '../types/navigation';
import { colors } from '../utils/theme';
import { moderateScale } from '../utils/Responsive';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { navigationModulesConfig, NavigationItem } from '../config/navigationConfig';
import { useDynamicMenu } from './buildDynamicMenu';
import CustomTabBar from '../components/BottomTabNavigation/CustomTabBar';
import { Text, View } from 'react-native';
import { Fonts } from '../utils/theme';
import { usePermission } from '../rbac';

const Tab = createBottomTabNavigator<GenericParamList>();

const BottomTabNavigator = () => {
  const modules = useSelector((state: RootState) => state.auth.modules);
  const { has } = usePermission();
  const dynamicMenu = useDynamicMenu();

  // Filter tabs from static navigation config
  const filteredTabs = navigationModulesConfig.filter((tab: NavigationItem) => {
    if (tab.type !== 'bottomTab') return false;

    // Always show Dashboard (Home) tab regardless of permissions
    if (tab.id === 'Home') {
      return true;
    }

    const jsonItem = dynamicMenu.find(i => i.id === tab.id);
    if (!jsonItem) return false; // wait for JSON-driven mapping to resolve
    const moduleKey = (jsonItem.moduleKey as string | null) ?? null;
    const allowed = has(moduleKey, 'view');
    return allowed;
  });

  // Merge with JSON-driven bottom tabs (permission filtered inside useDynamicMenu)
  const jsonBottomTabs = dynamicMenu.filter(i => i.type === 'bottomTab');

  // Build a combined list, preferring explicit items when IDs collide
  const combinedBottomTabs: Array<NavigationItem & { component: any }> = [
    ...filteredTabs,
    ...jsonBottomTabs
      .filter(i => !filteredTabs.find(t => t.id === i.id))
      .map(i => ({ id: i.id, name: i.name, component: i.component, type: 'bottomTab' } as any)),
  ];

  if (combinedBottomTabs.length === 0) {
    return null;
  }

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: moderateScale(70),
          paddingBottom: moderateScale(10),
          paddingTop: moderateScale(8),
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabel: ({ focused, color: _color }) => (
          <Text
            style={{
              fontFamily: focused ? Fonts.bold : Fonts.regular,
              fontWeight: focused ? 'bold' : 'normal',
              color: focused ? colors.textPrimary : colors.textSecondary,
              fontSize: moderateScale(9),
              marginTop: 4,
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused, color: _color }) => {
          // Find the tab config for this route
          const tab = combinedBottomTabs.find(t => t.name === route.name);
          // Use black for focused, gray for unfocused
          const iconColor = focused ? colors.textPrimary : colors.gray400;
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
              {tab?.icon?.({ color: iconColor, focused })}
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontFamily: 'regular',
        },
        tabBarItemStyle: {
          height: moderateScale(50),
          justifyContent: 'center',
          flex: 1,
        },
        tabBarIconStyle: {
          width: moderateScale(20),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 0,
        },
        header: () => <Header title={route.name} />,
      })}
    >
      {combinedBottomTabs.map((tab: NavigationItem & { component: any }) => (
        <Tab.Screen
          key={tab.id}
          name={tab.name as keyof GenericParamList}
          component={tab.component}
          options={{ headerShown: false }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
