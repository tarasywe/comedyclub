import { useApiQuery } from '@/lib/query/use-api-query';

import { jokeSchema } from '../types/joke';
import { jokeEndpoints } from './endpoints';
import { jokeKeys } from './query-keys';

export const JOKE_REFRESH_MS = 30_000;

export function useRandomJokeQuery() {
  return useApiQuery({
    queryKey: jokeKeys.random(),
    url: jokeEndpoints.random,
    schema: jokeSchema,
    refetchInterval: JOKE_REFRESH_MS,
    staleTime: JOKE_REFRESH_MS,
  });
}
