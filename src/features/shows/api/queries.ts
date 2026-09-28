import { useQuery } from '@tanstack/react-query';

import { getBookings, getShow, getShows } from '../server/shows-server';
import { bookingListSchema } from '../types/booking';
import { showListSchema, showSchema } from '../types/show';
import { showKeys } from './query-keys';

export function useShowsQuery() {
  return useQuery({
    queryKey: showKeys.list(),
    queryFn: async () => showListSchema.parse(await getShows()),
  });
}

export function useShowQuery(showId: string) {
  return useQuery({
    queryKey: showKeys.detail(showId),
    queryFn: async () => showSchema.parse(await getShow(showId)),
  });
}

export function useShowBookingsQuery(showId: string) {
  return useQuery({
    queryKey: showKeys.bookings(showId),
    queryFn: async () => bookingListSchema.parse(await getBookings(showId)),
  });
}
