import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    // Room for a two-line setup + punchline, so the list below doesn't jump on every new joke.
    minHeight: 210,
    justifyContent: 'center',
  },
  kicker: {
    color: colors.accentStrong,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  setup: { color: colors.text, fontSize: 18, fontWeight: '600', lineHeight: 26 },
  punchline: {
    color: colors.accentStrong,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 8,
  },
  status: { color: colors.muted, fontSize: 16 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  refresh: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  refreshDisabled: { opacity: 0.5 },
  refreshText: { color: colors.accentText, fontWeight: '700' },
});
