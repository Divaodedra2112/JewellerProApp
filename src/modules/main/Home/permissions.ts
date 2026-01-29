export const homePermissions = {
  view: 'view',
} as const;

export type HomePermission = keyof typeof homePermissions;
