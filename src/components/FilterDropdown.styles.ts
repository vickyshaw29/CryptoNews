import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
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
