import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNewsStore } from '../store/newsStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type ArticleRouteProp = RouteProp<RootStackParamList, 'Article'>;

export default function ArticleScreen() {
  const { params } = useRoute<ArticleRouteProp>();
  const { articleId, articleUrl } = params;
  const { articles } = useNewsStore();

  const article = articles.find((a) => a.id === articleId);


  if (!article) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: articleUrl }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator style={styles.loader} size="large" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red' },
});
