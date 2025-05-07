import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { config } from '@/app/config';
import { useAuth } from '@/app/context/AuthContext';

import LinkertScaleQuestion from '@/components/questions/LinkertScaleQuestion';
import YesNoQuestion from '@/components/questions/YesNoQuestion';

const PAGE_SIZE = 3;

const SurveyQuestionScreen: React.FC = () => {
  const { question, totalQuestions: initialTotal } = useLocalSearchParams();
  const { token } = useAuth();

  const [questions, setQuestions] = useState<any[]>(JSON.parse(question as string));
  const [totalQuestions, setTotalQuestions] = useState(parseInt(initialTotal as string, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | boolean>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const surveyId = questions.length > 0 ? questions[0].survey_id : null;

  const fetchMoreQuestions = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const res = await fetch(
        `${config.apiBaseUrl}/surveys/${surveyId}/questions?page=${nextPage}&page_size=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.data && Array.isArray(data.data)) {
        setQuestions((prev) => [...prev, ...data.data]);
        setCurrentPage(nextPage);
      } else {
        Alert.alert('No more questions');
      }
    } catch (err) {
      console.error('Failed to fetch more questions:', err);
      Alert.alert('Error fetching more questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikertChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleYesNoChange = (questionId: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const currentQuestions = questions.slice(currentIndex, currentIndex + PAGE_SIZE);

  const renderQuestion = (q: any, idx: number) => {
    const key = `${q.question_id}-${idx}`;
    switch (q.question_type.toLowerCase()) {
      case 'likert_scale':
        return (
          <LinkertScaleQuestion
            key={key}
            questionData={q}
            totalQuestions={totalQuestions}
            selectedValue={typeof answers[q.question_id] === 'number' ? (answers[q.question_id] as number) : null}
            onValueChange={handleLikertChange}
            scaleRange={[1, 2, 3, 4, 5]}
          />
        );
      case 'yes_no':
        return (
          <YesNoQuestion
            key={key}
            questionData={q}
            totalQuestions={totalQuestions}
            selectedValue={typeof answers[q.question_id] === 'boolean' ? (answers[q.question_id] as boolean) : null}
            onValueChange={handleYesNoChange}
          />
        );
      default:
        return <Text key={key}>Unsupported question type: {q.question_type}</Text>;
    }
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + PAGE_SIZE;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else if (questions.length < totalQuestions) {
      await fetchMoreQuestions();
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - PAGE_SIZE;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentQuestions.map(renderQuestion)}

      <View style={styles.buttonRow}>
        {currentIndex > 0 && (
          <Button title="Back" onPress={handleBack} />
        )}
        <Button
          title={currentIndex + PAGE_SIZE < totalQuestions ? 'Next' : 'Finish'}
          onPress={handleNext}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SurveyQuestionScreen;
