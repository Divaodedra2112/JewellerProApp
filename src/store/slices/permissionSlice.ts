import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get } from '../../services/api';

export type PermissionActionKey = 'view' | 'add' | 'update' | 'delete' | string;

export interface PermissionCatalogItem {
  key: string; // e.g., 'product'
  label: string;
  permissions: Array<{ key: PermissionActionKey; label: string }>; // e.g., [{key:'view'}]
}

export interface PermissionCatalogResponse {
  isSuccess: boolean;
  code: string;
  data: PermissionCatalogItem[];
}

export type EffectivePermissions = Record<string, PermissionActionKey[]>; // moduleKey -> actions

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

// Thunk: fetch permission catalog
export const fetchPermissionCatalog = createAsyncThunk(
  'permission/fetchCatalog',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await get<PermissionCatalogResponse>('/permission/list');
      if (!response?.isSuccess || !Array.isArray(response.data)) {
        throw new Error('Invalid permission catalog response');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch permission catalog');
    }
  }
);

// Utility: build effective permissions from user roles and catalog
export function buildEffectivePermissions(
  userRolesPermissions: Record<string, string[]>,
  catalog: PermissionCatalogItem[]
): EffectivePermissions {
  const effective: EffectivePermissions = {};
  const catalogMap: Record<string, PermissionCatalogItem> = {};
  for (const item of catalog) {
    catalogMap[item.key] = item;
  }

  Object.entries(userRolesPermissions || {}).forEach(([moduleKey, actions]) => {
    const availableActions = catalogMap[moduleKey]?.permissions?.map(p => p.key) || [];
    const normalized: PermissionActionKey[] = [];

    if (actions?.includes('*')) {
      availableActions.forEach(a => {
        if (!normalized.includes(a)) normalized.push(a);
      });
      // Ensure common actions even if not in catalog for safety
      ['view', 'add', 'update', 'delete'].forEach(a => {
        if (!normalized.includes(a)) normalized.push(a);
      });
    } else {
      actions?.forEach(action => {
        if (action === '*') {
          availableActions.forEach(a => {
            if (!normalized.includes(a)) normalized.push(a);
          });
        } else if (
          availableActions.includes(action) ||
          ['view', 'add', 'update', 'delete'].includes(action)
        ) {
          if (!normalized.includes(action)) normalized.push(action);
        }
      });
    }

    effective[moduleKey] = normalized;
  });

  return effective;
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

export const { setEffectivePermissions, clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
