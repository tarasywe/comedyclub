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
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1 },
  headliner: { color: colors.text, fontSize: 17, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 13, marginTop: 2 },
  seats: { color: colors.success, fontSize: 13, fontWeight: '600', marginTop: 4 },
  seatsLow: { color: colors.danger },
  chevron: { color: colors.muted, fontSize: 22, marginLeft: 8 },
});
