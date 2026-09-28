import { MAX_TICKETS_PER_BOOKING } from '../types/booking';

export function maxTicketsFor(seatsLeft: number) {
  return Math.min(MAX_TICKETS_PER_BOOKING, seatsLeft);
}

// Keeps the quantity input to digits only and never above `max`.
export function clampQuantityInput(text: string, max: number) {
  const digits = text.replace(/\D/g, '');
  if (digits === '') return '';
  return String(Math.min(Number(digits), max));
}
