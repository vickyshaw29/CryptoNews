import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ArticleScreen from '../screens/ArticleScreen';

const linking = {
  prefixes: ['cryptonews://'],
  config: {
    screens: {
      NewsFeed: 'news',
      Article: 'article/:articleId', // this should match your route param
    },
  },
};


export type RootStackParamList = {
  NewsFeed: undefined;
  Article: { articleId: string; articleUrl: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="NewsFeed">
        <Stack.Screen name="NewsFeed" component={NewsFeedScreen} options={{ title: 'Crypto News' }} />
        <Stack.Screen name="Article" component={ArticleScreen} options={{ title: 'Article' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
