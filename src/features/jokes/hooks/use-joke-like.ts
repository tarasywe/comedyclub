import { trackEvent } from '@/lib/analytics/analytics';
import type { JokeLikeSource } from '@/lib/analytics/events';

import { useLikedJokesStore } from '../store';
import type { Joke } from '../types/joke';
import { jokeEventProperties } from '../utils/joke-event-properties';

export function useJokeLike(joke: Joke | undefined, source: JokeLikeSource) {
  const isLiked = useLikedJokesStore((state) =>
    joke ? state.likedJokes.some((liked) => liked.id === joke.id) : false,
  );
  const like = useLikedJokesStore((state) => state.like);
  const unlike = useLikedJokesStore((state) => state.unlike);

  return {
    isLiked,
    toggle: () => {
      if (!joke) return;
      if (isLiked) {
        unlike(joke.id);
        trackEvent('joke_unliked', jokeEventProperties(joke, source));
      } else {
        like(joke);
        trackEvent('joke_liked', jokeEventProperties(joke, source));
      }
    },
  };
}
