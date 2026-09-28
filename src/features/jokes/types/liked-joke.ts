import type { Joke } from './joke';

export type LikedJoke = Joke & { likedAt: string };
