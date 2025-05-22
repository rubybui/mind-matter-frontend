import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SurveyList from '@/components/surverys/SurveyList';
import { useAuth } from '@/app/context/AuthContext';
import { theme } from './theme';
import { config } from '@/app/config';
import { useRouter } from 'expo-router';

const PAGE_SIZE = 3;

const SurveyListScreen = () => {
  const { token, isHydrated } = useAuth();
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated || !token) return;

    const fetchSurveys = async () => {
      try {
        const res = await fetch(`${config.apiBaseUrl}/surveys`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setSurveys(data);
        } else {
          Alert.alert('Error', data?.error || 'Failed to load surveys');
        }
      } catch (error) {
        console.error('Survey fetch failed:', error);
        Alert.alert('Error', 'Unexpected error while fetching surveys.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [token]);

  const handleSelectSurvey = async (surveyId: number) => {
    try {
      // First create a response
      const responseRes = await fetch(`${config.apiBaseUrl}/surveys/${surveyId}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const responseData = await responseRes.json();

      if (!responseRes.ok) {
        throw new Error(responseData.error || 'Failed to create survey response');
      }

      const responseId = responseData.response_id;

      // Then fetch questions
      const res = await fetch(`${config.apiBaseUrl}/surveys/${surveyId}/questions?page=1&page_size=${PAGE_SIZE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.data && Array.isArray(data.data) && data.data.length > 0) {
        router.push({
          pathname: '/surveyquestionscreen',
          params: {
            question: JSON.stringify(data.data),
            totalQuestions: data.pagination.total.toString(),
            responseId: responseId.toString(),
          },
        });
      } else {
        Alert.alert('No Questions', 'This survey has no questions.');
      }
    } catch (error) {
      console.error('Failed to load questions:', error);
      Alert.alert('Error', 'Unable to load survey questions.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Surveys</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-circle-outline" size={32} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {loading && surveys.length > 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <SurveyList surveys={surveys} onSelectSurvey={handleSelectSurvey} />
      )}

      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => router.push('/form')}
      >
        <Ionicons name="document-text-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profileButton: {
    padding: 8,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default SurveyListScreen;
