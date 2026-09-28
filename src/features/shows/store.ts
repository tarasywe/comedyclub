import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/lib/storage/zustand-storage';

type FavoriteShowsState = {
  favoriteShowIds: string[];
  toggle: (showId: string) => void;
};

export const useFavoriteShowsStore = create<FavoriteShowsState>()(
  persist(
    (set) => ({
      favoriteShowIds: [],
      toggle: (showId) =>
        set((state) => ({
          favoriteShowIds: state.favoriteShowIds.includes(showId)
            ? state.favoriteShowIds.filter((id) => id !== showId)
            : [...state.favoriteShowIds, showId],
        })),
    }),
    {
      name: 'favorite-shows',
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ favoriteShowIds: state.favoriteShowIds }),
    },
  ),
);
