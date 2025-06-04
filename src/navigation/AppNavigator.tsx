import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SettingsModal from '../components/SettingsModal';
import { useThemeStore } from '../theme/themeStore';
import { GearIcon } from '../components/GearIcon';


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
 <TouchableOpacity
    style={[styles.headerButton]}
    onPress={() => setModalVisible(true)}
    activeOpacity={0.7}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <GearIcon color={themeName === 'dark' ? 'white' : 'black'} size={20} />
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
    marginRight: 5,
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
 darkButton: {
    backgroundColor: '#444',  // Dark gray background on dark mode
  },
  lightButton: {
    backgroundColor: '#eee',  // Light gray background on light mode
  },
});
