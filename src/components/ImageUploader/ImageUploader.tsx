import React, { useState } from 'react';
import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import ImageUploaderDesign from './ImageUploaderDesign';
import { requestCameraPermission, requestStoragePermission, openAppSettings, checkCameraPermissionStatus, checkStoragePermissionStatus } from '../../utils/permissionModule';

interface ImageUploaderProps {
  imageUris: string[]; // Controlled prop
  onImageSelect: (uris: string[]) => void;
  mainTitle: string;
  minImages?: number;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUris,
  onImageSelect,
  mainTitle,
  minImages = 0,
  maxImages = 10,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleImageSelection = async () => {
    Alert.alert(
      'Select Image Source',
      'Choose where to get your image from:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Camera',
          onPress: async () => {
            // Request camera permission before launching camera
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
              // Check if permission is blocked
              const status = await checkCameraPermissionStatus();
              if (status.status === 'blocked') {
                Alert.alert(
                  'Permission Required',
                  'Camera permission is required to take photos. Please enable it in your device settings.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Open Settings',
                      onPress: async () => {
                        await openAppSettings();
                      },
                    },
                  ]
                );
              } else {
                Alert.alert(
                  'Permission Denied',
                  'Camera permission is required to take photos. Please enable it in your device settings.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Open Settings',
                      onPress: async () => {
                        await openAppSettings();
                      },
                    },
                  ]
                );
              }
              return;
            }
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.8,
                includeBase64: false,
                saveToPhotos: true,
              },
              response => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  setError(`Camera Error: ${response.errorMessage}`);
                } else if (response.assets) {
                  const uris = response.assets
                    .map((asset: Asset) => asset.uri)
                    .filter((uri): uri is string => !!uri);

                  if (imageUris.length >= maxImages) {
                    Alert.alert(
                      'Image Limit Reached',
                      `You have already selected ${maxImages} image${
                        maxImages > 1 ? 's' : ''
                      }. Please delete an image before adding a new one.`,
                      [{ text: 'OK' }]
                    );
                    return;
                  }

                  const availableSlots = maxImages - imageUris.length;
                  const limitedUris = uris.slice(0, availableSlots);
                  const updated = [...imageUris, ...limitedUris];

                  onImageSelect(updated);
                  setError(null);
                }
              }
            );
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            // Request storage permission before launching gallery
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
              // Check if permission is blocked
              const status = await checkStoragePermissionStatus();
              if (status.status === 'blocked') {
                Alert.alert(
                  'Permission Required',
                  'Storage permission is required to access your gallery. Please enable it in your device settings.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Open Settings',
                      onPress: async () => {
                        await openAppSettings();
                      },
                    },
                  ]
                );
              } else {
                Alert.alert(
                  'Permission Denied',
                  'Storage permission is required to access your gallery. Please enable it in your device settings.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Open Settings',
                      onPress: async () => {
                        await openAppSettings();
                      },
                    },
                  ]
                );
              }
              return;
            }
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.8,
                includeBase64: false,
                selectionLimit: maxImages > 0 ? maxImages : 0,
              },
              response => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  setError(`Gallery Error: ${response.errorMessage}`);
                } else if (response.assets) {
                  const uris = response.assets
                    .map((asset: Asset) => asset.uri)
                    .filter((uri): uri is string => !!uri);

                  if (imageUris.length >= maxImages) {
                    Alert.alert(
                      'Image Limit Reached',
                      `You have already selected ${maxImages} image${
                        maxImages > 1 ? 's' : ''
                      }. Please delete an image before adding a new one.`,
                      [{ text: 'OK' }]
                    );
                    return;
                  }

                  const availableSlots = maxImages - imageUris.length;
                  const limitedUris = uris.slice(0, availableSlots);
                  const updated = [...imageUris, ...limitedUris];

                  onImageSelect(updated);
                  setError(null);
                }
              }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageDelete = (index: number) => {
    const updatedUris = imageUris.filter((_, idx) => idx !== index);

    // Prevent deletion if it would go below minimum
    if (minImages > 0 && updatedUris.length < minImages) {
      Alert.alert(
        'Minimum Image Required',
        `You must have at least ${minImages} image${
          minImages > 1 ? 's' : ''
        }. Please add another image before deleting this one.`,
        [{ text: 'OK' }]
      );
      return;
    }

    onImageSelect(updatedUris);
  };

  return (
    <ImageUploaderDesign
      mainTitle={mainTitle}
      title="Browse your file to upload!"
      subtitle="Supported Format: JPG, PNG (5mb each)"
      imageUris={imageUris}
      error={error}
      onUploadPress={handleImageSelection}
      onDeletePress={handleImageDelete}
    />
  );
};

export default ImageUploader;
