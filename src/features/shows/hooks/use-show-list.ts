import { useState } from 'react';
import { useRouter } from 'expo-router';

import { links } from '@/config/links';
import { trackEvent } from '@/lib/analytics/analytics';

import { useShowsQuery } from '../api/queries';
import { useFavoriteShowsStore } from '../store';
import { sortShows, type ShowSort } from '../utils/sort-shows';

export function useShowList() {
  const router = useRouter();
  const { data: allShows = [], isPending, isError, isRefetching, refetch } = useShowsQuery();
  const favoriteShowIds = useFavoriteShowsStore((state) => state.favoriteShowIds);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sort, setSort] = useState<ShowSort>('date');

  const visibleShows = onlyFavorites
    ? allShows.filter((show) => favoriteShowIds.includes(show.id))
    : allShows;
  const shows = sortShows(visibleShows, sort);

  return {
    shows,
    onlyFavorites,
    sort,
    isLoading: isPending,
    isError,
    isRefreshing: isRefetching,
    toggleOnlyFavorites: () => setOnlyFavorites((current) => !current),
    toggleSort: () => {
      const next = sort === 'date' ? 'seats' : 'date';
      setSort(next);
      trackEvent('shows_sorted', { sort_by: next });
    },
    refresh: () => {
      trackEvent('shows_refreshed', { source: 'pull_to_refresh' });
      refetch();
    },
    openShow: (showId: string) => router.push(links.showDetails(showId)),
  };
}
