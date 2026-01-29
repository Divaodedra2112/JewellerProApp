import { StyleSheet } from 'react-native';
import { moderateScale } from './Responsive';
import { colors } from './theme';

export interface SwipeActionPermissions {
  hasEdit: boolean;
  hasDelete: boolean;
}

export const createSwipeActionStyles = (permissions: SwipeActionPermissions) => {
  const { hasEdit, hasDelete } = permissions;

  // If both permissions exist, use original styles
  if (hasEdit && hasDelete) {
    return {
      swipIconWithOutBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: moderateScale(68),
        height: '100%' as any,
        backgroundColor: colors.divider,
      },
      swipIconWithBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: moderateScale(68),
        height: '100%' as any,
        backgroundColor: colors.redButtonColor,
      },
    };
  }

  // If only one permission exists, make it fill the full width with rounded corners
  if (hasEdit && !hasDelete) {
    return {
      swipIconWithOutBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: '100%' as any,
        height: '100%' as any,
        backgroundColor: colors.divider,
        borderTopRightRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
      },
      swipIconWithBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: '100%' as any,
        height: '100%' as any,
        backgroundColor: colors.redButtonColor,
        borderTopRightRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
      },
    };
  }

  if (!hasEdit && hasDelete) {
    return {
      swipIconWithOutBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: '100%' as any,
        height: '100%' as any,
        backgroundColor: colors.divider,
        borderTopRightRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
      },
      swipIconWithBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: '100%' as any,
        height: '100%' as any,
        backgroundColor: colors.redButtonColor,
        borderTopRightRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
      },
    };
  }

  // Fallback (should not happen as swipe is disabled when no permissions)
  return {
      swipIconWithOutBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: moderateScale(68),
        height: '100%' as any,
        backgroundColor: colors.divider,
      },
      swipIconWithBackground: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        width: moderateScale(68),
        height: '100%' as any,
        backgroundColor: colors.redButtonColor,
      },
  };
};
