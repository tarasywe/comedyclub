import type { Show } from '../types/show';

export type ShowSort = 'date' | 'seats';

// Returns a new array; ties keep date order so the list stays stable.
export function sortShows(shows: Show[], sort: ShowSort) {
  const byDate = [...shows].sort((a, b) => Date.parse(a.night) - Date.parse(b.night));
  return sort === 'date' ? byDate : byDate.sort((a, b) => a.seatsLeft - b.seatsLeft);
}
