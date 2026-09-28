import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { formatShowDate } from '@/utils/format-show-date';

import type { Show } from '../types/show';
import { isLowOnSeats, seatsLabel } from '../utils/seats';
import { FavoriteShowButton } from './favorite-show-button';
import { styles } from './show-row.styles';

type ShowRowProps = {
  show: Show;
  onPress: (showId: string) => void;
};

export function ShowRow({ show, onPress }: ShowRowProps) {
  return (
    <Animated.View entering={FadeIn.duration(250)} exiting={FadeOut.duration(200)}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onPress(show.id)}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <View style={styles.info}>
          <Text style={styles.headliner}>{show.headliner}</Text>
          <Text style={styles.meta}>
            {formatShowDate(show.night)} · {show.venue}
          </Text>
          <Text style={[styles.seats, isLowOnSeats(show.seatsLeft) && styles.seatsLow]}>
            {seatsLabel(show.seatsLeft)}
          </Text>
        </View>
        <FavoriteShowButton showId={show.id} source="show_list" />
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Animated.View>
  );
}
