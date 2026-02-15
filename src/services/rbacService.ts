import { homePermissions } from '../modules/main/Home/permissions';
import { EffectivePermissions, PermissionActionKey } from '../rbac/types';

export type ModulePermissions = {
  home: typeof homePermissions;
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
