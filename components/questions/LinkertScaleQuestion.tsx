import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseQuestionCard from './BaseQuestionCard';
import { theme } from '../../app/theme';

interface LikertScaleQuestionData {
  question_id: number;
  question_text: string;
  question_type: string;
  survey_id: number;
  created_at: string;
}

interface LikertScaleQuestionProps {
  questionData: LikertScaleQuestionData;
  totalQuestions: number;
  selectedValue?: number | null;
  onValueChange?: (questionId: number, value: number) => void;
  scaleRange?: number[]; // Example: [1, 2, 3, 4, 5]
}

const DEFAULT_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

const LikertScaleQuestion: React.FC<LikertScaleQuestionProps> = ({
  questionData,
  totalQuestions,
  selectedValue: initialSelectedValue = null,
  onValueChange,
  scaleRange = [1, 2, 3, 4, 5],
}) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(initialSelectedValue);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(questionData.question_id, value);
    }
  };

  return (
    <BaseQuestionCard
      questionId={questionData.question_id}
      totalQuestions={totalQuestions}
      questionText={questionData.question_text}
    >
      <View style={styles.scaleContainer}>
        {scaleRange.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => handleSelect(value)}
            style={styles.scaleButton}
          >
            <Text
              style={[
                styles.scaleText,
                selectedValue === value && styles.scaleTextSelected,
              ]}
            >
              {value}
            </Text>
            <Text style={styles.labelText}>
              {DEFAULT_LABELS[value] || ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BaseQuestionCard>
  );
};

const styles = StyleSheet.create({
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  scaleButton: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  scaleText: {
    fontSize: theme.font.size.base,
    color: theme.colors.subtext,
  },
  scaleTextSelected: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.font.size.md,
  },
  labelText: {
    fontSize: theme.font.size.xs,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default LikertScaleQuestion;
