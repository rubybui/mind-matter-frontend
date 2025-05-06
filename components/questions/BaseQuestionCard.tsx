import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

interface BaseQuestionCardProps {
  questionId: number;
  totalQuestions: number;
  questionText: string;
  children: React.ReactNode;
}

const BaseQuestionCard: React.FC<BaseQuestionCardProps> = ({
  questionId,
  totalQuestions,
  questionText,
  children,
}) => {
  const progress = questionId / totalQuestions;

  return (
    <View style={styles.container}>
      <Text style={styles.questionId}>Question {questionId}</Text>
      <ProgressBar progress={progress} />
      <Text style={styles.questionText}>{questionText}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
});

export default BaseQuestionCard;
