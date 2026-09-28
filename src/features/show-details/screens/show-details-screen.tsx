import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export function ShowDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View>
      <Text>Show details: {id}</Text>
      <Button title="Go back" onPress={() => router.back()} />
    </View>
  );
}
