import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useThemeStore } from '../theme/themeStore';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const FilterDropdown = ({
  label,
  options,
  selected,
  onSelect,
}: FilterDropdownProps) => {
  const theme = useThemeStore(state => state.theme);
  const [visible, setVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const showModal = () => {
    setVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={[styles.button, {backgroundColor:theme.colors.background}]} onPress={showModal}>
        <Text style={[styles.label, {color:theme.colors.text}]}>{label}</Text>
        <Text style={[styles.value, {color:theme.colors.text}]}>{selected ? selected.toUpperCase() : 'All'}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.backdrop} onPress={hideModal}>
          <Animated.View
            style={[
              styles.modalCard,
              {backgroundColor:theme.colors.background},
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <FlatList
              data={options.filter((opt) => opt.trim() !== '')}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                console.log({item})
                const isSelected = item === selected;
                return (
                  <TouchableOpacity
                    style={[styles.option, isSelected && styles.selectedOption]}
                    onPress={() => {
                      onSelect(item);
                      hideModal();
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                        {color:theme.colors.text},
                      ]}
                    >
                      {item.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: '#f4f4f5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  label: {
    color: '#6b7280',
    fontSize: 14,
  },
  value: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: '#e0f2fe',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
});
