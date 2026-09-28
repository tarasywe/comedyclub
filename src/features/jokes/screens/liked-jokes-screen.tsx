import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { AnimatedLegendList } from '@legendapp/list/reanimated';

import { colors } from '@/theme/colors';

import { LikedJokeRow } from '../components/liked-joke-row';
import { useLikedJokes } from '../hooks/use-liked-jokes';
import { styles } from './liked-jokes-screen.styles';

export function LikedJokesScreen() {
  const { likedJokes, unlike } = useLikedJokes();

  return (
    <AnimatedLegendList
      data={likedJokes}
      keyExtractor={(joke) => String(joke.id)}
      renderItem={({ item }) => <LikedJokeRow joke={item} onUnlike={unlike} />}
      estimatedItemSize={140}
      // Remount rows instead of reusing them, so entering/exiting animations play.
      recycleItems={false}
      itemLayoutAnimation={LinearTransition.duration(250)}
      style={styles.list}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        <View style={styles.empty}>
          <MaterialCommunityIcons name="emoticon-lol-outline" size={40} color={colors.muted} />
          <Text style={styles.emptyText}>
            No liked jokes yet.{'\n'}Tap the smiley on a joke to save it.
          </Text>
        </View>
      }
    />
  );
}
