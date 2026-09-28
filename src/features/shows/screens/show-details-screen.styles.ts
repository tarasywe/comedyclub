import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  details: { padding: 16 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  meta: { color: colors.muted, fontSize: 15, marginTop: 4 },
  seats: { color: colors.success, fontSize: 15, fontWeight: '700', marginTop: 8 },
  seatsLow: { color: colors.danger },
  body: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 16 },
  section: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 24 },
  spacer: { flex: 1, minHeight: 16 },
  status: { color: colors.muted, fontSize: 16, padding: 16 },
});
