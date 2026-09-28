import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 8,
  },
  setup: { color: colors.text, fontSize: 16, fontWeight: '600', lineHeight: 22 },
  punchline: {
    color: colors.accentStrong,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  date: { color: colors.muted, fontSize: 13 },
  unlike: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pressed: { opacity: 0.6 },
  unlikeText: { color: colors.danger, fontWeight: '700' },
});
