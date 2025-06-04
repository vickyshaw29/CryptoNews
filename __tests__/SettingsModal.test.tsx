import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsModal from '../src/components/SettingsModal';

describe('SettingsModal', () => {
  const onCloseMock = jest.fn();
  const toggleThemeMock = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: onCloseMock,
    isDarkTheme: false,
    toggleTheme: toggleThemeMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText, getByTestId } = render(<SettingsModal {...defaultProps} />);
    expect(getByText('Toggle Theme')).toBeTruthy();
    expect(getByText('Dark Theme')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
    const switchComponent = getByTestId('theme-switch');
    expect(switchComponent.props.value).toBe(false);
  });

  it('calls toggleTheme when switch is toggled', () => {
    const { getByTestId } = render(<SettingsModal {...defaultProps} />);
    const switchComponent = getByTestId('theme-switch');
    fireEvent(switchComponent, 'onValueChange', true);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is pressed', () => {
    const { getByText } = render(<SettingsModal {...defaultProps} />);
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render content when visible is false', () => {
    const { queryByText } = render(<SettingsModal {...defaultProps} visible={false} />);
    expect(queryByText('Toggle Theme')).toBeNull();
  });
});
