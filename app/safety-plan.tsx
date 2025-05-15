import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from './theme';
import EmergencyContactModal from './components/EmergencyContactModal';
import { EmergencyContactsService } from './services/emergencyContacts';
import { EmergencyContact } from './types/user';
import { useAuth } from '@/app/context/AuthContext';

export default function SafetyPlanScreen() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);
  const { token } = useAuth();

  const emergencyContactsService = new EmergencyContactsService(
    () => token,
    () => window.location.href = '/login'
  );

  useEffect(() => {
    loadEmergencyContacts();
  }, []);

  const loadEmergencyContacts = async () => {
    try {
      setIsLoading(true);
      const contacts = await emergencyContactsService.getEmergencyContacts();
      setEmergencyContacts(contacts);
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
      Alert.alert('Error', 'Failed to load emergency contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContact = async (contactData: Omit<EmergencyContact, 'id'>) => {
    try {
      setIsSubmitting(true);
      if (selectedContact) {
        await emergencyContactsService.updateEmergencyContact(selectedContact.contact_id, contactData);
      } else {
        await emergencyContactsService.createEmergencyContact(contactData);
      }
      await loadEmergencyContacts();
      setIsModalVisible(false);
      setSelectedContact(null);
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save emergency contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      setIsSubmitting(true);
      await emergencyContactsService.deleteEmergencyContact(contactId);
      await loadEmergencyContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      Alert.alert('Error', 'Failed to delete emergency contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = async (phoneNumber: string) => {
    try {
      const url = `tel:${phoneNumber}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    } catch (error) {
      console.error('Error making phone call:', error);
      Alert.alert('Error', 'Failed to make phone call');
    }
  };

  const handleText = async (phoneNumber: string) => {
    try {
      const url = `sms:${phoneNumber}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Text messaging is not supported on this device');
      }
    } catch (error) {
      console.error('Error sending text:', error);
      Alert.alert('Error', 'Failed to send text message');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer as ViewStyle}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container as ViewStyle}>
      <View style={styles.header as ViewStyle}>
        <Text style={styles.title}>Safety Plan</Text>
        <Text style={styles.subtitle}>Your emergency contacts and resources</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setSelectedContact(null);
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.addButtonText}>Add Contact</Text>
          </TouchableOpacity>
        </View>

        {emergencyContacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No emergency contacts added yet</Text>
          </View>
        ) : (
          emergencyContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.contact_name}</Text>
                <Text style={styles.contactRelationship}>{contact.description}</Text>
                <Text style={styles.contactPhone}>{contact.phone_number}</Text>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCall(contact.phone_number)}
                >
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.textButton]}
                  onPress={() => handleText(contact.phone_number)}
                >
                  <Text style={styles.actionButtonText}>Text</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditContact(contact)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteContact(contact.contact_id)}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crisis Resources</Text>
        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>National Suicide Prevention Lifeline</Text>
          <Text style={styles.resourceDescription}>
            Available 24/7 for free and confidential support
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={() => handleCall('988')}
          >
            <Text style={styles.actionButtonText}>Call 988</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>Crisis Text Line</Text>
          <Text style={styles.resourceDescription}>
            Text HOME to 741741 to connect with a Crisis Counselor
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.textButton]}
            onPress={() => handleText('741741')}
          >
            <Text style={styles.actionButtonText}>Text HOME to 741741</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EmergencyContactModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedContact(null);
        }}
        onSave={handleSaveContact}
        initialData={selectedContact}
        isSubmitting={isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  title: {
    fontSize: theme.font.size.xl,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.surface,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  subtitle: {
    fontSize: theme.font.size.base,
    color: theme.colors.surface,
    opacity: 0.8,
  } as TextStyle,
  section: {
    padding: theme.spacing.lg,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  } as ViewStyle,
  sectionTitle: {
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
  } as TextStyle,
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  } as ViewStyle,
  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.semiBold,
  } as TextStyle,
  emptyState: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  } as ViewStyle,
  emptyStateText: {
    color: theme.colors.text,
    fontSize: theme.font.size.base,
  } as TextStyle,
  contactCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  } as ViewStyle,
  contactInfo: {
    marginBottom: theme.spacing.md,
  } as ViewStyle,
  contactName: {
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  contactRelationship: {
    fontSize: theme.font.size.sm,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  contactPhone: {
    fontSize: theme.font.size.sm,
    color: theme.colors.text,
  } as TextStyle,
  contactActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  } as ViewStyle,
  actionButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    minWidth: 80,
    alignItems: 'center',
  } as ViewStyle,
  actionButtonText: {
    color: theme.colors.surface,
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.semiBold,
  } as TextStyle,
  callButton: {
    backgroundColor: theme.colors.success,
  } as ViewStyle,
  textButton: {
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  editButton: {
    backgroundColor: theme.colors.subtext,
  } as ViewStyle,
  deleteButton: {
    backgroundColor: theme.colors.error,
  } as ViewStyle,
  resourceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  } as ViewStyle,
  resourceTitle: {
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  resourceDescription: {
    fontSize: theme.font.size.sm,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.md,
  } as TextStyle,
}); 