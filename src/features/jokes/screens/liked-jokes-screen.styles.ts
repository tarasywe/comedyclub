import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  empty: { alignItems: 'center', gap: 8, paddingTop: 48 },
  emptyText: { color: colors.muted, fontSize: 16, textAlign: 'center' },
});
