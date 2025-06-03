import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ARTICLE = 'cached_articles';
const STORAGE_KEY_FILTERS = 'news_filters';

interface NewsState {
  articles: any[];
  loading: boolean;
  error: string | null;
  filters: {
    coin: string;
    category: string;
  };
  setArticles: (articles: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: { coin: string; category: string }) => void;
  loadFiltersFromStorage: () => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  loading: false,
  error: null,
  filters: {
    coin: '',
    category: '',
  },
  setArticles: (articles) => {
    AsyncStorage.setItem(STORAGE_KEY_ARTICLE, JSON.stringify(articles)).catch(console.error);
    set({ articles });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => {
    AsyncStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(filters));
    set({ filters });
  },
  loadFiltersFromStorage: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY_FILTERS);
    if (stored) {
      set({ filters: JSON.parse(stored) });
    }
  },
}));