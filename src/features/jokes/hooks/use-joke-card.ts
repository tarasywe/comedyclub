import { trackEvent } from '@/lib/analytics/analytics';

import { useRandomJokeQuery } from '../api/queries';
import { useJokeCardAnimation } from './use-joke-card-animation';

export function useJokeCard() {
  const { data: joke, isPending, isError, isFetching, refetch } = useRandomJokeQuery();
  const animatedStyle = useJokeCardAnimation(joke?.id);

  return {
    joke,
    animatedStyle,
    isLoading: isPending,
    // Only surface the error when there is no joke to show at all.
    isError: isError && !joke,
    isRefreshing: isFetching,
    refresh: () => {
      trackEvent('joke_refreshed', { source: 'button' });
      refetch();
    },
  };
}
