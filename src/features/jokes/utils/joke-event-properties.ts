import type { JokeLikeSource } from '@/lib/analytics/events';

import type { Joke } from '../types/joke';

export function jokeEventProperties(joke: Joke, source: JokeLikeSource) {
  return {
    joke_id: joke.id,
    joke_setup: joke.setup,
    joke_punchline: joke.punchline,
    source,
  };
}
