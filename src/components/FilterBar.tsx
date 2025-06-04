import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FilterDropdown } from './FilterDropdown';
import { useNewsStore } from '../store/newsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from '../theme/themeStore';

const COINS = ['btc', 'eth', 'sol', 'xrp', 'doge'];
const CATEGORIES = ['market', 'regulation', 'tech', 'trading'];

export const FilterBar = () => {
  const { filters, setFilters } = useNewsStore();
  const {theme} = useThemeStore();

  const updateFilter = async (key: 'coin' | 'category', value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    await AsyncStorage.setItem('filters', JSON.stringify(updated));
  };

  useEffect(() => {
    const loadFilters = async () => {
      const saved = await AsyncStorage.getItem('filters');
      if (saved) {
        setFilters(JSON.parse(saved));
      }
    };
    loadFilters();
  }, [setFilters]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FilterDropdown
        label="Coin"
        options={['', ...COINS]}
        selected={filters.coin}
        onSelect={(value) => updateFilter('coin', value)}
      />
      <FilterDropdown
        label="Category"
        options={['', ...CATEGORIES]}
        selected={filters.category}
        onSelect={(value) => updateFilter('category', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
