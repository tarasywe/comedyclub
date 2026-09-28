import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors } from '@/theme/colors';

import type { LikedJoke } from '../types/liked-joke';
import { styles } from './liked-joke-row.styles';

type LikedJokeRowProps = {
  joke: LikedJoke;
  onUnlike: (joke: LikedJoke) => void;
};

const likedAtFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function LikedJokeRow({ joke, onUnlike }: LikedJokeRowProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      exiting={FadeOut.duration(200)}
      style={styles.row}
    >
      <Text style={styles.setup}>{joke.setup}</Text>
      <Text style={styles.punchline}>{joke.punchline}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>Liked {likedAtFormatter.format(new Date(joke.likedAt))}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => onUnlike(joke)}
          style={({ pressed }) => [styles.unlike, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="emoticon-sad-outline" size={18} color={colors.danger} />
          <Text style={styles.unlikeText}>Unlike</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
