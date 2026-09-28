import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useJokeCard } from '../hooks/use-joke-card';
import { styles } from './joke-card.styles';

export function JokeCard() {
  const { joke, animatedStyle, isLoading, isError, isRefreshing, refresh } = useJokeCard();

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>JOKE OF THE MOMENT</Text>
      {isLoading ? <Text style={styles.status}>Warming up the mic…</Text> : null}
      {isError ? <Text style={styles.status}>The comic missed their cue. Try again.</Text> : null}
      {joke ? (
        <Animated.View style={animatedStyle}>
          <Text style={styles.setup}>{joke.setup}</Text>
          <Text style={styles.punchline}>{joke.punchline}</Text>
        </Animated.View>
      ) : null}
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          disabled={isRefreshing}
          onPress={refresh}
          style={[styles.refresh, isRefreshing && styles.refreshDisabled]}
        >
          <Text style={styles.refreshText}>New joke</Text>
        </Pressable>
      </View>
    </View>
  );
}
