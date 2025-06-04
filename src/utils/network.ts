import NetInfo from '@react-native-community/netinfo';

export const checkIsConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};
