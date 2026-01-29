// Strict, backend-aligned action keys
export type PermissionActionKey =
  | 'view'
  | 'add'
  | 'update'
  | 'delete'
  | 'add_chat_participants'
  | 'remove_chat_participants'
  | 'update_chat_participants'
  | 'update_participant_status';

// Module keys known from backend. Keep as string for forward-compat; consumers can narrow via schema
export type PermissionModuleKey =
  | 'category'
  | 'chat'
  | 'concernType'
  | 'customer'
  | 'grade'
  | 'notification'
  | 'product'
  | 'products'
  | 'road'
  | 'role'
  | 'staff'
  | 'task'
  | 'concern'
  | 'sampleRequest'
  | 'unit'
  | 'competitorAnalysis'
  | 'dailyVisit'
  | 'masterBagCap'
  | string;

export interface PermissionCatalogItem {
  key: string;
  label: string;
  permissions: Array<{ key: PermissionActionKey; label: string }>;
}

export interface PermissionCatalogResponse {
  isSuccess: boolean;
  code: string;
  data: PermissionCatalogItem[];
}

// Effective permissions as boolean map for O(1) checks and strong typing
export type EffectivePermissions = Record<string, Partial<Record<PermissionActionKey, boolean>>>;

export type RBACGetCatalog = () => Promise<PermissionCatalogResponse>;

// Optional: a static schema constant for compile-time guidance and autocomplete
export type PermissionsSchema = Record<string, PermissionActionKey[]>;
