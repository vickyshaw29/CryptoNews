import React from 'react';
import { render, fireEvent, waitFor, within } from '@testing-library/react-native';
import { FilterDropdown } from '../src/components/FilterDropdown';
import * as themeStore from '../src/theme/themeStore';

jest.mock('../src/theme/themeStore');

describe('FilterDropdown', () => {
  const options = ['all', 'btc', 'eth'];
  const label = 'Category';
  const onSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (themeStore.useThemeStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        theme: {
          colors: {
            background: '#fff',
            text: '#000',
          },
        },
      })
    );
  });

  it('renders with label and selected value', () => {
    const { getByText } = render(
      <FilterDropdown label={label} options={options} selected="btc" onSelect={onSelectMock} />
    );

    expect(getByText(label)).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
  });

  it('opens modal on button press and shows options', async () => {
    const { getByText, queryByText, getByTestId } = render(
      <FilterDropdown label={label} options={options} selected="btc" onSelect={onSelectMock} />
    );

    expect(queryByText('ALL')).toBeNull();

    fireEvent.press(getByText(label));

    const modalContent = await waitFor(() => getByTestId('modalContent'));

    expect(within(modalContent).getByText('ALL')).toBeTruthy();
    expect(within(modalContent).getByText('BTC')).toBeTruthy();
    expect(within(modalContent).getByText('ETH')).toBeTruthy();
  });

  it('calls onSelect and closes modal on option press', async () => {
    const { getByText, queryByText, getByTestId } = render(
      <FilterDropdown label={label} options={options} selected="btc" onSelect={onSelectMock} />
    );

    fireEvent.press(getByText(label));

    const modalContent = await waitFor(() => getByTestId('modalContent'));

    fireEvent.press(within(modalContent).getByText('ETH'));

    expect(onSelectMock).toHaveBeenCalledWith('eth');

    await waitFor(() => {
      expect(queryByText('ETH')).toBeNull();
    });
  });

  it('closes modal when backdrop is pressed', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <FilterDropdown label={label} options={options} selected="btc" onSelect={onSelectMock} />
    );

    fireEvent.press(getByText(label));

    await waitFor(() => getByTestId('modalContent'));

    fireEvent.press(getByTestId('backdrop'));

    await waitFor(() => {
      expect(queryByText('ETH')).toBeNull();
    });
  });
});
