import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { config } from '@/app/config';
import { useAuth } from '@/app/context/AuthContext';

import LinkertScaleQuestion from '@/components/questions/LinkertScaleQuestion';
import YesNoQuestion from '@/components/questions/YesNoQuestion';

const QUESTIONS_PER_PAGE = 3;
const PAGE_SIZE = 10;

const SurveyQuestionScreen: React.FC = () => {
  const { question, totalQuestions: initialTotal } = useLocalSearchParams();
  const { token } = useAuth();

  const [questions, setQuestions] = useState<any[]>(JSON.parse(question as string));
  const [totalQuestions, setTotalQuestions] = useState(parseInt(initialTotal as string, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | boolean>>([]);

  const surveyId = questions.length > 0 ? questions[0].survey_id : null;

  const fetchMoreQuestions = async () => {
    try {
      const res = await fetch(
        `${config.apiBaseUrl}/surveys/${surveyId}/questions?offset=${questions.length}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setQuestions((prev) => [...prev, ...data]);
        setTotalQuestions((prev) => prev + data.length);
      } else {
        Alert.alert('No more questions');
      }
    } catch (err) {
      console.error('Failed to fetch more questions:', err);
      Alert.alert('Error fetching more questions');
    }
  };

  const handleLikertChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleYesNoChange = (questionId: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const currentQuestions = questions.slice(currentIndex, currentIndex + QUESTIONS_PER_PAGE);

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
    const nextIndex = currentIndex + QUESTIONS_PER_PAGE;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      await fetchMoreQuestions();
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - QUESTIONS_PER_PAGE;
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
          title={currentIndex + QUESTIONS_PER_PAGE < totalQuestions ? 'Next' : 'Finish'}
          onPress={handleNext}
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
