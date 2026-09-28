import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBooking } from '../server/shows-server';
import { bookingSchema, type BookingRequest } from '../types/booking';
import { showKeys } from './query-keys';

export function useBookTicketsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: BookingRequest) => bookingSchema.parse(await postBooking(request)),
    // Seats left and the booking list both change after a booking.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: showKeys.all }),
  });
}
