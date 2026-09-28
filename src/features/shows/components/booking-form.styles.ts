import { StyleSheet } from 'react-native';

import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  form: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700' },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputInvalid: { borderColor: colors.danger },
  fieldError: { color: colors.danger, fontSize: 13 },
  hint: { color: colors.muted, fontSize: 13 },
  submit: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  submitDisabled: { opacity: 0.5 },
  submitText: { color: colors.accentText, fontSize: 16, fontWeight: '800' },
  error: { color: colors.danger, fontSize: 14, textAlign: 'center' },
  success: { color: colors.success, fontSize: 14, textAlign: 'center' },
});
