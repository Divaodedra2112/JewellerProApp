// Metro bundler requires static resolution for requires/imports.
// This registry maps known screen keys (as used in menuConfig.json)
// to statically require'd components and wraps them with permission guards.
import { withPermission } from '../rbac/withPermission';

type AnyComponent = any;

type ScreenMeta = {
  component: AnyComponent;
  moduleKey: string | null;
  action: string; // 'list' by default
};

const registry: Record<string, ScreenMeta> = {
  '../modules/main/Home/Home.screen': {
    component: require('../modules/main/Home/Home.screen').default,
    moduleKey: null,
    action: 'list',
  },
  '../modules/main/Settings/SettingsScreen': {
    component: require('../modules/main/Settings/SettingsScreen').default,
    moduleKey: null,
    action: 'list',
  },
  '../modules/main/Chatbot/ChatbotScreen': {
    component: require('../modules/main/Chatbot/ChatbotScreen').default,
    moduleKey: null,
    action: 'list',
  },
  '../modules/main/Updates/UpdatesScreen': {
    component: require('../modules/main/Updates/UpdatesScreen').default,
    moduleKey: null,
    action: 'list',
  },
};

export function getScreenComponent(key: string): AnyComponent | null {
  const meta = registry[key];
  if (!meta) return null;
  return withPermission(meta.component, meta.moduleKey, meta.action);
}
