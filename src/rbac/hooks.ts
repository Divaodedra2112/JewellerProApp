import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function usePermission() {
  const effective = useSelector((state: RootState) => state.permission.effective);

  return useMemo(() => {
    const has = (moduleKey: string | null | undefined, action?: string): boolean => {
      if (!moduleKey) return true;
      const actions = effective[moduleKey] as any;
      if (!actions) return false;
      if (!action || action === 'list') return Boolean(actions.view) || Boolean(actions['*']);
      return Boolean(actions[action]) || Boolean(actions['*']);
    };

    const hasAll = (checks: Array<{ module: string | null; action?: string }>): boolean =>
      checks.every(c => has(c.module, c.action));

    const hasAny = (checks: Array<{ module: string | null; action?: string }>): boolean =>
      checks.some(c => has(c.module, c.action));

    return { has, hasAll, hasAny };
  }, [effective]);
}
