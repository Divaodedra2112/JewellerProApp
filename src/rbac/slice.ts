import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EffectivePermissions,
  PermissionCatalogItem,
  RBACGetCatalog,
  PermissionActionKey,
} from './types';

interface PermissionState {
  loading: boolean;
  error: string | null;
  catalog: PermissionCatalogItem[];
  effective: EffectivePermissions;
}

const initialState: PermissionState = {
  loading: false,
  error: null,
  catalog: [],
  effective: {},
};

let getCatalogImpl: RBACGetCatalog | null = null;

export function configurePermissionCatalogFetcher(fetcher: RBACGetCatalog) {
  getCatalogImpl = fetcher;
}

// 1) Fetch the server's authoritative permission catalog (/permission/list)
//    We only STORE the catalog here. The LOGIN response is NOT compared here.
//    The MERGE of login permissions + catalog happens inside buildEffectivePermissions()
//    This will only fetch if catalog is not already loaded
export const fetchPermissionCatalog = createAsyncThunk(
  'permission/fetchCatalog',
  async (_: void, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { permission: PermissionState };

      // If catalog is already loaded, return it without API call
      if (state.permission.catalog.length > 0) {
        console.log('[RBAC][Permissions] Catalog already loaded, using cached version');
        return state.permission.catalog;
      }

      if (!getCatalogImpl) throw new Error('RBAC catalog fetcher not configured');
      console.log('[RBAC][Permissions] Fetching /permission/list from server...');
      const response = await getCatalogImpl();
      console.log('[RBAC][Permissions] /permission/list raw response:', response);
      if (!response?.isSuccess || !Array.isArray(response.data)) {
        throw new Error('Invalid permission catalog response');
      }
      console.log('[RBAC][Permissions] Catalog fetched and cached. Size:', response.data.length);
      return response.data;
    } catch (error: any) {
      console.error('[RBAC][Permissions] Catalog fetch failed:', error?.message || error);
      return rejectWithValue(error?.message || 'Failed to fetch permission catalog');
    }
  }
);

// 2) Merge login response permissions (module -> string[] actions) with the catalog's
//    list of valid actions to produce EFFECTIVE permissions used by the UI.
//    - '*' expands to all actions defined in the catalog for that module (plus CRUD baseline)
//    - unknown actions not defined by the catalog (and not in the CRUD baseline) are ignored
export function buildEffectivePermissions(
  userRolesPermissions: Record<string, string[]>,
  catalog: PermissionCatalogItem[]
): EffectivePermissions {
  const effective: EffectivePermissions = {};

  // Build quick lookup for catalog actions by canonical module key
  const catalogMap: Record<string, PermissionActionKey[]> = {};
  for (const item of catalog) {
    catalogMap[item.key] = (item.permissions || []).map(p => p.key as PermissionActionKey);
  }

  const canonicalizeModuleKey = (key: string): string => {
    if (key === 'products') return 'product';
    return key;
  };

  const CRUD_BASELINE: PermissionActionKey[] = ['view', 'add', 'update', 'delete'];

  Object.entries(userRolesPermissions || {}).forEach(([rawModuleKey, actions]) => {
    const moduleKey = canonicalizeModuleKey(rawModuleKey);
    const availableActions = catalogMap[moduleKey] || [];
    const boolMap: Partial<Record<PermissionActionKey, boolean>> = {};

    const grant = (act: string) => {
      const action = act as PermissionActionKey;
      if (
        (availableActions as string[]).includes(action) ||
        (CRUD_BASELINE as string[]).includes(action)
      ) {
        boolMap[action as PermissionActionKey] = true;
      }
    };

    if (actions?.includes('*')) {
      // Wildcard → grant all catalog actions + CRUD baseline and mark '*'
      availableActions.forEach(a => (boolMap[a] = true));
      CRUD_BASELINE.forEach(a => (boolMap[a] = true));
      (boolMap as any)['*'] = true;
    } else {
      actions?.forEach(a => {
        if (a === '*') {
          availableActions.forEach(x => (boolMap[x] = true));
          CRUD_BASELINE.forEach(x => (boolMap[x] = true));
          (boolMap as any)['*'] = true;
        } else {
          grant(a);
        }
      });
    }

    effective[moduleKey] = boolMap;
  });

  return effective;
}

// Helper to merge multiple permission maps before building effective permissions
export function mergeUserPermissionMaps(
  ...maps: Array<Record<string, string[] | undefined> | undefined>
): Record<string, string[]> {
  const merged: Record<string, Set<string>> = {};
  for (const m of maps) {
    if (!m) continue;
    Object.entries(m).forEach(([module, actions]) => {
      if (!actions) return;
      if (!merged[module]) merged[module] = new Set<string>();
      actions.forEach(a => merged[module].add(a));
    });
  }
  const out: Record<string, string[]> = {};
  Object.entries(merged).forEach(([k, v]) => (out[k] = Array.from(v)));
  return out;
}

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setEffectivePermissions: (state, action: PayloadAction<EffectivePermissions>) => {
      state.effective = action.payload;
    },
    clearPermissions: state => {
      state.catalog = [];
      state.effective = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPermissionCatalog.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPermissionCatalog.fulfilled,
        (state, action: PayloadAction<PermissionCatalogItem[]>) => {
          state.loading = false;
          state.catalog = action.payload;
        }
      )
      .addCase(fetchPermissionCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load permissions';
      });
  },
});

// Helper to check if catalog is already loaded
export const isCatalogLoaded = (state: PermissionState): boolean => {
  return state.catalog.length > 0;
};

// Helper to get catalog from state
export const getCatalog = (state: PermissionState): PermissionCatalogItem[] => {
  return state.catalog;
};

export const { setEffectivePermissions, clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
