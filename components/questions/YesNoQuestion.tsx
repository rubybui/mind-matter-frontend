import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseQuestionCard from './BaseQuestionCard';

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
  },
  optionButton: {
    padding: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#AAA',
  },
  optionTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default YesNoQuestion;
