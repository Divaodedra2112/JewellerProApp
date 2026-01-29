import { Linking, Platform, Alert } from 'react-native';

/**
 * Makes a phone call to the specified number
 * @param phoneNumber - Phone number to call (with or without country code)
 */
export const makePhoneCall = (phoneNumber: string) => {
  // Remove any spaces, dashes, or special characters except +
  const cleanedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
  const url = Platform.OS === 'ios' 
    ? `telprompt:${cleanedNumber}` 
    : `tel:${cleanedNumber}`;
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    })
    .catch((err) => {
      console.error('Error making phone call:', err);
      Alert.alert('Error', 'Unable to make phone call');
    });
};

/**
 * Opens the default email client with the specified email address
 * @param emailAddress - Email address to send to
 * @param subject - Optional email subject
 * @param body - Optional email body
 */
export const sendEmail = (emailAddress: string, subject?: string, body?: string) => {
  let url = `mailto:${emailAddress}`;
  const params: string[] = [];
  
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Email is not supported on this device');
      }
    })
    .catch((err) => {
      console.error('Error opening email:', err);
      Alert.alert('Error', 'Unable to open email client');
    });
};

/**
 * Opens the address in a map application
 * @param address - Full address string
 */
export const openMap = (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  
  // Try platform-specific maps first
  const url = Platform.OS === 'ios'
    ? `maps://maps.apple.com/?q=${encodedAddress}`
    : `geo:0,0?q=${encodedAddress}`;
  
  Linking.openURL(url).catch((err) => {
    // Fallback to web maps if native app fails
    console.log('Native map app not available, using web maps');
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(webUrl).catch((error) => {
      console.error('Error opening map:', error);
      Alert.alert('Error', 'Unable to open map');
    });
  });
};

