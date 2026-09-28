import type { ComponentProps } from 'react';
import { DefaultTheme, type ThemeProvider } from 'expo-router';

import { colors } from './colors';

// expo-router@57.0.4 does not export the Theme type, so derive it from ThemeProvider.
type Theme = ComponentProps<typeof ThemeProvider>['value'];

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    border: colors.border,
    primary: colors.accentStrong,
  },
};
