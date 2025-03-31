import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CrossPlatformUtils from '../src/utils/CrossPlatformUtils';
import { Platform } from 'react-native';

// Mock the Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(obj => obj.android)
}));

// Mock the dependencies
jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn()
}));

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn()
}));

// Mock AndroidUtils
jest.mock('../src/utils/AndroidSpecificUtils', () => ({
  AndroidUtils: {
    showToast: jest.fn(),
    vibrate: jest.fn(),
    isAndroid: jest.fn().mockReturnValue(true),
    getAndroidVersion: jest.fn().mockReturnValue(33)
  }
}));

describe('CrossPlatformUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store data correctly', async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    AsyncStorage.setItem.mockResolvedValue(null);
    
    const testKey = 'testKey';
    const testValue = { name: 'Test User', email: 'test@example.com' };
    
    const result = await CrossPlatformUtils.storeData(testKey, testValue);
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testValue));
    expect(result).toBe(true);
  });

  it('should retrieve data correctly', async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    const testData = { name: 'Test User', email: 'test@example.com' };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(testData));
    
    const result = await CrossPlatformUtils.getData('testKey');
    
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(result).toEqual(testData);
  });

  it('should show feedback using Android toast', () => {
    const { AndroidUtils } = require('../src/utils/AndroidSpecificUtils');
    
    CrossPlatformUtils.showFeedback('Test Message');
    
    expect(AndroidUtils.showToast).toHaveBeenCalledWith('Test Message', 'SHORT');
    expect(AndroidUtils.vibrate).toHaveBeenCalledWith([0, 50]);
  });

  it('should open URL if supported', async () => {
    const Linking = require('expo-linking');
    Linking.canOpenURL.mockResolvedValue(true);
    Linking.openURL.mockResolvedValue(null);
    
    const testUrl = 'https://example.com';
    const result = await CrossPlatformUtils.openURL(testUrl);
    
    expect(Linking.canOpenURL).toHaveBeenCalledWith(testUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(testUrl);
    expect(result).toBe(true);
  });

  it('should return platform-specific styling', () => {
    const iosStyle = { color: 'blue', borderRadius: 10 };
    const androidStyle = { color: 'green', borderRadius: 4 };
    
    const result = CrossPlatformUtils.getPlatformStyle(iosStyle, androidStyle);
    
    // Since we mocked Platform.OS as 'android'
    expect(result).toEqual(androidStyle);
  });

  it('should return device info with correct platform', () => {
    const deviceInfo = CrossPlatformUtils.getDeviceInfo();
    
    expect(deviceInfo.platform).toBe('android');
  });
});
