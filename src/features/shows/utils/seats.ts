export const LOW_SEATS_THRESHOLD = 5;

export function seatsLabel(seatsLeft: number) {
  if (seatsLeft === 0) return 'Sold out';
  return seatsLeft === 1 ? '1 seat left' : `${seatsLeft} seats left`;
}

export function isLowOnSeats(seatsLeft: number) {
  return seatsLeft <= LOW_SEATS_THRESHOLD;
}
