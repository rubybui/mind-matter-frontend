import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { theme } from './theme';
import ThemedMenuItem from '@/components/themed/ThemedMenuItem';
import { Ionicons } from '@expo/vector-icons';

// Mock data - replace with real data later
const MOCK_USER = {
  name: 'Alex Johnson',
  pronouns: 'they/them',
  streak: 7,
  assessments: [
    { id: 1, date: '2024-03-15', type: 'Weekly Check-in', score: 85 },
    { id: 2, date: '2024-03-08', type: 'Weekly Check-in', score: 78 },
    { id: 3, date: '2024-03-01', type: 'Weekly Check-in', score: 82 },
  ],
  consent: true,
};

const ProfileScreen = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout()
        },
      ]
    );
  };

  const handleLogoutAllDevices = () => {
    Alert.alert(
      'Logout All Devices',
      'This will log you out of all devices. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout All',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout all devices
            logout();
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion
            logout();
          }
        },
      ]
    );
  };

  const handleConsentToggle = () => {
    Alert.alert(
      'Update Consent',
      MOCK_USER.consent 
        ? 'Are you sure you want to revoke consent? This will limit some features.'
        : 'Are you sure you want to give consent? This will enable all features.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: MOCK_USER.consent ? 'Revoke' : 'Give',
          style: MOCK_USER.consent ? 'destructive' : 'default',
          onPress: () => {
            // TODO: Implement consent toggle
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/survey')} style={styles.headerBackArrow}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{MOCK_USER.name}</Text>
        <Text style={styles.pronouns}>{MOCK_USER.pronouns}</Text>
      </View>

      {/* Streak Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Streak</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streakNumber}>{MOCK_USER.streak}</Text>
          <Text style={styles.streakLabel}>days</Text>
        </View>
      </View>

      {/* Assessment History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Assessments</Text>
        {MOCK_USER.assessments.map((assessment) => (
          <View key={assessment.id} style={styles.assessmentItem}>
            <View>
              <Text style={styles.assessmentType}>{assessment.type}</Text>
              <Text style={styles.assessmentDate}>{assessment.date}</Text>
            </View>
            <Text style={styles.assessmentScore}>{assessment.score}%</Text>
          </View>
        ))}
      </View>

      {/* Account Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ThemedMenuItem
          label="Crisis Plan / SOS"
          icon="alert"
          onPress={() => router.push('/safety-plan')}
          showArrow
        />
        <ThemedMenuItem
          label={MOCK_USER.consent ? 'Revoke Consent' : 'Give Consent'}
          icon={MOCK_USER.consent ? 'close-circle' : 'checkmark-circle'}
          onPress={handleConsentToggle}
        />
        <ThemedMenuItem
          label="Logout All Devices"
          icon="lock-closed"
          onPress={handleLogoutAllDevices}
        />
        <ThemedMenuItem
          label="Logout"
          icon="log-out"
          onPress={handleLogout}
        />
        <ThemedMenuItem
          label="Delete Account"
          icon="trash"
          onPress={handleDeleteAccount}
          color="error"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBackArrow: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  pronouns: {
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  streakLabel: {
    fontSize: 18,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  assessmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  assessmentType: {
    fontSize: 16,
    fontWeight: '500',
  },
  assessmentDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  assessmentScore: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  menuButton: {
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 8,
  },
});

export default ProfileScreen; 