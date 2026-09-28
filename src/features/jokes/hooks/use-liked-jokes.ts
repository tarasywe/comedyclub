import { trackEvent } from '@/lib/analytics/analytics';

import { useLikedJokesStore } from '../store';
import type { LikedJoke } from '../types/liked-joke';
import { jokeEventProperties } from '../utils/joke-event-properties';

export function useLikedJokes() {
  const likedJokes = useLikedJokesStore((state) => state.likedJokes);
  const unlikeJoke = useLikedJokesStore((state) => state.unlike);

  return {
    likedJokes,
    unlike: (joke: LikedJoke) => {
      unlikeJoke(joke.id);
      trackEvent('joke_unliked', jokeEventProperties(joke, 'liked_jokes'));
    },
  };
}
