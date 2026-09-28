import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 4, marginBottom: 8 },
  status: { color: colors.muted, fontSize: 15, paddingVertical: 16 },
});
