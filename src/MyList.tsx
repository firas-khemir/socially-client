import CharacterListItem from './CharacterListItem';
import { ActivityIndicator, FlatList, ListRenderItem, useWindowDimensions } from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import React from 'react';

const initialPage = 'https://rickandmortyapi.com/api/character';

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState('');

  const { width } = useWindowDimensions();

  const fetchPage = async (url: string) => {
    if (loading) {
      return;
    }

    console.log('Fetching: ', url);
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  };

  useEffect(() => {
    fetchPage(initialPage);
  });

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => <CharacterListItem id={item.id} name={item.name} image={item.image} />,
    []
  );

  const itemHeight = width + 40;

  // Use case: increase impression count for posts
  // that are visible on the screen for more than 0.5 seconds

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50
      },
      onViewableItemsChanged: ({ changed, viewableItems }: { changed: any; viewableItems: any }) => {
        changed.forEach((changedItem: any) => {
          if (changedItem.isViewable) {
            console.log('++ Impression for: ', changedItem.item.id);
          }
        });
      }
    }
  ]);

  if (items.length === 0) {
    // this is only to make the debug prop on FlatList Work
    return null;
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 5 }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      refreshing={loading}
      onRefresh={onRefresh}
      debug
      // removeClippedSubviews={true}
      initialNumToRender={3}
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: (itemHeight + 5) * index,
        index
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      numColumns={2}
    />
  );
};

export default MyList;
