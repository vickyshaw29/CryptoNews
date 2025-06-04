import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme, ThemeType} from '../theme/themes';
import {Appearance} from 'react-native';

type ThemeName = 'light' | 'dark';

interface ThemeStore {
  themeName: ThemeName;
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  initTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themeName: 'light',
  theme: lightTheme,
  toggleTheme: () => {
    const next = get().themeName === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('user_theme', next);
    set({
      themeName: next,
      theme: next === 'light' ? lightTheme : darkTheme,
    });
  },
  setTheme: (themeName: ThemeName) => {
    AsyncStorage.setItem('user_theme', themeName);
    set({
      themeName,
      theme: themeName === 'light' ? lightTheme : darkTheme,
    });
  },
    initTheme: async () => {
    const stored = await AsyncStorage.getItem('user_theme');
    const systemPref = Appearance.getColorScheme(); // 'light' | 'dark' | null

    const resolved = (stored as ThemeName) ?? (systemPref as ThemeName) ?? 'light';

    set({
        themeName: resolved,
        theme: resolved === 'light' ? lightTheme : darkTheme,
    });
    },
}));
