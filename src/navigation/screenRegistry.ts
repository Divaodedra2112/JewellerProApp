// Metro bundler requires static resolution for requires/imports.
// This registry maps known screen keys (as used in menuConfig.json)
// to statically require'd components.

type AnyComponent = any;

const registry: Record<string, AnyComponent> = {
  '../modules/main/Home/Home.screen': require('../modules/main/Home/Home.screen').default,
  '../modules/main/Settings/SettingsScreen': require('../modules/main/Settings/SettingsScreen').default,
  '../modules/main/Chatbot/ChatbotScreen': require('../modules/main/Chatbot/ChatbotScreen').default,
  '../modules/main/Updates/UpdatesScreen': require('../modules/main/Updates/UpdatesScreen').default,
};

export function getScreenComponent(key: string): AnyComponent | null {
  return registry[key] || null;
}
