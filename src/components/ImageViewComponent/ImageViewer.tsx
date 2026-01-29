// LocationList.tsx
import React, { useRef, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { styles } from './ImageViewer.style';
import { CloseIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { colors } from '../../utils/theme';
import { defaultIconSizes } from '../../utils/CommonStyles';

interface ImageViewerProps {
  visible: boolean;
  imageSource: string | number | null; // number for require, string for uri
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ visible, imageSource, onClose }) => {
  const { small } = defaultIconSizes;
  const imageZoomRef = useRef(null);
  const [_isZoomed, setIsZoomed] = useState(false);

  console.log('imageSourceimageSource', imageSource);

  const handleZoom = (zoomType?: string) => {
    setIsZoomed(zoomType === 'ZOOM_IN');
  };

  const handleAnimationEnd = (finished: boolean) => {
    if (finished) {
      setIsZoomed(false);
    }
  };

  // Get URI string from imageSource
  const getImageUri = () => {
    if (typeof imageSource === 'string') {
      return imageSource;
    }
    // For local require() images, we can't use ImageZoom directly
    // You might need to handle this differently based on your use case
    return '';
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
          <CloseIcon width={small} height={small} color={colors.white} />
        </Pressable>

        {imageSource && typeof imageSource === 'string' ? (
          <ImageZoom
            ref={imageZoomRef}
            uri={getImageUri()}
            minScale={1}
            maxScale={5}
            doubleTapScale={3}
            isSingleTapEnabled
            isDoubleTapEnabled
            onInteractionStart={() => {
              console.log('onInteractionStart');
              handleZoom('ZOOM_IN');
            }}
            onInteractionEnd={() => console.log('onInteractionEnd')}
            onPanStart={() => console.log('onPanStart')}
            onPanEnd={() => console.log('onPanEnd')}
            onPinchStart={() => console.log('onPinchStart')}
            onPinchEnd={() => console.log('onPinchEnd')}
            onSingleTap={() => console.log('onSingleTap')}
            onDoubleTap={(zoomType: any) => {
              console.log('onDoubleTap', zoomType);
              handleZoom(zoomType);
            }}
            onProgrammaticZoom={(zoomType: any) => {
              console.log('onZoom', zoomType);
              handleZoom(zoomType);
            }}
            style={styles.image}
            onResetAnimationEnd={(finished: any, values: any) => {
              console.log('onResetAnimationEnd', finished);
              console.log('lastScaleValue:', values?.SCALE.lastValue);
              handleAnimationEnd(finished);
            }}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </Modal>
  );
};

export default ImageViewer;
