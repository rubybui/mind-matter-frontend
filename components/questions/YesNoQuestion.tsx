import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseQuestionCard from './BaseQuestionCard';
import { theme } from '../../app/theme';

interface YesNoQuestionData {
  question_id: number;
  question_text: string;
  question_type: string;
  survey_id: number;
  created_at: string;
}

interface YesNoQuestionProps {
  questionData: YesNoQuestionData;
  totalQuestions: number;
  selectedValue?: boolean | null;
  onValueChange?: (questionId: number, value: boolean) => void;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({
  questionData,
  totalQuestions,
  selectedValue: initialSelectedValue = null,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<boolean | null>(initialSelectedValue);

  const handleSelect = (value: boolean) => {
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
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelect(true)}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === true && styles.optionTextSelected,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleSelect(false)}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === false && styles.optionTextSelected,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </BaseQuestionCard>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
  },
  optionButton: {
    padding: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  optionText: {
    fontSize: theme.font.size.base,
    color: theme.colors.subtext,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.font.size.md,
  },
});

export default YesNoQuestion;
