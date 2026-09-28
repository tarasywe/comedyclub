import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics/analytics';

import { useShowBookingsQuery, useShowQuery } from '../api/queries';

export function useShowDetails(showId: string) {
  const showQuery = useShowQuery(showId);
  const bookingsQuery = useShowBookingsQuery(showId);

  useEffect(() => {
    trackEvent('show_viewed', { show_id: showId });
  }, [showId]);

  return {
    show: showQuery.data,
    bookings: bookingsQuery.data ?? [],
    isLoading: showQuery.isPending,
    isError: showQuery.isError,
  };
}
