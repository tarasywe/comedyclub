import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import type { ShowFavoriteSource } from '@/lib/analytics/events';
import { colors } from '@/theme/colors';

import { useFavoriteShow } from '../hooks/use-favorite-show';
import { styles } from './favorite-show-button.styles';

type FavoriteShowButtonProps = {
  showId: string;
  source: ShowFavoriteSource;
  size?: number;
};

export function FavoriteShowButton({ showId, source, size = 24 }: FavoriteShowButtonProps) {
  const { isFavorite, toggle } = useFavoriteShow(showId, source);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityState={{ selected: isFavorite }}
      hitSlop={8}
      onPress={toggle}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={isFavorite ? 'star' : 'star-outline'}
        size={size}
        color={isFavorite ? colors.accent : colors.muted}
      />
    </Pressable>
  );
}
