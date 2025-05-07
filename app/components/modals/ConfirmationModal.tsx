import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import BaseModal from './BaseModal';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  confirmColor?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  title,
  message,
  confirmText,
  onConfirm,
  icon,
  confirmColor = theme.colors.error,
}) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={title}
      icon={<Ionicons name={icon} size={24} color={confirmColor} />}
    >
      <Text style={styles.modalText}>{message}</Text>
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: confirmColor }]}
          onPress={onConfirm}
        >
          <Text style={[styles.buttonText, styles.confirmButtonText]}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    color: theme.colors.text,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default ConfirmationModal; 