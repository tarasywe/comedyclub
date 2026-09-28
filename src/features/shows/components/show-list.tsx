import { ActivityIndicator, Text } from 'react-native';
import { LegendList } from '@legendapp/list/react-native';

import { useShowList } from '../hooks/use-show-list';
import { ShowRow } from './show-row';
import { styles } from './show-list.styles';

export function ShowList() {
  const { shows, isLoading, isError, isRefreshing, refresh, openShow } = useShowList();

  return (
    <LegendList
      data={shows}
      keyExtractor={(show) => show.id}
      renderItem={({ item }) => <ShowRow show={item} onPress={openShow} />}
      estimatedItemSize={92}
      recycleItems
      refreshing={isRefreshing}
      onRefresh={refresh}
      style={styles.list}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={<Text style={styles.title}>Upcoming shows</Text>}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.status}>
            {isError ? 'Could not load shows. Pull to retry.' : 'No shows scheduled.'}
          </Text>
        )
      }
    />
  );
}
