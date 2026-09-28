import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage/zustand-storage';

import type { Joke } from './types/joke';
import type { LikedJoke } from './types/liked-joke';

type LikedJokesState = {
  // Newest first.
  likedJokes: LikedJoke[];
  like: (joke: Joke) => void;
  unlike: (jokeId: number) => void;
};

export const useLikedJokesStore = create<LikedJokesState>()(
  persist(
    (set) => ({
      likedJokes: [],
      like: (joke) =>
        set((state) =>
          state.likedJokes.some((liked) => liked.id === joke.id)
            ? state
            : { likedJokes: [{ ...joke, likedAt: new Date().toISOString() }, ...state.likedJokes] },
        ),
      unlike: (jokeId) =>
        set((state) => ({ likedJokes: state.likedJokes.filter((joke) => joke.id !== jokeId) })),
    }),
    {
      name: 'liked-jokes',
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ likedJokes: state.likedJokes }),
    },
  ),
);
