import { fetchNews } from '../src/api/news';
import apiClient from '../src/api/axios';
import { useNewsStore } from '../src/store/newsStore';

jest.mock('../src/api/axios');
jest.mock('../src/store/newsStore', () => ({
  useNewsStore: {
    getState: jest.fn(),
  },
}));

describe('fetchNews', () => {
  const mockData = [{ id: 1, title: 'Mocked News' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch news with coin and category filters', async () => {
    (useNewsStore.getState as jest.Mock).mockReturnValue({
      filters: { coin: 'BTC', category: 'trending' },
    });

    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { results: mockData },
    });

    const result = await fetchNews();

    expect(apiClient.get).toHaveBeenCalledWith('/posts/', {
      params: {
        auth_token: '37d9c4a4eb28087a17a8a9fceba3249e57f616c2',
        public: true,
        currencies: 'BTC',
        filter: 'trending',
      },
    });

    expect(result).toEqual(mockData);
  });

  it('should fetch news without optional filters', async () => {
    (useNewsStore.getState as jest.Mock).mockReturnValue({
      filters: { coin: '', category: '' },
    });

    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { results: mockData },
    });

    const result = await fetchNews();

    expect(apiClient.get).toHaveBeenCalledWith('/posts/', {
      params: {
        auth_token: '37d9c4a4eb28087a17a8a9fceba3249e57f616c2',
        public: true,
      },
    });

    expect(result).toEqual(mockData);
  });

    it('should throw and log error on failure', async () => {
    const error = new Error('API error');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (useNewsStore.getState as jest.Mock).mockReturnValue({
        filters: { coin: '', category: '' },
    });

    (apiClient.get as jest.Mock).mockRejectedValue(error);

    await expect(fetchNews()).rejects.toThrow('API error');
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching news:', error);

    consoleSpy.mockRestore();
    });

});
