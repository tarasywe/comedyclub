import { startTransition, useActionState, useState } from 'react';
import { z } from 'zod';

import { useBookTicketsMutation } from '../api/mutations';
import {
  createBookingFormSchema,
  type BookingFormField,
  type BookingFormInput,
  type BookingFormState,
  type BookingFormValues,
} from '../types/booking-form';
import { clampQuantityInput, maxTicketsFor } from '../utils/ticket-quantity';

const INITIAL_VALUES: BookingFormValues = { name: '', email: '', quantity: '2' };
const INITIAL_STATE: BookingFormState = { status: 'idle' };

function firstErrors(error: z.ZodError<BookingFormInput>) {
  const { fieldErrors } = z.flattenError(error);
  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    quantity: fieldErrors.quantity?.[0],
  };
}

// Booking form built on React 19 useActionState: the action validates with zod,
// then calls the booking mutation. Pending state comes from the action itself.
export function useBookingForm(showId: string, seatsLeft: number) {
  const maxTickets = maxTicketsFor(seatsLeft);
  const [rawValues, setValues] = useState(INITIAL_VALUES);
  // Re-clamped on every render, so the value also shrinks when seats left drops.
  const values = { ...rawValues, quantity: clampQuantityInput(rawValues.quantity, maxTickets) };
  // Fields edited since the last submit hide their (now stale) validation error.
  const [editedFields, setEditedFields] = useState<Partial<Record<BookingFormField, true>>>({});
  const { mutateAsync: bookTickets } = useBookTicketsMutation();

  const [state, submitAction, isPending] = useActionState(
    async (_previous: BookingFormState, input: BookingFormValues): Promise<BookingFormState> => {
      const parsed = createBookingFormSchema(maxTickets).safeParse(input);
      if (!parsed.success) {
        return { status: 'invalid', fieldErrors: firstErrors(parsed.error) };
      }
      try {
        const booking = await bookTickets({ showId, ...parsed.data });
        setValues(INITIAL_VALUES);
        return { status: 'success', booking };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Booking failed. Try again.',
        };
      }
    },
    INITIAL_STATE,
  );

  return {
    values,
    maxTickets,
    state,
    isPending,
    fieldError: (field: BookingFormField) =>
      state.status === 'invalid' && !editedFields[field] ? state.fieldErrors[field] : undefined,
    setField: (field: BookingFormField, value: string) => {
      const next = field === 'quantity' ? clampQuantityInput(value, maxTickets) : value;
      setValues((current) => ({ ...current, [field]: next }));
      setEditedFields((current) => ({ ...current, [field]: true }));
    },
    submit: () => {
      setEditedFields({});
      startTransition(() => submitAction(values));
    },
  };
}
