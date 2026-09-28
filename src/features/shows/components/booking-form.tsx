import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

import { useBookingForm } from '../hooks/use-booking-form';
import { FormField } from './form-field';
import { styles } from './booking-form.styles';

type BookingFormProps = {
  showId: string;
  seatsLeft: number;
};

export function BookingForm({ showId, seatsLeft }: BookingFormProps) {
  const { values, maxTickets, state, isPending, fieldError, setField, submit } = useBookingForm(
    showId,
    seatsLeft,
  );
  const soldOut = seatsLeft === 0;
  const disabled = isPending || soldOut;

  return (
    <SafeAreaView edges={['bottom']} style={styles.form}>
      <View style={styles.header}>
        <Ionicons name="ticket-outline" size={22} color={colors.accentStrong} />
        <Text style={styles.title}>Book tickets</Text>
      </View>

      <FormField
        placeholder="Full name"
        autoComplete="name"
        textContentType="name"
        value={values.name}
        onChangeText={(text) => setField('name', text)}
        error={fieldError('name')}
      />
      <FormField
        placeholder="Email"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={values.email}
        onChangeText={(text) => setField('email', text)}
        error={fieldError('email')}
      />
      <FormField
        placeholder="Tickets"
        keyboardType="number-pad"
        value={values.quantity}
        onChangeText={(text) => setField('quantity', text)}
        editable={!soldOut}
        maxLength={String(maxTickets).length}
        error={fieldError('quantity')}
      />
      {soldOut ? null : (
        <Text style={styles.hint}>
          Up to {maxTickets} {maxTickets === 1 ? 'ticket' : 'tickets'} per booking
        </Text>
      )}

      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={submit}
        style={[styles.submit, disabled && styles.submitDisabled]}
      >
        {isPending ? (
          <ActivityIndicator color={colors.accentText} />
        ) : (
          <Ionicons name="ticket" size={20} color={colors.accentText} />
        )}
        <Text style={styles.submitText}>{soldOut ? 'Sold out' : 'Book now'}</Text>
      </Pressable>

      {state.status === 'error' ? <Text style={styles.error}>{state.message}</Text> : null}
      {state.status === 'success' ? (
        <Text style={styles.success}>
          You’re on the list — {state.booking.quantity} ticket(s) booked. See you at the show.
        </Text>
      ) : null}
    </SafeAreaView>
  );
}
