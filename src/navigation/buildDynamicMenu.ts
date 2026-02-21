import rawConfig from '../config/menuConfig.json';
import { getScreenComponent } from './screenRegistry';
import { navigationModulesConfig } from '../config/navigationConfig';

export type MenuItemConfig = {
  id: string;
  name: string;
  moduleKey: string | null;
  screen: string; // relative require path from this file's directory
  type: 'drawer' | 'bottomTab';
  permissionKey?: 'list';
};

export function useDynamicMenu() {
  const items = (rawConfig as unknown as MenuItemConfig[]).map(item => {
    const Component = getScreenComponent(item.screen);
    return { ...item, component: Component } as any;
  });

  // Return all items without permission filtering
  return items as Array<MenuItemConfig & { component: any }>;
}

// Drawer-focused hook: JSON-driven items with icons merged from static config, no component loading
export function useDrawerMenu() {
  // Build a quick lookup for icons from the static navigationModulesConfig by id
  const idToIcon = new Map<string, any>();
  navigationModulesConfig.forEach(cfg => {
    if (cfg && cfg.id) {
      idToIcon.set(cfg.id, (cfg as any).icon);
    }
  });

  const items = (rawConfig as unknown as MenuItemConfig[])
    .filter(item => item.type === 'drawer')
    .map(item => {
      const icon = idToIcon.get(item.id) || null;
      return { ...item, icon } as any; // keep the same API Drawer expects (item.icon?.({ color }))
    });

  // Return all items without permission filtering
  return items as Array<MenuItemConfig & { icon?: any }>;
}
