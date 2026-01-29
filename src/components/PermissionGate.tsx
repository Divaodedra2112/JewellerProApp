import React from 'react';
import { View } from 'react-native';
import { usePermission } from '../hooks/usePermission';

interface PermissionGateProps {
  moduleKey: string | null;
  action?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  moduleKey,
  action,
  children,
  fallback = null,
}) => {
  const { has } = usePermission();
  if (!has(moduleKey, action)) {
    return <>{fallback}</>;
  }
  return <View style={{ flex: 0 }}>{children}</View>;
};

export default PermissionGate;
