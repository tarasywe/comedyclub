import { z } from 'zod';

export const MAX_TICKETS_PER_BOOKING = 6;

export const bookingSchema = z.object({
  id: z.string(),
  showId: z.string(),
  name: z.string(),
  email: z.string(),
  quantity: z.number().int().positive(),
  createdAt: z.iso.datetime(),
});

export const bookingListSchema = z.array(bookingSchema);

export type Booking = z.infer<typeof bookingSchema>;

export type BookingRequest = Pick<Booking, 'showId' | 'name' | 'email' | 'quantity'>;
