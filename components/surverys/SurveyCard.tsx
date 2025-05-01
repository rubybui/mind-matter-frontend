import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SurveyCardProps {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  onPress: (surveyId: number) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  id,
  title,
  description,
  createdAt,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <Text style={styles.dateLabel}>
        Created on {new Date(createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default SurveyCard;
