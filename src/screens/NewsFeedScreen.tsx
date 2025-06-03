import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import { useNewsStore } from '../store/newsStore';
import { fetchNews } from '../api/news';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/RootStackParams';
import { checkIsConnected } from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { FilterBar } from '../components/FilterBar';
import PushNotification from 'react-native-push-notification';


type NewsFeedNavigationProp = NativeStackNavigationProp<RootStackParams, 'NewsFeed'>;

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
  const navigation = useNavigation<NewsFeedNavigationProp>();
  const { articles, loading, error, setArticles, setLoading, setError, filters } = useNewsStore();
  const [isOffline, setIsOffline] = useState(false);


  const triggerNotification = async() => {
 if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Denied',
        'Please enable notification permissions from settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      console.log('Notification permission denied');
    }
  }
    console.log('triggering push notification');
    PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids); // ['channel_id_1']
    });
    PushNotification.localNotification({
        channelId:'default-channel-id',
        title:'My Notification Title',
        message:'checking local notification',
    });
  };



  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    // const connected = await checkIsConnected();
    const connected = false;
    setIsOffline(!connected);

    if (connected) {
      try {
        const news = await fetchNews();
        setArticles(news);
        await AsyncStorage.setItem('cached_articles', JSON.stringify(news));
      } catch (e) {
        setError('Failed to fetch news');
      }
    } else {
      try {
        const cached = await AsyncStorage.getItem('cached_articles');
        if (cached) {
          setArticles(JSON.parse(cached));
          setError('You are offline. Showing cached news.');
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Article', {
          articleId: item.id,
          articleUrl: `https://cryptopanic.com/news/${item.id}/${item.slug}`,
        })
      }
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.date}>{new Date(item.published_at).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FilterBar />
             <Button title="Trigger Notification" onPress={triggerNotification} />
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You are offline - showing cached content</Text>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadNews} />}
          contentContainerStyle={articles.length === 0 ? styles.emptyContainer : styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No news available.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  thumbnailPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
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
    color: '#9ca3af',
  },
});
