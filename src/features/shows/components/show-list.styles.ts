import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 8 },
  filter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  pressed: { opacity: 0.6 },
  status: { color: colors.muted, fontSize: 15, paddingVertical: 16 },
});
