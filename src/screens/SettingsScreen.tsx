// src/screens/SettingsScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useThemeStore } from '../theme/themeStore';

export default function SettingsScreen() {
  const {themeName, toggleTheme, theme} = useThemeStore();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TouchableOpacity style={styles.toggle} onPress={toggleTheme}>
        <Text style={{color: theme.colors.text, fontSize: 16}}>
          {themeName === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toggle: {
    padding: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});
