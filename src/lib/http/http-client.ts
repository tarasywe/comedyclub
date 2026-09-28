import { create } from 'axios';

export const httpClient = create({
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});
