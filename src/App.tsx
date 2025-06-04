import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { useThemeStore } from './theme/themeStore';

export default function App() {
  const {theme, themeName, initTheme} = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <>
      <StatusBar
        barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </>
  );
}
