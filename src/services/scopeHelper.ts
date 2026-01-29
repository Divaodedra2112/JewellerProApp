// Helper to apply userScope filters to API params
// Example: limit road queries to allowed IDs

export function applyUserScopeToParams(
  params: Record<string, any>,
  userScope?: Record<string, Array<{ id: number }>>
) {
  if (!userScope) return params;

  const next = { ...params };
  if (userScope.road && userScope.road.length > 0) {
    next.roadIds = userScope.road.map(r => r.id);
  }
  // Add more scope mappings as needed
  return next;
}
