import { z } from 'zod';

// `maxTickets` is min(per-booking limit, seats left), so it changes per show.
export function createBookingFormSchema(maxTickets: number) {
  return z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.email('Enter a valid email'),
    quantity: z.coerce
      .number({ error: 'Enter a number' })
      .int('Enter a whole number')
      .min(1, 'Book at least 1 ticket')
      .max(maxTickets, `No more than ${maxTickets} tickets`),
  });
}

export type BookingFormInput = z.input<ReturnType<typeof createBookingFormSchema>>;

export type BookingFormValues = {
  name: string;
  email: string;
  quantity: string;
};

export type BookingFormField = keyof BookingFormValues;

export type BookingFormState =
  | { status: 'idle' }
  | { status: 'invalid'; fieldErrors: Partial<Record<BookingFormField, string>> }
  | { status: 'error'; message: string }
  | { status: 'success'; booking: { quantity: number } };
