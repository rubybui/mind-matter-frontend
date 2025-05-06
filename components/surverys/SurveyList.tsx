import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SurveyCard from './SurveyCard';

interface Survey {
  survey_id: number;
  title: string;
  description?: string;
  created_at: string;
}

interface SurveyListProps {
  surveys: Survey[];
  onSelectSurvey: (surveyId: number) => void;
}

const SurveyList: React.FC<SurveyListProps> = ({ surveys, onSelectSurvey }) => {
  return (
    <FlatList
      data={surveys}
      keyExtractor={(item) => item.survey_id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <SurveyCard
          id={item.survey_id}
          title={item.title}
          description={item.description}
          createdAt={item.created_at}
          onPress={onSelectSurvey}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});

export default SurveyList;
