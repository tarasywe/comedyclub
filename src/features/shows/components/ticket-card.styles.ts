import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  ticket: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.accent,
    padding: 12,
    marginTop: 8,
  },
  info: { flex: 1 },
  name: { color: colors.text, fontSize: 15, fontWeight: '600' },
  meta: { color: colors.muted, fontSize: 13, marginTop: 2 },
  quantity: { color: colors.accentStrong, fontSize: 18, fontWeight: '800' },
});
