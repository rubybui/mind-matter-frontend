import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../theme';
import { EmergencyContact } from '../types/user';

export interface EmergencyContactModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (contact: Omit<EmergencyContact, 'contact_id'>) => Promise<void>;
  initialData: EmergencyContact | null;
  isSubmitting: boolean;
}

export default function EmergencyContactModal({
  visible,
  onClose,
  onSave,
  initialData,
  isSubmitting
}: EmergencyContactModalProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relationship, setRelationship] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.contact_name);
      setPhoneNumber(initialData.phone_number);
      setRelationship(initialData.description);
    } else {
      setName('');
      setPhoneNumber('');
      setRelationship('');
    }
  }, [initialData]);

  const handleSave = async () => {
    if (!name || !phoneNumber || !relationship) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    await onSave({
      contact_name: name,
      phone_number: phoneNumber,
      description: relationship,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {initialData ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor={theme.colors.placeholder}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Relationship</Text>
              <TextInput
                style={styles.input}
                value={relationship}
                onChangeText={setRelationship}
                placeholder="Enter relationship"
                placeholderTextColor={theme.colors.placeholder}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                placeholderTextColor={theme.colors.placeholder}
                keyboardType="phone-pad"
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={isSubmitting || !name || !phoneNumber || !relationship}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colors.surface} />
              ) : (
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    width: '90%',
    maxWidth: 400,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  title: {
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  } as TextStyle,
  form: {
    gap: theme.spacing.md,
  } as ViewStyle,
  inputGroup: {
    gap: theme.spacing.xs,
  } as ViewStyle,
  label: {
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.medium,
    color: theme.colors.text,
  } as TextStyle,
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.font.size.base,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  } as TextStyle,
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  } as ViewStyle,
  button: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  cancelButton: {
    backgroundColor: theme.colors.muted,
  } as ViewStyle,
  saveButton: {
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  buttonText: {
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.semiBold,
  } as TextStyle,
  cancelButtonText: {
    color: theme.colors.text,
  } as TextStyle,
  saveButtonText: {
    color: theme.colors.surface,
  } as TextStyle,
}); 