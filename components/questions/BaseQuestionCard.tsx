import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { theme } from '../../app/theme';

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
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    margin: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  questionId: {
    fontSize: theme.font.size.sm,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontWeight: '500',
  },
  questionText: {
    fontSize: theme.font.size.base,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontWeight: '600',
  },
});

export default BaseQuestionCard;
