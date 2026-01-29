import { Dimensions, Platform, StatusBar } from 'react-native';
import { isTablet } from 'react-native-device-info';

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad) {
  isIPhoneX =
    W_HEIGHT === 780 ||
    W_WIDTH === 780 ||
    W_HEIGHT === 812 ||
    W_WIDTH === 812 ||
    W_HEIGHT === 844 ||
    W_WIDTH === 844 ||
    W_HEIGHT === 896 ||
    W_WIDTH === 896 ||
    W_HEIGHT === 926 ||
    W_WIDTH === 926;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthPx = (widthPercent: number) => {
  return (screenWidth * widthPercent) / 100;
};

const heightPx = (heightPercent: number) => {
  return ((screenHeight - getStatusBarHeight()) * heightPercent) / 100;
};

const font = (size: number) => {
  return (screenWidth * size) / 100;
};

const getStatusBarHeight = () => {
  const statusBarHeight: number = Platform.select({
    ios: isIPhoneX ? 78 : 20,
    android: StatusBar.currentHeight || 0,
    default: 0,
  });
  return statusBarHeight;
};

const isIPhoneXSeries = () => {
  if (Platform.OS === 'android') {
    return 0;
  }
  return isIPhoneX ? 34 : 0;
};

const isAndroidNouch = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) > 24 : false;
const [shortDimension, longDimension] =
  W_WIDTH < W_HEIGHT ? [W_WIDTH, W_HEIGHT] : [W_HEIGHT, W_WIDTH];

// guideline size
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const isTab = isTablet();

export {
  font,
  getStatusBarHeight,
  heightPx,
  isAndroidNouch,
  isIPhoneX,
  isIPhoneXSeries,
  isTab,
  moderateScale,
  scale,
  verticalScale,
  widthPx,
};
