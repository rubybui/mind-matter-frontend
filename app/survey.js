import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function SurveyQuestion() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Question {id}</Text>
      <Button title="Next" onPress={() => router.push(`/survey/${parseInt(id) + 1}`)} />
    </View>
  );
}