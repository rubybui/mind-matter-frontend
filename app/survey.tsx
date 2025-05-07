import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';

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
      {loading && surveys.length > 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <SurveyList surveys={surveys} onSelectSurvey={handleSelectSurvey} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
});

export default SurveyListScreen;
