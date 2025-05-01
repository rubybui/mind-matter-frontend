import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import SurveyList from '@/components/surverys/SurveyList';
import { useAuth } from '@/app/context/AuthContext'; // ✅

import {config} from "@/app/config"

const SurveyListScreen = () => {
  const { token, isHydrated } = useAuth();
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [token]); // will only trigger after token is set
  

  return (
    <View style={styles.container}>
      {loading && surveys.length > 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <SurveyList surveys={surveys} onSelectSurvey={(surveyId) => console.log(surveyId)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
});

export default SurveyListScreen;
