import { Pressable, Text, View } from 'react-native';

import { formatShowDate } from '@/utils/format-show-date';

import type { Show } from '../types/show';
import { isLowOnSeats, seatsLabel } from '../utils/seats';
import { styles } from './show-row.styles';

type ShowRowProps = {
  show: Show;
  onPress: (showId: string) => void;
};

export function ShowRow({ show, onPress }: ShowRowProps) {
  return (
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
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}
