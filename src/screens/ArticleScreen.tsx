import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNewsStore } from '../store/newsStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type ArticleRouteProp = RouteProp<RootStackParamList, 'Article'>;

export default function ArticleScreen() {
  const { params } = useRoute<ArticleRouteProp>();
  const { articleId, articleUrl } = params;
  const { articles, loading } = useNewsStore();
  const [urlToLoad, setUrlToLoad] = useState<string | null>(articleUrl || null);

  useEffect(() => {
    if (!articleUrl) {
      const article = articles.find((a) => a.id === articleId);
      if (article) {
        setUrlToLoad(article.url);
      }
    }
  }, [articles, articleId, articleUrl]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!urlToLoad) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: urlToLoad }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.fullScreenLoader}>
            <ActivityIndicator size="large" color="#0066cc" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullScreenLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#cc0000',
  },
});
