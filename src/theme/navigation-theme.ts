import type { ComponentProps } from 'react';
import { DefaultTheme, type ThemeProvider } from 'expo-router';

// expo-router@57.0.4 does not export the Theme type, so derive it from ThemeProvider.
type Theme = ComponentProps<typeof ThemeProvider>['value'];

export const navigationTheme: Theme = DefaultTheme;
