import { EffectivePermissions, PermissionActionKey } from '../rbac/types';
import { showToast, TOAST_TYPE } from '../utils/toast';

export const hasPermission = (
  effective: EffectivePermissions,
  moduleKey: string,
  action: PermissionActionKey
): boolean => {
  const mod = effective[moduleKey];
  return Boolean(mod && mod[action]);
};

export const permissionMiddleware = (
  effective: EffectivePermissions,
  moduleKey: string,
  action: PermissionActionKey
) => {
  const allowed = hasPermission(effective, moduleKey, action);
  if (!allowed) {
    showToast(TOAST_TYPE.ERROR, `You do not have permission to ${action} ${moduleKey}`);
    return false;
  }
  return true;
};
