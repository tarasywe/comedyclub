import { useRouter } from 'expo-router';

import { links } from '@/config/links';

import { useLikedJokesStore } from '../store';

export function useLikedJokesButton() {
  const router = useRouter();
  const count = useLikedJokesStore((state) => state.likedJokes.length);

  return { count, open: () => router.push(links.likedJokes) };
}
