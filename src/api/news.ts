import apiClient from './axios';
import { useNewsStore } from '../store/newsStore';

export const fetchNews = async () => {
  const { filters } = useNewsStore.getState();
  const { coin, category } = filters;

  try {
    const response = await apiClient.get('/posts/', {
      params: {
        auth_token: '37d9c4a4eb28087a17a8a9fceba3249e57f616c2',
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
