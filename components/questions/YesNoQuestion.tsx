import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  const progress = questionData.question_id / totalQuestions;

  const handleSelect = (value: boolean) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(questionData.question_id, value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionId}>Question {questionData.question_id}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { flex: progress }]} />
        <View style={[styles.progressBarRemaining, { flex: 1 - progress }]} />
      </View>

      <Text style={styles.questionText}>{questionData.question_text}</Text>

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
  progressBarContainer: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    backgroundColor: '#222',
  },
  progressBarRemaining: {
    backgroundColor: '#EEE',
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
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
