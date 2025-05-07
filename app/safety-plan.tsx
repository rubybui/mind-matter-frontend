import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { theme } from './theme';
import ThemedButton from '@/components/themed/ThemedButton';

// Mock data - replace with real data later
const CRISIS_RESOURCES = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: '24/7 support for people in suicidal crisis or emotional distress',
  },
  {
    name: 'Crisis Text Line',
    text: 'HOME to 741741',
    description: '24/7 text support for any type of crisis',
  },
  {
    name: 'SAMHSA\'s National Helpline',
    phone: '1-800-662-4357',
    description: '24/7 treatment referral and information',
  },
];

const EMERGENCY_CONTACTS = [
  {
    name: 'Dr. Sarah Chen',
    relationship: 'Therapist',
    phone: '(555) 123-4567',
  },
  {
    name: 'Alex Morgan',
    relationship: 'Friend',
    phone: '(555) 987-6543',
  },
];

const SafetyPlanScreen = () => {
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleText = (text: string) => {
    Linking.openURL(`sms:${text}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Safety Plan</Text>
        <Text style={styles.subtitle}>Resources and contacts for when you need support</Text>
      </View>

      {/* Crisis Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crisis Resources</Text>
        {CRISIS_RESOURCES.map((resource, index) => (
          <View key={index} style={styles.resourceItem}>
            <Text style={styles.resourceName}>{resource.name}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            {resource.phone ? (
              <ThemedButton
                title={`Call ${resource.phone}`}
                onPress={() => handleCall(resource.phone)}
                style={styles.actionButton}
              />
            ) : (
              <ThemedButton
                title={`Text ${resource.text}`}
                onPress={() => handleText(resource.text)}
                style={styles.actionButton}
              />
            )}
          </View>
        ))}
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {EMERGENCY_CONTACTS.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelationship}>{contact.relationship}</Text>
            </View>
            <ThemedButton
              title="Call"
              onPress={() => handleCall(contact.phone)}
              style={styles.actionButton}
              variant="secondary"
            />
          </View>
        ))}
      </View>

      {/* Warning Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warning Signs</Text>
        <Text style={styles.warningText}>
          If you notice these signs, reach out for help:
        </Text>
        <View style={styles.warningList}>
          <Text style={styles.warningItem}>• Feeling overwhelmed or hopeless</Text>
          <Text style={styles.warningItem}>• Changes in sleep or eating patterns</Text>
          <Text style={styles.warningItem}>• Withdrawing from friends and activities</Text>
          <Text style={styles.warningItem}>• Increased anxiety or agitation</Text>
          <Text style={styles.warningItem}>• Thoughts of self-harm</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  section: {
    padding: 16,
    backgroundColor: '#FFF',
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  resourceItem: {
    marginBottom: 24,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionButton: {
    minWidth: 120,
  },
  warningText: {
    fontSize: 16,
    marginBottom: 12,
  },
  warningList: {
    marginLeft: 8,
  },
  warningItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
});

export default SafetyPlanScreen; 