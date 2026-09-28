import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { useAnalyticsStart } from '@/lib/analytics/use-analytics-start';
import '@/lib/query/online-manager';
import { queryClient } from '@/lib/query/query-client';
import { useAppStateFocus } from '@/lib/query/use-app-state-focus';
import { navigationTheme } from '@/theme/navigation-theme';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  useAppStateFocus();
  useAnalyticsStart();

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider value={navigationTheme}>
          {children}
          <StatusBar style="dark" />
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
