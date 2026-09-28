import type { ReactNode } from 'react';
import { ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { navigationTheme } from '@/theme/navigation-theme';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <KeyboardProvider>
      <ThemeProvider value={navigationTheme}>
        {children}
        <StatusBar style="dark" />
      </ThemeProvider>
    </KeyboardProvider>
  );
}
