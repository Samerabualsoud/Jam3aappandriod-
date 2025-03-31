import { Platform, ToastAndroid, Vibration } from 'react-native';

/**
 * Android-specific utilities for enhancing the user experience
 */
export const AndroidUtils = {
  /**
   * Show a toast message (Android only)
   * @param message Message to display
   * @param duration Duration of toast (short or long)
   */
  showToast: (message: string, duration: 'SHORT' | 'LONG' = 'SHORT') => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        message, 
        duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG
      );
    }
  },

  /**
   * Vibrate the device with a pattern (Android has more vibration control)
   * @param pattern Vibration pattern in milliseconds
   */
  vibrate: (pattern: number[] = [0, 50]) => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(pattern);
    }
  },

  /**
   * Check if running on Android
   */
  isAndroid: () => {
    return Platform.OS === 'android';
  },

  /**
   * Get Android API level
   */
  getAndroidVersion: () => {
    if (Platform.OS === 'android') {
      return Platform.Version;
    }
    return null;
  }
};

export default AndroidUtils;
