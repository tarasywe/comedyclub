import { Stack } from 'expo-router';

import { AppProviders } from '@/components/shared/app-providers';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Comedy Club' }} />
        <Stack.Screen name="show/[id]" options={{ title: 'Show details' }} />
      </Stack>
    </AppProviders>
  );
}
