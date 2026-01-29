import React, { useState } from 'react';
import { ImageProps, ImageStyle, ViewStyle, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { DemoIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { moderateScale } from '../../utils/Responsive';
import { colors } from '../../utils/theme';
import { defaultImageSize } from '../../utils/CommonStyles';
import { NAVI_CONST } from '../../utils/Const';

interface AppImageProps extends ImageProps {
  image: number | string;
  onPressImage?: () => void;
  mainStyle?: ViewStyle | ViewStyle[];
  isDisabled?: boolean;
  imageStyle?: ImageStyle | ImageStyle[];
  from: string;
}

const AppImage = ({
  from,
  image,
  mainStyle,
  onPressImage,
  isDisabled = false,
  imageStyle = {},
  resizeMode = 'contain',
  ...props
}: AppImageProps) => {
  const [hasError, setHasError] = useState(false);

  // Valid image check (null, empty, or invalid local paths show DemoIcon)
  const isValidImage =
    image !== null &&
    image !== undefined &&
    !(typeof image === 'string' && (image.trim() === '' || image.startsWith('file://')));

  const handleImageError = () => {
    setHasError(true);
  };

  // Handle mention case with specific dimensions
  const getImageStyle = () => {
    if (from === 'mention') {
      return [
        styles.image,
        {
          width: moderateScale(40),
          height: moderateScale(40),
          borderRadius: moderateScale(999),
        },
        imageStyle,
      ];
    }
    return [styles.image, imageStyle];
  };

  return (
    <TouchableOpacity
      style={[styles.imageView, mainStyle]}
      onPress={onPressImage}
      disabled={isDisabled}
    >
      {isValidImage && !hasError ? (
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          resizeMode={resizeMode}
          style={getImageStyle()}
          onError={handleImageError}
          {...props}
        />
      ) : (
        <DemoIcon
          width={moderateScale(
            from === NAVI_CONST.DETAILS_SCREEN
              ? defaultImageSize.xlllarge
              : from === NAVI_CONST.COMPETITOR_ANALYSIS_LIST_SCREEN
              ? defaultImageSize.mediumFourtySeven
              : from === NAVI_CONST.DAILY_VISIT_LIST_SCREEN
              ? defaultImageSize.medium
              : from === 'mention'
              ? defaultImageSize.smallTwentyEight
              : from === NAVI_CONST.SMALL_LIST_SCREEN
              ? defaultImageSize.small
              : from === NAVI_CONST.SMALL_DETAILS_SCREEN
              ? defaultImageSize.smallThirtySix
              : defaultImageSize.large
          )}
          height={moderateScale(
            from === NAVI_CONST.DETAILS_SCREEN
              ? defaultImageSize.xlllarge
              : from === NAVI_CONST.COMPETITOR_ANALYSIS_LIST_SCREEN
              ? defaultImageSize.mediumFourtySeven
              : from === NAVI_CONST.DAILY_VISIT_LIST_SCREEN
              ? defaultImageSize.medium
              : from === 'mention'
              ? defaultImageSize.smallTwentyEight
              : from === NAVI_CONST.SMALL_LIST_SCREEN
              ? defaultImageSize.small
              : from === NAVI_CONST.SMALL_DETAILS_SCREEN
              ? defaultImageSize.smallThirtySix
              : defaultImageSize.large
          )}
          color={colors.black}
        />
      )}
    </TouchableOpacity>
  );
};

export default AppImage;
