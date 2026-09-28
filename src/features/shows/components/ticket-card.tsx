import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import type { Booking } from '../types/booking';
import { styles } from './ticket-card.styles';

type TicketCardProps = {
  booking: Booking;
};

export function TicketCard({ booking }: TicketCardProps) {
  return (
    <View style={styles.ticket}>
      <Ionicons name="ticket" size={28} color={colors.accent} />
      <View style={styles.info}>
        <Text style={styles.name}>{booking.name}</Text>
        <Text style={styles.meta}>{booking.email}</Text>
      </View>
      <Text style={styles.quantity}>×{booking.quantity}</Text>
    </View>
  );
}
