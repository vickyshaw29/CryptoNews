import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FilterBar } from '../src/components/FilterBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockSetFilters = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../src/store/newsStore', () => ({
  useNewsStore: () => ({
    filters: { coin: '', category: '' },
    setFilters: mockSetFilters,
  }),
}));

jest.mock('../src/components/FilterDropdown', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    FilterDropdown: ({ label, selected, options, onSelect }: any) => (
      <View>
        <Text>{label}</Text>
        <Text testID={`${label}-selected`}>{selected || 'Select'}</Text>
        {options.map((option: string) => (
          <TouchableOpacity
            key={option}
            testID={`${label}-option-${option}`}
            onPress={() => onSelect(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
  };
});

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both dropdowns', () => {
    const { getByText } = render(<FilterBar />);
    expect(getByText('Coin')).toBeTruthy();
    expect(getByText('Category')).toBeTruthy();
  });

  it('loads filters from AsyncStorage on mount', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ coin: 'btc', category: 'market' })
    );

    render(<FilterBar />);
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('filters');
      expect(mockSetFilters).toHaveBeenCalledWith({ coin: 'btc', category: 'market' });
    });
  });

  it('updates coin filter and stores in AsyncStorage', async () => {
    const { getByTestId } = render(<FilterBar />);
    fireEvent.press(getByTestId('Coin-option-eth'));

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ coin: 'eth', category: '' });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'filters',
        JSON.stringify({ coin: 'eth', category: '' })
      );
    });
  });

  it('updates category filter and stores in AsyncStorage', async () => {
    const { getByTestId } = render(<FilterBar />);
    fireEvent.press(getByTestId('Category-option-market'));

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ coin: '', category: 'market' });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'filters',
        JSON.stringify({ coin: '', category: 'market' })
      );
    });
  });
});
