import { Platform } from 'react-native';

// Declare only once for the `theme` object and its dynamic structure
interface ThemeType {
  spacing: {
    tiny: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
  fontSizes: {
    small: number;
    medium: number;
    large: number;
  };
  [key: string]: any;
}

// If you're importing from `theme.json` dynamically, declare it once here
export const theme: ThemeType = {
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 18,
  },
  ...require('../../theme.json'),
};

export const colors = {
  // Basic Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Gray Scale
  gray50: '#F7F7F7',
  Gray95: '#f2f2f2',
  gray100: '#D4D4D4',
  gray200: '#D3D3D3',
  gray300: '#F5F5F5',
  gray400: '#666666',
  gray500: '#808080',
  gray600: '#4A4A4A',
  gray700: '#383838',
  gray800: '#292929',
  gray900: '#1F1F1F',
  gray1000: '#57534E',
  gray1100: '#F5F5F4',

  // Primary Colors
  primary: '#000000',
  primaryLight: '#333333',

  // Status Colors
  error: '#FF4D4F',
  success: '#52C41A',
  warning: '#FAAD14',
  info: '#3366FF',

  // Background Colors
  background: '#FFFFFF',
  inputBackground: '#F7F7F7',
  borderColor: '#E4E4E4',

  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textDisabled: '#D3D3D3',
  textLink: '#007AFF',
  subText: '#78716C',

  // Specific UI Colors
  headerBackground: '#FFFFFF',
  divider: '#f0f0f0',
  statusBarStyle: 'default',

  //Common colors
  blackColor: '#000',
  greenColor: '#65A30D',
  ScreenBGColor: '#FAFAF9',
  imageBackground: '#EBEBEB',

  Gray20: '#E7E5E4',
  Gray40: '#A8A29E',
  Gray80: '#292524',
  red: '#C62627',
  redButtonColor: '#DC2626',

  ascent: '#000000', // Default text color
  sortingIcon: '#44403C',
  commonShadowColor: '#1C1917',
  grayBlack: '#00000080',
  yellowColor: '#F59E0B',
  pastelPink: '#FECACA',
  mediumLightRed: '#F87171',
  lightAqua: '#CFFAFE',
  mediumCyan: '#06B6D4',
  lightAmber: '#FEF3C7',
  goldenOrange: '#D97706',
  blushPink: '#FEE2E2',
  lightGray: '#A3A3A3',
  transparentBlack: '#000000b3',
  lavenderMist: '#EDE9F8',
  babyBlue: '#E3EEFA',
  peachPuff: '#F9ECE8',
  honeydew: '#EAF5EF',
  lightButter: '#FEF7E1',
  ivory: '#FFFBEB',
  mintCream: '#F4FDE6',
  grayColor: '#E7E5E4',
  lightBlackColor: '#282524',
  whiteSmoke: '#F8F8F8',
  commentIcon: '#1C274C',
  lightRed: '#FEF2F2',
  lightGreen: '#F0FDF4',
  green: '#16A34A',
};

// Define fonts once (no need for duplicate font declarations)

export const Fonts = {
  thin: Platform.OS === 'ios' ? 'Inter18pt-Thin' : 'Inter_18pt-Thin',
  extra_light: Platform.OS === 'ios' ? 'Inter18pt-ExtraLight' : 'Inter_18pt-ExtraLight',
  light: Platform.OS === 'ios' ? 'Inter18pt-Light' : 'Inter_18pt-Light',
  regular: Platform.OS === 'ios' ? 'Inter18pt-Regular' : 'Inter_18pt-Regular',
  medium: Platform.OS === 'ios' ? 'Inter18pt-Medium' : 'Inter_18pt-Medium',
  semi_bold: Platform.OS === 'ios' ? 'Inter18pt-SemiBold' : 'Inter_18pt-SemiBold',
  bold: Platform.OS === 'ios' ? 'Inter18pt-Bold' : 'Inter_18pt-Bold',
  extra_bold: Platform.OS === 'ios' ? 'Inter18pt-ExtraBold' : 'Inter_18pt-ExtraBold',
  black: Platform.OS === 'ios' ? 'Inter18pt-Black' : 'Inter_18pt-Black',
  extra_large: Platform.OS === 'ios' ? 'Inter24pt-ExtraBold' : 'Inter_24pt-ExtraBold',
};
