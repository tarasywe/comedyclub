export const showKeys = {
  all: ['shows'] as const,
  list: () => [...showKeys.all, 'list'] as const,
  detail: (showId: string) => [...showKeys.all, 'detail', showId] as const,
  bookings: (showId: string) => [...showKeys.all, 'bookings', showId] as const,
};
