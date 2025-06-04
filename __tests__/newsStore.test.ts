import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNewsStore } from '../src/store/newsStore';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe('useNewsStore', () => {
  beforeEach(() => {
    useNewsStore.setState({
      articles: [],
      loading: false,
      error: null,
      filters: { coin: '', category: '' },
    });
    jest.clearAllMocks();
  });

  it('should set articles and persist to AsyncStorage', async () => {
    const articles = [{ id: 1, title: 'Test Article' }];
    await useNewsStore.getState().setArticles(articles);
    expect(useNewsStore.getState().articles).toEqual(articles);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('cached_articles', JSON.stringify(articles));
  });

  it('should set loading state', () => {
    useNewsStore.getState().setLoading(true);
    expect(useNewsStore.getState().loading).toBe(true);
  });

  it('should set error state', () => {
    useNewsStore.getState().setError('Error occurred');
    expect(useNewsStore.getState().error).toBe('Error occurred');
  });

  it('should set filters and persist to AsyncStorage', async () => {
    const filters = { coin: 'BTC', category: 'market' };
    await useNewsStore.getState().setFilters(filters);
    expect(useNewsStore.getState().filters).toEqual(filters);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('news_filters', JSON.stringify(filters));
  });

  it('should load filters from AsyncStorage', async () => {
    const filters = { coin: 'ETH', category: 'tech' };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(filters));
    await useNewsStore.getState().loadFiltersFromStorage();
    expect(useNewsStore.getState().filters).toEqual(filters);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('news_filters');
  });

  it('should not change filters if none in AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const initialFilters = useNewsStore.getState().filters;
    await useNewsStore.getState().loadFiltersFromStorage();
    expect(useNewsStore.getState().filters).toEqual(initialFilters);
  });
});
