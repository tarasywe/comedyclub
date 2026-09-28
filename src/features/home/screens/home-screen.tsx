import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { links } from '@/config/links';

export function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <Link href={links.showDetails('1')}>Open show details</Link>
    </View>
  );
}
