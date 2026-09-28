// Fake backend: imitates a server API. Shows come from seed data, bookings are
// persisted in MMKV so they survive app restarts. Swap for HTTP calls later.
import { SHOWS_SEED } from '../data/shows.mock';
import type { Booking, BookingRequest } from '../types/booking';
import { readBookings, writeBookings } from './bookings-storage';

const LATENCY_MS = 400;

const delay = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

function bookedSeats(showId: string, bookings: Booking[]) {
  return bookings
    .filter((booking) => booking.showId === showId)
    .reduce((sum, booking) => sum + booking.quantity, 0);
}

function toShowResponse(seed: (typeof SHOWS_SEED)[number], bookings: Booking[]) {
  const { capacity, ...show } = seed;
  return { ...show, seatsLeft: Math.max(0, capacity - bookedSeats(seed.id, bookings)) };
}

export async function getShows(): Promise<unknown> {
  await delay();
  const bookings = readBookings();
  return SHOWS_SEED.map((seed) => toShowResponse(seed, bookings));
}

export async function getShow(showId: string): Promise<unknown> {
  await delay();
  const seed = SHOWS_SEED.find((show) => show.id === showId);
  if (!seed) throw new Error('Show not found');
  return toShowResponse(seed, readBookings());
}

export async function getBookings(showId: string): Promise<unknown> {
  await delay();
  return readBookings().filter((booking) => booking.showId === showId);
}

export async function postBooking(request: BookingRequest): Promise<unknown> {
  await delay();
  const seed = SHOWS_SEED.find((show) => show.id === request.showId);
  if (!seed) throw new Error('Show not found');

  const bookings = readBookings();
  const seatsLeft = seed.capacity - bookedSeats(seed.id, bookings);
  if (request.quantity > seatsLeft) {
    throw new Error(seatsLeft === 0 ? 'This show is sold out' : `Only ${seatsLeft} seats left`);
  }

  const booking: Booking = {
    ...request,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  writeBookings([...bookings, booking]);
  return booking;
}
