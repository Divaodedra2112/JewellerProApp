import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { MainStackParamList, GenericParamList } from '../types/navigation';
import DrawerContent from '../components/Drawer/DrawerContent';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { navigationModulesConfig } from '../config/navigationConfig';
import NotAuthorized from '../components/NotAuthorized/NotAuthorized';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
// Profile removed - add your custom screens here

const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<GenericParamList>();

const DrawerNavigator = () => {
  const modules = useSelector((state: RootState) => state.auth.modules);
  const filteredDrawerItems = navigationModulesConfig.filter(item => {
    if (!modules.includes(item.id) || item.type !== 'drawer') {
      return false;
    }
    // Lazy import to avoid circular - use permission hook here
    return true; // permission check applied in DrawerContent
  });

  // Always show drawer with bottom tabs, even if no drawer items
  // The drawer is needed for the hamburger menu to access bottom tabs
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '67%',
        },
        drawerPosition: 'left',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
      {filteredDrawerItems.map(item => (
        <Drawer.Screen
          key={item.id}
          name={item.id as keyof GenericParamList}
          component={item.component}
          options={{
            drawerLabel: item.name,
            drawerIcon: ({ color }) => item.icon?.({ color }),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      {/* Add your custom screens here */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
