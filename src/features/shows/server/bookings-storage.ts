import { readJson, writeJson } from '@/lib/storage/json-storage';

import { bookingListSchema, type Booking } from '../types/booking';

const BOOKINGS_KEY = 'fake-server.bookings';

export function readBookings(): Booking[] {
  return readJson(BOOKINGS_KEY, bookingListSchema, []);
}

export function writeBookings(bookings: Booking[]) {
  writeJson(BOOKINGS_KEY, bookings);
}
