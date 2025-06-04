// __tests__/network.test.ts
import { checkIsConnected } from '../src/utils/network';
import NetInfo from '@react-native-community/netinfo';

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

describe('checkIsConnected', () => {
  it('should return true when connected', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: true });
    const result = await checkIsConnected();
    expect(result).toBe(true);
  });

  it('should return false when not connected', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({ isConnected: false });
    const result = await checkIsConnected();
    expect(result).toBe(false);
  });

  it('should return false when isConnected is undefined', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({});
    const result = await checkIsConnected();
    expect(result).toBe(false);
  });
});
