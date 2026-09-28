import { trackEvent } from '@/lib/analytics/analytics';
import type { ShowFavoriteSource } from '@/lib/analytics/events';

import { useFavoriteShowsStore } from '../store';

export function useFavoriteShow(showId: string, source: ShowFavoriteSource) {
  const isFavorite = useFavoriteShowsStore((state) => state.favoriteShowIds.includes(showId));
  const toggleFavorite = useFavoriteShowsStore((state) => state.toggle);

  return {
    isFavorite,
    toggle: () => {
      toggleFavorite(showId);
      trackEvent(isFavorite ? 'show_unfavorited' : 'show_favorited', { show_id: showId, source });
    },
  };
}
