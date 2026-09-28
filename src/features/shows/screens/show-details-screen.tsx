import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { formatShowDate } from '@/utils/format-show-date';

import { BookingForm } from '../components/booking-form';
import { FavoriteShowButton } from '../components/favorite-show-button';
import { TicketCard } from '../components/ticket-card';
import { useShowDetails } from '../hooks/use-show-details';
import { isLowOnSeats, seatsLabel } from '../utils/seats';
import { styles } from './show-details-screen.styles';

export function ShowDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { show, bookings, isLoading, isError } = useShowDetails(id);

  if (isLoading) return <ActivityIndicator style={styles.status} />;
  if (isError || !show) return <Text style={styles.status}>This show could not be found.</Text>;

  return (
    <KeyboardAwareScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      bottomOffset={16}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen
        options={{
          headerRight: () => <FavoriteShowButton showId={show.id} source="show_details" size={26} />,
        }}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{show.headliner}</Text>
        <Text style={styles.meta}>
          {formatShowDate(show.night)} · {show.venue}
        </Text>
        <Text style={[styles.seats, isLowOnSeats(show.seatsLeft) && styles.seatsLow]}>
          {seatsLabel(show.seatsLeft)}
        </Text>
        <Text style={styles.body}>
          Doors open one hour before showtime. Two-drink minimum. No hecklers, we know where you
          sit.
        </Text>

        {bookings.length > 0 ? (
          <>
            <Text style={styles.section}>Your tickets</Text>
            {bookings.map((booking) => (
              <TicketCard key={booking.id} booking={booking} />
            ))}
          </>
        ) : null}
      </View>

      <View style={styles.spacer} />
      <BookingForm showId={show.id} seatsLeft={show.seatsLeft} />
    </KeyboardAwareScrollView>
  );
}
