import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useThemeStore } from '../theme/themeStore';
import { styles } from './FilterDropdown.styles';

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
        <Pressable testID="backdrop"  style={styles.backdrop} onPress={hideModal}>
          <Animated.View
            testID="modalContent"
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
              data={options}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
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
                        {color:!isSelected ? theme.colors.text : 'black'},
                      ]}
                    >
                      {item ? item.toUpperCase() : 'ALL'}
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
