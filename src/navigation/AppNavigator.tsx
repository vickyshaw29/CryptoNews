import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SettingsModal from '../components/SettingsModal';
import { useThemeStore } from '../theme/themeStore';

const linking = {
  prefixes: ['cryptonews://'],
  config: {
    screens: {
      NewsFeed: 'news',
      Article: 'article/:articleId',
    },
  },
};

export type RootStackParamList = {
  NewsFeed: undefined;
  Article: { articleId: string; articleUrl: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { themeName, toggleTheme, initTheme } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const headerRight = () => (
    <TouchableOpacity style={styles.headerButton} onPress={() => setModalVisible(true)}>
      <Text style={[styles.headerButtonText, themeName === 'dark' ? styles.darkText : styles.lightText]}>
        Settings
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <NavigationContainer linking={linking} theme={themeName === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="NewsFeed" screenOptions={{ headerRight }}>
          <Stack.Screen name="NewsFeed" component={NewsFeedScreen} options={{ title: 'Crypto News' }} />
          <Stack.Screen name="Article" component={ArticleScreen} options={{ title: 'Article' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isDarkTheme={themeName === 'dark'}
        toggleTheme={toggleTheme}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    fontSize: 16,
  },
  darkText: {
    color: 'white',
  },
  lightText: {
    color: 'black',
  },
});
