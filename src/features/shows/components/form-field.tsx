import { Text, TextInput, type TextInputProps } from 'react-native';

import { colors } from '@/theme/colors';

import { styles } from './booking-form.styles';

type FormFieldProps = TextInputProps & {
  error?: string;
};

export function FormField({ error, style, ...inputProps }: FormFieldProps) {
  return (
    <>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, error ? styles.inputInvalid : null, style]}
        {...inputProps}
      />
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </>
  );
}
