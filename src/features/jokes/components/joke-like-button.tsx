import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import type { JokeLikeSource } from '@/lib/analytics/events';
import { colors } from '@/theme/colors';

import { useJokeLike } from '../hooks/use-joke-like';
import type { Joke } from '../types/joke';
import { styles } from './joke-like-button.styles';

type JokeLikeButtonProps = {
  joke: Joke | undefined;
  source: JokeLikeSource;
};

export function JokeLikeButton({ joke, source }: JokeLikeButtonProps) {
  const { isLiked, toggle } = useJokeLike(joke, source);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isLiked ? 'Unlike joke' : 'Like joke'}
      accessibilityState={{ selected: isLiked }}
      disabled={!joke}
      hitSlop={8}
      onPress={toggle}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons
        name={isLiked ? 'emoticon-lol' : 'emoticon-lol-outline'}
        size={30}
        color={isLiked ? colors.accent : colors.muted}
      />
    </Pressable>
  );
}
