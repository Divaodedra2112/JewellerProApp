import api from '../services/api';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { API_URL, API_VERSION } from '../config/constants';

// Normalizes various possible backend responses into a consistent shape
// Expected return: { uri: string; fileName: string }
export async function uploadFileToBackend(file: {
  uri: string;
  name: string;
  type: string;
  folder?: string;
}) {
  const formData = new FormData();
  let uri = file.uri;
  // Accept both content:// and file:// URIs. Only prefix if it's a bare path on Android.
  if (
    Platform.OS === 'android' &&
    uri &&
    !uri.startsWith('file://') &&
    !uri.startsWith('content://')
  ) {
    uri = `file://${uri}`;
  }
  formData.append('file', {
    uri,
    name: file.name || 'file',
    type: file.type || 'application/octet-stream',
  } as any);

  // Append folder if provided
  if (file.folder) {
    formData.append('folder', file.folder);
  }

  try {
    const start = Date.now();

    let response: any;
    try {
      // Wrap axios call to catch synchronous RangeError/TypeError that might occur
      response = await api.post('/upload', formData, {
        // Let axios set the proper multipart boundary automatically
        timeout: 300000, // 5 minutes for large video uploads
        transitional: { clarifyTimeoutError: true } as any,
        // onUploadProgress is not supported reliably in RN; using BG progress ramp instead
      });
    } catch (axiosError: any) {
      // Catch RangeError/TypeError that might occur during axios call
      const errorMsg = axiosError?.message || String(axiosError);
      const errorName = axiosError?.name || '';

      // Check for Response construction errors (status 0)
      if (
        errorMsg.includes("Failed to construct 'Response'") ||
        errorMsg.includes('status provided (0)') ||
        errorMsg.includes('status (0)') ||
        errorName === 'RangeError' ||
        errorName === 'TypeError' ||
        (!axiosError?.response &&
          (errorMsg.includes('Network Error') || axiosError?.code === 'ERR_NETWORK'))
      ) {
        // Re-throw as network error to trigger fallback
        const networkError = new Error(
          'Network Error: Unable to connect to server. Please check your internet connection.'
        );
        (networkError as any).isNetworkError = true;
        (networkError as any).code = axiosError?.code;
        throw networkError;
      }
      // Re-throw other errors
      throw axiosError;
    }

    const end = Date.now();

    // Handle response - api.post() should return response.data, but check for full response object too
    const raw = response;

    // Check if we got the full axios response object (has status, headers, etc.)
    let responseData = raw;
    if (raw && typeof raw === 'object' && 'data' in raw && 'status' in raw) {
      // This is the full axios response, extract response.data
      responseData = raw.data;
    }

    // Handle nested data structure: { code: "...", data: { uri: "...", fileName: "..." } }
    let data = null;
    if (responseData && typeof responseData === 'object') {
      // Check if responseData has nested data structure
      if (
        responseData.data &&
        typeof responseData.data === 'object' &&
        (responseData.data.uri || responseData.data.url)
      ) {
        // Structure: { code: "...", data: { uri: "...", fileName: "..." } }
        data = responseData.data;
      }
      // Check if responseData itself has uri
      else if (responseData.uri || responseData.url) {
        // Structure: { uri: "...", fileName: "..." }
        data = responseData;
      }
      // Fallback: try responseData.data even if no uri found
      else if (responseData.data && typeof responseData.data === 'object') {
        data = responseData.data;
      }
      // Last resort: use responseData itself
      else {
        data = responseData;
      }
    }

    // Try to extract a usable URI from common fields
    const fileUri: string =
      data?.uri || data?.url || data?.Location || data?.location || data?.path || data?.fileUrl;
    const fileName: string =
      data?.fileName || data?.filename || data?.name || file.name || fileUri?.split('/')?.pop();

    if (!fileUri) {
      throw new Error('Upload failed: invalid upload response');
    }

    const normalized = { uri: fileUri, fileName: fileName || 'file' };
    return normalized;
  } catch (error: any) {
    const msg = error?.message || String(error);
    const errorName = error?.name || '';

    // Check if it's a Response construction error (status 0) from axios or fetch
    // Convert to network error to trigger fallback
    if (
      msg.includes("Failed to construct 'Response'") ||
      msg.includes('status provided (0)') ||
      msg.includes('status (0)') ||
      errorName === 'RangeError' ||
      errorName === 'TypeError'
    ) {
      const networkError = new Error(
        'Network Error: Unable to connect to server. Please check your internet connection.'
      );
      (networkError as any).isNetworkError = true;
      (networkError as any).code = error?.code;
      // Set error to networkError so fallback logic below will catch it
      error = networkError;
    }

    // Fallback: some Android builds hit axios multipart network errors. Retry with fetch.
    const errorMessage = error?.message || msg;
    if (
      errorMessage.includes('Network Error') ||
      msg.includes('timeout') ||
      error?.isNetworkError
    ) {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const deviceId = await DeviceInfo.getUniqueId();

        const absoluteUrl = `${API_URL}/api/${API_VERSION}/upload`;

        // Recreate formData in fallback to ensure it's in scope
        const fallbackFormData = new FormData();
        let fallbackUri = file.uri;
        // Accept both content:// and file:// URIs. Only prefix if it's a bare path on Android.
        if (
          Platform.OS === 'android' &&
          fallbackUri &&
          !fallbackUri.startsWith('file://') &&
          !fallbackUri.startsWith('content://')
        ) {
          fallbackUri = `file://${fallbackUri}`;
        }
        fallbackFormData.append('file', {
          uri: fallbackUri,
          name: file.name || 'file',
          type: file.type || 'application/octet-stream',
        } as any);

        // Append folder if provided
        if (file.folder) {
          fallbackFormData.append('folder', file.folder);
        }

        let fetchResponse: Response;
        try {
          // Wrap fetch in a promise that catches Response construction errors
          fetchResponse = await new Promise<Response>((resolve, reject) => {
            // Use a timeout to detect network issues early
            const timeoutId = setTimeout(() => {
              reject(new Error('Network timeout: Unable to connect to server'));
            }, 30000); // 30 second timeout

            fetch(absoluteUrl, {
              method: 'POST',
              // Let RN set multipart boundary automatically; do NOT set Content-Type here
              headers: {
                ...(token ? { access_token: token } : {}),
                'x-current-device-id': deviceId,
                'x-client-info': JSON.stringify({
                  bundleId: DeviceInfo.getBundleId(),
                  platform: Platform.OS,
                }),
              },
              body: fallbackFormData as any,
            } as any)
              .then(response => {
                clearTimeout(timeoutId);
                resolve(response);
              })
              .catch(err => {
                clearTimeout(timeoutId);
                reject(err);
              });
          });
        } catch (fetchError: any) {
          // Handle network errors from fetch, including Response construction errors
          const errorMsg = fetchError?.message || String(fetchError);
          const errorName = fetchError?.name || '';

          // Check if it's a Response construction error (status 0) or RangeError
          if (
            errorMsg.includes("Failed to construct 'Response'") ||
            errorMsg.includes('status provided (0)') ||
            errorMsg.includes('status (0)') ||
            errorName === 'RangeError' ||
            errorName === 'TypeError'
          ) {
            throw new Error(
              'Network Error: Unable to connect to server. Please check your internet connection.'
            );
          }

          throw new Error(fetchError?.message || 'Network Error: Failed to upload file');
        }

        // Check for network errors (status 0) before accessing response
        if (fetchResponse.status === 0 || !fetchResponse.ok) {
          const statusText =
            fetchResponse.status === 0 ? 'Network Error' : `Server error: ${fetchResponse.status}`;
          const text = await fetchResponse.text().catch(() => 'Unable to read error response');
          throw new Error(`Upload failed: ${statusText}`);
        }

        const text = await fetchResponse.text();
        let json: any = null;
        try {
          json = JSON.parse(text);
        } catch (_) {
          json = { data: { url: text } };
        }

        const raw = json;
        const data = raw?.data ?? raw;
        const fallbackFileUri: string =
          data?.uri || data?.url || data?.Location || data?.location || data?.path || data?.fileUrl;
        const fileName: string =
          data?.fileName ||
          data?.filename ||
          data?.name ||
          file.name ||
          fallbackFileUri?.split('/')?.pop();

        if (!fallbackFileUri) {
          throw new Error('Upload failed: invalid upload response (fallback)');
        }
        const normalized = { uri: fallbackFileUri, fileName: fileName || 'file' };
        return normalized;
      } catch (fallbackErr) {
        throw fallbackErr;
      }
    }

    throw error;
  }
}
