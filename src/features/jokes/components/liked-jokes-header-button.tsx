import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import { useLikedJokesButton } from '../hooks/use-liked-jokes-button';
import { styles } from './liked-jokes-header-button.styles';

export function LikedJokesHeaderButton() {
  const { count, open } = useLikedJokesButton();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Liked jokes, ${count}`}
      hitSlop={8}
      onPress={open}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View>
        <MaterialCommunityIcons name="emoticon-lol-outline" size={26} color={colors.text} />
        {count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
