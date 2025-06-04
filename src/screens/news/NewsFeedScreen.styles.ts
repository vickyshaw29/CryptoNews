import {StyleSheet} from 'react-native';

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6',
    },
    offlineBanner: {
      backgroundColor: '#f87171',
      padding: 8,
      alignItems: 'center',
    },
    offlineText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      marginBottom: 12,
      shadowColor: '#000000',
      shadowOpacity: 0.05,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      alignItems: 'stretch',
    },
    thumbnail: {
      width: 100,
      height: '100%',
      resizeMode: 'cover',
      borderRightWidth: 3,
      borderRightColor: '#007aff', // iOS blue
    },
    placeholder: {
      // width: 100,
      height: '100%',
      backgroundColor: '#e0e0e0',
      borderRightWidth: 3,
      borderRightColor: '#007aff',
    },
    thumbnailPlaceholder: {
      width: 100,
      backgroundColor: isDark ? '#3a3a3a' : '#e5e7eb',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 12,
      color: isDark ? '#a1a1aa' : '#6b7280',
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#f9fafb' : '#1f2937',
      marginBottom: 6,
    },
    date: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    error: {
      color: '#ef4444',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
    emptyContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#9ca3af',
    },
  });
