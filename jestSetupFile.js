/* global jest */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
    Swipeable: jest.fn().mockImplementation(({ children }) => children),
    DrawerLayout: jest.fn().mockImplementation(({ children }) => children),
    State: {},
    Directions: {},
    enableScreens: jest.fn(),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(() => Promise.resolve(null)),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve(null)),
    clear: jest.fn(() => Promise.resolve(null)),
    getAllKeys: jest.fn(() => Promise.resolve([])),
  };
});

jest.mock('@react-native-community/netinfo', () => {
  return {
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
    addEventListener: jest.fn(() => jest.fn()),
  };
});

// Mock react-native-push-notification to avoid native module errors
jest.mock('react-native-push-notification', () => {
  return {
    configure: jest.fn(),
    localNotification: jest.fn(),
    requestPermissions: jest.fn(),
  };
});

// Mock NativeModules and NativeEventEmitter for push-notification-ios
import { NativeModules } from 'react-native';

NativeModules.RNCPushNotificationIOS = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  return function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      emit: jest.fn(),
    };
  };
});

jest.mock('react-native-webview', () => {
  const React = require('react');
  const WebView = (props) => React.createElement('WebView', props, props.children);
  return { WebView };
});
