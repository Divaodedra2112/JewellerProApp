import { productPermissions } from '../modules/main/Products/permissions';
import { chatPermissions } from '../modules/main/Chat/permissions';
import { roadPermissions } from '../modules/main/Road/permissions';
import { EffectivePermissions, PermissionActionKey } from '../rbac/types';

export type ModulePermissions = {
  product: typeof productPermissions;
  chat: typeof chatPermissions;
  road: typeof roadPermissions;
  // Extend with other modules as you add their permissions.ts
};

export function hasPermission(
  effective: EffectivePermissions,
  moduleKey: string,
  action: PermissionActionKey
): boolean {
  const mod = effective[moduleKey];
  if (!mod) return false;
  return Boolean(mod[action]);
}

export function hasAnyPermission(
  effective: EffectivePermissions,
  checks: Array<{ module: string; action: PermissionActionKey }>
): boolean {
  return checks.some(c => hasPermission(effective, c.module, c.action));
}

export function hasAllPermissions(
  effective: EffectivePermissions,
  checks: Array<{ module: string; action: PermissionActionKey }>
): boolean {
  return checks.every(c => hasPermission(effective, c.module, c.action));
}
