import { Stack } from 'expo-router';

import { AppProviders } from '@/components/shared/app-providers';
import { LikedJokesHeaderButton } from '@features/jokes';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Comedy Club', headerRight: () => <LikedJokesHeaderButton /> }}
        />
        <Stack.Screen name="liked-jokes" options={{ title: 'Liked jokes' }} />
        <Stack.Screen name="show/[id]" options={{ title: 'Show details' }} />
      </Stack>
    </AppProviders>
  );
}
