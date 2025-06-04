import apiClient from './axios';
import { useNewsStore } from '../store/newsStore';
import { CRYPTO_PANIC_API_KEY } from '@env';


export const fetchNews = async () => {
  const { filters } = useNewsStore.getState();
  const { coin, category } = filters;

  console.log({CRYPTO_PANIC_API_KEY})

  try {
    const response = await apiClient.get('/posts/', {
      params: {
        auth_token: CRYPTO_PANIC_API_KEY,
        public: true,
        ...(coin ? { currencies: coin } : {}),
        ...(category ? { filter: category } : {}),
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
