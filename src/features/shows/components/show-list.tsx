import { ActivityIndicator, Text } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { AnimatedLegendList } from '@legendapp/list/reanimated';

import { useShowList } from '../hooks/use-show-list';
import { ShowListHeader } from './show-list-header';
import { ShowRow } from './show-row';
import { styles } from './show-list.styles';

function emptyMessage(isError: boolean, onlyFavorites: boolean) {
  if (isError) return 'Could not load shows. Pull to retry.';
  if (onlyFavorites) return 'No favorite shows yet. Tap ☆ on a show to add it.';
  return 'No shows scheduled.';
}

export function ShowList() {
  const {
    shows,
    onlyFavorites,
    sort,
    isLoading,
    isError,
    isRefreshing,
    toggleOnlyFavorites,
    toggleSort,
    refresh,
    openShow,
  } = useShowList();

  return (
    <AnimatedLegendList
      data={shows}
      keyExtractor={(show) => show.id}
      renderItem={({ item }) => <ShowRow show={item} onPress={openShow} />}
      estimatedItemSize={92}
      // Remount rows instead of reusing them, so entering/exiting animations play.
      recycleItems={false}
      // Rows slide into their new position when the filter or sort order changes.
      itemLayoutAnimation={LinearTransition.duration(250)}
      refreshing={isRefreshing}
      onRefresh={refresh}
      style={styles.list}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <ShowListHeader
          onlyFavorites={onlyFavorites}
          sort={sort}
          onToggleOnlyFavorites={toggleOnlyFavorites}
          onToggleSort={toggleSort}
        />
      }
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.status}>{emptyMessage(isError, onlyFavorites)}</Text>
        )
      }
    />
  );
}
