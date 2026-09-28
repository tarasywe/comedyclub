import type { Href } from 'expo-router';

export const links = {
  home: '/' as const,
  likedJokes: '/liked-jokes' as const,
  showDetails: (id: string): Href => ({ pathname: '/show/[id]', params: { id } }),
};
