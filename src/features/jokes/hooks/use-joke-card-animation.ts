import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DURATION_MS = 450;
const OFFSET_Y = 14;

// Fades and slides the joke in every time a new joke id arrives.
export function useJokeCardAnimation(jokeId: number | undefined) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (jokeId === undefined) return;
    progress.set(0);
    progress.set(withTiming(1, { duration: DURATION_MS }));
  }, [jokeId, progress]);

  return useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ translateY: (1 - progress.get()) * OFFSET_Y }],
  }));
}
