import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import BaseModal from './BaseModal';

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleClose = () => {
    setDeleteConfirmation('');
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      title="Delete Account"
      icon={<Ionicons name="trash" size={24} color={theme.colors.error} />}
    >
      <Text style={styles.modalText}>
        This action cannot be undone. To confirm, please type "delete me" below:
      </Text>
      <TextInput
        style={styles.confirmationInput}
        value={deleteConfirmation}
        onChangeText={setDeleteConfirmation}
        placeholder="Type 'delete me' to confirm"
        placeholderTextColor="#999"
      />
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={handleClose}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalButton,
            deleteConfirmation === 'delete me' ? styles.deleteButton : styles.disabledDeleteButton
          ]}
          disabled={deleteConfirmation !== 'delete me'}
          onPress={onConfirm}
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
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
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  disabledDeleteButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  deleteButtonText: {
    color: 'white',
  },
  confirmationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
  },
});

export default DeleteAccountModal; 