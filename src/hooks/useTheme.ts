import { useTheme as useThemeNative } from '@react-navigation/native';

export const useTheme = () => {
  const theme = useThemeNative();

  return {
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      text: theme.colors.text,
      border: theme.colors.border,
      white: '#FFFFFF',
    },
  };
};
