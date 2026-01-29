import { configurePermissionCatalogFetcher } from './slice';
import { PermissionCatalogResponse } from './types';

// Default wiring for this project: uses src/services/api get('/permission/list')
export function configureRBACWithDefaultApi(
  get: <T>(url: string, params?: any) => Promise<T | null>
) {
  configurePermissionCatalogFetcher(async (): Promise<PermissionCatalogResponse> => {
    const res = (await get<PermissionCatalogResponse>(
      '/permission/list'
    )) as PermissionCatalogResponse;
    return res;
  });
}
