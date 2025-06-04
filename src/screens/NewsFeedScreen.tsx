import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useNewsStore} from '../store/newsStore';
import {fetchNews} from '../api/news';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/RootStackParams';
import {checkIsConnected} from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FilterBar} from '../components/FilterBar';
import PushNotification from 'react-native-push-notification';
import { useThemeStore } from '../theme/themeStore';

type NewsFeedNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'NewsFeed'
>;

interface Article {
  id: string;
  title: string;
  published_at: string;
  url: string;
  votes: {
    positive: number;
    negative: number;
  };
  thumbnail?: string;
  source?: string;
  categories?: string[];
  slug?: string;
}

export default function NewsFeed() {
  const { themeName } = useThemeStore();
  const isDark = themeName === 'dark';

  const styles = getStyles(isDark);
  const navigation = useNavigation<NewsFeedNavigationProp>();
  const {articles, loading, error, setArticles, setLoading, setError, filters} =
    useNewsStore();
  const [isOffline, setIsOffline] = useState(false);
  const lastFetchedArticleId = useRef<string | null>(null);

  const triggerNotificationForNewArticle = (article: Article) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'New Article',
      message: article.title,
    });


  };

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    const connected = await checkIsConnected();
    setIsOffline(!connected);

    if (connected) {
      try {
        const news = await fetchNews();
        if (news.length > 0) {
          if (lastFetchedArticleId.current && news[0].id !== lastFetchedArticleId.current) {
            triggerNotificationForNewArticle(news[0]);
          }
          lastFetchedArticleId.current = news[0].id;
        }
        setArticles(news);
        await AsyncStorage.setItem('cached_articles', JSON.stringify(news));
      } catch (e) {
        setError('Failed to fetch news');
      }
    } else {
      try {
        const cached = await AsyncStorage.getItem('cached_articles');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.length > 0) {
            lastFetchedArticleId.current = parsed[0].id;
          }
          setArticles(parsed);
          setError(null);
        } else {
          setError('You are offline and no cached news is available.');
        }
      } catch {
        setError('Offline and failed to load cached news.');
      }
    }

    setLoading(false);
  }, [setArticles, setLoading, setError]);

  useEffect(() => {
    loadNews();
  }, [loadNews, filters]);


  const renderItem = ({item}: {item: Article}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Article', {
          articleId: item.id,
          articleUrl: `https://cryptopanic.com/news/${item.id}/${item.slug}`,
        })
      }>
      {item.thumbnail ? (
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.date}>
          {new Date(item.published_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FilterBar />
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            You are offline - showing cached content
          </Text>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {!loading && articles.length > 0 && (
        <FlatList
          data={articles}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadNews} />
          }
          contentContainerStyle={
            articles.length === 0 ? styles.emptyContainer : styles.listContainer
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No news available.</Text>
          }
        />
      )}

      {!loading && articles.length === 0 && error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6',
    },
    offlineBanner: {
      backgroundColor: '#f87171',
      padding: 8,
      alignItems: 'center',
    },
    offlineText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      marginBottom: 12,
      shadowColor: '#000000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      alignItems: 'stretch',
    },
    thumbnail: {
      width: 100,
      height: '100%',
      resizeMode: 'cover',
    },
    thumbnailPlaceholder: {
      width: 100,
      backgroundColor: isDark ? '#3a3a3a' : '#e5e7eb',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 12,
      color: isDark ? '#a1a1aa' : '#6b7280',
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#f9fafb' : '#1f2937',
      marginBottom: 6,
    },
    date: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    error: {
      color: '#ef4444',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
    emptyContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#9ca3af',
    },
  });
