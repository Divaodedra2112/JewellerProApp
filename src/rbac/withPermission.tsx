import React from 'react';
import { usePermission } from './hooks';
import { View } from 'react-native';
import AppText from '../components/AppText/AppText';

export function withPermission<P extends object>(
  Wrapped: React.ComponentType<P>,
  moduleKey: string | null,
  action: string = 'list'
) {
  return function Guarded(props: P) {
    const { has } = usePermission();
    const allowed = has(moduleKey, action);
    if (!allowed) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AppText>You are not authorized to view this screen.</AppText>
        </View>
      );
    }
    return <Wrapped {...props} />;
  };
}
