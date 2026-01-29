// ImageUploaderDesign.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../utils/theme';
import { moderateScale } from '../../utils/Responsive';
import styles from './ImageUploader.style';
import { CloseImageIcon, PlusIcon } from '../../assets/icons/svgIcons/appSVGIcons';
import { defaultIconSizes } from '../../utils/CommonStyles';
import ImageViewer from '../ImageViewComponent/ImageViewer';

interface ImageUploaderDesignProps {
  title: string;
  subtitle: string;
  imageUris: string[];
  error: string | null;
  onUploadPress: () => void;
  onDeletePress: (index: number) => void;
  mainTitle?: string;
}

const ImageUploaderDesign: React.FC<ImageUploaderDesignProps> = ({
  title,
  subtitle,
  imageUris,
  error,
  onUploadPress,
  onDeletePress,
  mainTitle = 'Product image',
}) => {
  const { small, xsmall } = defaultIconSizes;

  // image preview code
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null);

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const handleCloseViewer = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {mainTitle ? <Text style={styles.mainTitle}>{mainTitle}</Text> : null}

      <View style={styles.uploadArea}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={onUploadPress}>
          <View style={styles.uploadButtonContent}>
            <Text style={styles.uploadButtonText}>Browse File</Text>

            <PlusIcon width={small} height={xsmall} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.description,
          imageUris.length < 1 && { marginBottom: moderateScale(32) }, // add marginBottom when no images
        ]}
      >
        Add a good-quality image to help customers recognize the product easily.
      </Text>

      {imageUris.length > 0 && (
        <>
          <Text style={styles.mainTitleUploadImageList}>Uploaded images</Text>
          <View style={styles.imageContainer}>
            {imageUris.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => handleImagePress(uri)}>
                  <Image source={{ uri }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeletePress(index)} style={styles.closeButton}>
                  <CloseImageIcon width={small} height={small} color={colors.gray1000} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => onDeletePress(index)} style={styles.closeButton}>
                  <EditImageIcon width={small} height={small} color={colors.gray1000} />
                </TouchableOpacity> */}
              </View>
            ))}
          </View>
        </>
      )}

      {/* Use global ImageViewer modal */}
      <ImageViewer visible={modalVisible} imageSource={selectedImage} onClose={handleCloseViewer} />
    </ScrollView>
  );
};

export default ImageUploaderDesign;
