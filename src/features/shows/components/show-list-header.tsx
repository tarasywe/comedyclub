import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import type { ShowSort } from '../utils/sort-shows';
import { styles } from './show-list.styles';

type ShowListHeaderProps = {
  onlyFavorites: boolean;
  sort: ShowSort;
  onToggleOnlyFavorites: () => void;
  onToggleSort: () => void;
};

export function ShowListHeader({
  onlyFavorites,
  sort,
  onToggleOnlyFavorites,
  onToggleSort,
}: ShowListHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{onlyFavorites ? 'Favorite shows' : 'Upcoming shows'}</Text>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            sort === 'date'
              ? 'Sorted by date. Sort by fewest seats'
              : 'Sorted by fewest seats. Sort by date'
          }
          hitSlop={8}
          onPress={onToggleSort}
          style={({ pressed }) => [styles.filter, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name={sort === 'date' ? 'calendar-month-outline' : 'seat-outline'}
            size={18}
            color={colors.text}
          />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={onlyFavorites ? 'Show all shows' : 'Show only favorite shows'}
          accessibilityState={{ selected: onlyFavorites }}
          hitSlop={8}
          onPress={onToggleOnlyFavorites}
          style={({ pressed }) => [
            styles.filter,
            onlyFavorites && styles.filterActive,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name={onlyFavorites ? 'star' : 'star-outline'}
            size={18}
            color={onlyFavorites ? colors.accentText : colors.muted}
          />
        </Pressable>
      </View>
    </View>
  );
}
