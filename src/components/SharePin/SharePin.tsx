import { Share, Platform } from 'react-native';
import { showToast, TOAST_TYPE } from '../../utils/toast';

interface SharePinProps {
  pin: string | null;
  mobile: string | null;
  staffName?: string;
  roleName?: string;
}

/**
 * SharePin - A reusable component to share PIN and mobile number
 * Opens native share dialog on both Android and iOS
 *
 * @param pin - The PIN to share
 * @param mobile - The mobile number to share
 * @param staffName - Optional staff name to include in the message
 * @param roleName - Optional role name to include in the message
 */
export const sharePin = async ({ pin, mobile, staffName, roleName }: SharePinProps): Promise<void> => {
  try {
    // Validate inputs
    if (!pin || !mobile) {
      const errorMessage = !pin && !mobile
        ? 'PIN and mobile number are required'
        : !pin
        ? 'PIN is required'
        : 'Mobile number is required';

      showToast(TOAST_TYPE.ERROR, errorMessage);
      return;
    }

    // Create the message to share with new format
    // Capitalize first letter of role name
    const roleText = roleName
      ? roleName.charAt(0).toUpperCase() + roleName.slice(1).toLowerCase()
      : '';
    const userName = staffName || '';
    const greeting = roleText && userName
      ? `Dear ${roleText} ${userName}, your login PIN has been generated.`
      : userName
      ? `Dear ${userName}, your login PIN has been generated.`
      : 'Your login PIN has been generated.';

    const message = `${greeting}\n\nPIN: ${pin}\nRegistered Mobile: ${mobile}\n\nPlease do not share this PIN, This is an automated message. Do not reply.`;

    // Prepare share content
    const shareContent: { message: string; title?: string } = {
      message,
    };

    // Add title for Android
    if (Platform.OS === 'android') {
      shareContent.title = 'Share Staff PIN';
    }

    // Open share dialog
    const result = await Share.share(shareContent, {
      // Android options
      ...(Platform.OS === 'android' && {
        dialogTitle: 'Share Staff PIN',
      }),
      // iOS options
      ...(Platform.OS === 'ios' && {
        subject: 'Staff PIN Information',
      }),
    });

    // Handle share result
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // User selected an activity type (iOS)
        showToast(TOAST_TYPE.SUCCESS, 'PIN shared successfully');
      } else {
        // Content was shared (Android)
        showToast(TOAST_TYPE.SUCCESS, 'PIN shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      // User dismissed the share dialog (iOS)
      // No need to show error, user just cancelled
    }
  } catch (error: any) {
    console.error('Error sharing PIN:', error);
    const errorMessage = error?.message || 'Failed to share PIN. Please try again.';
    showToast(TOAST_TYPE.ERROR, errorMessage);
  }
};

export default sharePin;
