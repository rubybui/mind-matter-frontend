import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/context/AuthContext';
import { theme } from './theme';
import ThemedMenuItem from '@/components/themed/ThemedMenuItem';
import { Ionicons } from '@expo/vector-icons';
import { config } from './config';
import ConfirmationModal from './components/modals/ConfirmationModal';
import DeleteAccountModal from './components/modals/DeleteAccountModal';
import { User } from './types/profile';

const ProfileScreen = () => {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        Alert.alert('Error', data?.error || 'Failed to load user data');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowLogoutModal(false);
        logout();
        router.replace('/');
      } else {
        const data = await res.json();
        Alert.alert('Error', data?.error || 'Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/users/me/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowDeleteModal(false);
        logout();
        router.replace('/');
      } else {
        const data = await res.json();
        Alert.alert('Error', data?.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      Alert.alert('Error', 'Failed to delete account');
    }
  };

  const handleConsentToggle = () => {
    if (!user) return;

    if (!user.consent) {
      // If user wants to give consent, navigate to terms and conditions
      router.push('/term');
      return;
    }

    Alert.alert(
      'Update Consent',
      'Are you sure you want to revoke consent? This will limit some features.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Revoke',
          style: 'destructive',
          onPress: async () => {
            try {
              setUser(prev => {
                if (!prev) return null;
                const newConsent = false;
                
                fetch(`${config.apiBaseUrl}/user/consent`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ consent: newConsent }),
                })
                .then(async response => {
                  const data = await response.json();
                  if (!response.ok) {
                    Alert.alert('Error', data?.error || 'Failed to update consent');
                    setUser(prev => prev ? { ...prev, consent: true } : null);
                  }
                })
                .catch(error => {
                  console.error('Consent update error:', error);
                  Alert.alert('Error', 'Failed to update consent');
                  setUser(prev => prev ? { ...prev, consent: true } : null);
                });

                return { ...prev, consent: newConsent };
              });
            } catch (error) {
              console.error('Consent update error:', error);
              Alert.alert('Error', 'Failed to update consent');
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Failed to load user data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/survey')} style={styles.headerBackArrow}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.full_name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{user.full_name}</Text>
        {user.pronouns && <Text style={styles.pronouns}>{user.pronouns}</Text>}
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
          label={user.consent ? 'Revoke Consent' : 'Give Consent'}
          icon={user.consent ? 'close-circle' : 'checkmark-circle'}
          onPress={handleConsentToggle}
        />
        <ThemedMenuItem
          label="Logout"
          icon="log-out"
          onPress={() => setShowLogoutModal(true)}
        />
        <ThemedMenuItem
          label="Delete Account"
          icon="trash"
          onPress={() => setShowDeleteModal(true)}
          color="error"
        />
      </View>

      <ConfirmationModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogout}
        icon="log-out"
      />

      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ProfileScreen; 