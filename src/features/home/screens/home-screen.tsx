import { View } from 'react-native';

import { JokeCard } from '@features/jokes';
import { ShowList } from '@features/shows';

import { styles } from './home-screen.styles';

export function HomeScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.joke}>
        <JokeCard />
      </View>
      <ShowList />
    </View>
  );
}
