import { useRouter } from 'expo-router';

import { links } from '@/config/links';

import { useShowsQuery } from '../api/queries';

export function useShowList() {
  const router = useRouter();
  const { data: shows = [], isPending, isError, isRefetching, refetch } = useShowsQuery();

  return {
    shows,
    isLoading: isPending,
    isError,
    isRefreshing: isRefetching,
    refresh: () => refetch(),
    openShow: (showId: string) => router.push(links.showDetails(showId)),
  };
}
