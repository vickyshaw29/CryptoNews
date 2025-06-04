import React from 'react';
import { Modal, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeStore } from '../theme/themeStore';

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export default function SettingsModal({ visible, onClose, isDarkTheme, toggleTheme }: SettingsModalProps) {
  const { theme } = useThemeStore();
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, {backgroundColor:theme.colors.background}]}>
          <Text style={[styles.modalTitle, {color:theme.colors.text}]}>Toggle Theme</Text>
          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, {color:theme.colors.text}]}>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
