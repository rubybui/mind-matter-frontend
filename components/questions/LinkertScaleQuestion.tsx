import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  const progress = questionData.question_id / totalQuestions;

  const handleSelect = (value: number) => {
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
    fontSize: 16,
    color: '#AAA',
  },
  scaleTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default LikertScaleQuestion;
