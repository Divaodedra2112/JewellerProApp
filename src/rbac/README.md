# RBAC module (drop-in)

This folder provides a decoupled Role-Based Access Control layer you can copy into another React Native + Redux Toolkit app.

Exports:

- reducer: permissionReducer
- actions: fetchPermissionCatalog, setEffectivePermissions, clearPermissions
- utils: buildEffectivePermissions, configurePermissionCatalogFetcher
- hooks: usePermission() -> { has, hasAll, hasAny }
- component: PermissionGate (moduleKey, action?)
- HOC: withPermission(Wrapped, moduleKey, action?)

Quick integrate in another app:

1. Copy src/rbac/ folder.
2. Add to root reducer: { permission: permissionReducer }
3. Configure catalog fetcher once (e.g., in app init):
   - import { configurePermissionCatalogFetcher } from './rbac';
   - configurePermissionCatalogFetcher(async () => yourApiGet('/permission/list'));
4. After login:
   - await dispatch(fetchPermissionCatalog());
   - const catalog = getState().permission.catalog;
   - const effective = buildEffectivePermissions(user.permissions, catalog);
   - dispatch(setEffectivePermissions(effective));
5. Gate UI:
   - import { PermissionGate, usePermission } from './rbac';
   - <PermissionGate moduleKey="product" action="add"> ... </PermissionGate>
6. Navigation is JSON-driven: add entries in src/config/menuConfig.json, and add an entry in src/navigation/screenRegistry.ts that statically requires the component and sets its moduleKey.

---

**\*\*\*\***\***\*\*\*\*** How it works **\*\*\*\***\*\*\*\***\*\*\*\***

Login to UI flow
OTP success (login response)
We receive user permissions in the login response (roles + optional customPermissions).

Fetch permission catalog

Right after OTP success, we call:
dispatch(fetchPermissionCatalog()).unwrap()
This hits /permission/list and stores the server’s canonical module/action list in Redux at state.permission.catalog.

Build effective permissions (boolean map)
We compute the final (“effective”) permissions by merging role permissions + custom permissions + wildcards with the catalog into a boolean map:
effective[moduleKey][action] = true
Then: dispatch(setEffectivePermissions(effective))

Rules:

- '\*' grants all actions in the catalog for that module (plus CRUD baseline)
- Unknown actions ignored; only valid catalog/CRUD actions are kept

We store the merged result in Redux at state.permission.effective.

How the UI uses effective permissions
Bottom tabs + Drawer:

- Items come from menuConfig.json and are resolved via screenRegistry
- Items are shown only if has(moduleKey, 'list') (maps to 'view') or '\*'

Direct navigation / deep links:

- Every JSON-defined screen is wrapped with withPermission(moduleKey, 'list'), so blocked routes render a Not Authorized fallback

Header “+” button:

- Uses PermissionGate with action='add' and the correct moduleKey for the target add route

Swipe actions in list items:

- Centralized in reusable components (ProductCard, CommonListCard, SimpleListView)
- Render edit/delete only if handlers exist AND has(moduleKey, 'update'/'delete'); otherwise, hide and toast on denied taps

Result:
What the user sees is always the intersection between login permissions and the server-defined catalog.
What each RBAC file does (src/rbac/)

types.ts
Defines data types for catalog items, responses, effective permission map, and the fetcher signature.

slice.ts
Redux slice with state: { loading, error, catalog, effective }.
fetchPermissionCatalog(): thunk that calls /permission/list via a configurable fetcher and saves to state.permission.catalog.

buildEffectivePermissions(loginPerms, catalog): merges login permissions with the catalog to produce state.permission.effective.

setEffectivePermissions(), clearPermissions(): reducers to update/reset effective permissions.

configure.ts
configureRBACWithDefaultApi(get): hook up your API get function so fetchPermissionCatalog knows how to call /permission/list.

hooks.ts
usePermission(): returns has(module, action?), hasAll([...]), hasAny([...]) to check permissions inside components.

PermissionGate.tsx
Wrapper component; only renders children if usePermission().has(moduleKey, action) is true.

withPermission.tsx
HOC that guards a screen; renders Not Authorized content if permission fails (used by screenRegistry around every JSON-defined screen).
Where to look in code (for reference)

OTP flow:
src/modules/auth/otp/otpActions.ts
After OTP success:
dispatch(fetchPermissionCatalog()).unwrap()
buildEffectivePermissions(login.permissions, state.permission.catalog)
dispatch(setEffectivePermissions(effective))
Tabs and Drawer:
Tabs: src/navigation/BottomTabNavigator.tsx (merges static + JSON; permission based on moduleKey from JSON)
Drawer: src/components/Drawer/DrawerContent.tsx (permission based on moduleKey from JSON)
Header “+” button:
src/components/CustomHeader/Header.tsx (PermissionGate with action='add'; moduleKey resolved for add routes)
Swipe actions:
src/components/ProductCard/ProductCard.tsx
src/components/CommonListCard/CommonListCard.tsx
src/components/SimpleListView/SimpleListView.tsx
These accept moduleKey and handle permissions centrally (only render allowed actions; show toasts when blocked).
In one line
After OTP, we fetch the catalog and merge role + custom permissions (with wildcards) into a boolean effective map. All UI (tabs/drawer/plus/crud) is driven by moduleKey + action checks; JSON-driven screens are guarded globally so unauthorized routes never render.

-----How to add a new module/screen--------

Add entry to menuConfig.json: id, name, moduleKey, screen (path), type (drawer/bottomTab), permissionKey ('list').
Add the screen path to screenRegistry with its moduleKey.
Ensure backend includes the module in the catalog and sends permissions in login roles/custom.
That’s it; it will appear automatically if the user has list/view or ''.
What guarantees are in place
Screen loads only if user has list/view or '' for that module (JSON-driven + HOC guard).
Header “+” renders only with add permission.
Edit/Delete actions render only with update/delete permission.
Direct navigate/deep links to unauthorized screens always show Not Authorized (screenRegistry wraps everything).
Strict typing
Actions are typed (PermissionActionKey), effective map is a boolean indexable by action.
Per-module permissions.ts files exist for clarity; backend catalog remains the source of truth.
Decoupling and portability
All RBAC logic is in src/rbac and is portable.
Per-module permissions live with their modules (clean separation).
Navigation is driven by JSON + a thin static registry layer for bundler safety.
