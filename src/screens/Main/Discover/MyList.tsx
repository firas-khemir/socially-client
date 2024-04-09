/* eslint-disable react-hooks/exhaustive-deps */
import { ActivityIndicator, FlatList, ListRenderItem, Text, useWindowDimensions, View } from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import { globalEnv } from '../../../config/baseConfig';
import auth from '@react-native-firebase/auth';
import CharacterListItem from '../../../CharacterListItem';
import StroyItem from './Components/StoryItem';
import FeedItem from './Components/FeedItem';
import TrendingItem from './Components/TrendingItem';

const initialPage = 'https://rickandmortyapi.com/api/character';

type DualType = {
  dtoType: string;
  feedDTOSet: ArrayLike<any>;
};

const MyListt = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [multiItems] = useState<DualType[]>([]);
  const [nextPage, setNextPage] = useState('');

  const { width } = useWindowDimensions();

  const token = async () =>
    auth()
      .currentUser?.getIdToken()
      .then((val) => val);

  const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    // setNextPage(initialPage);
    fetchPage();
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const config = {
      headers: {
        Authorization: 'Bearer ' + (await token())
      }
    };
    const data = await axios.get(`${globalEnv.BASE_URL}/media/events/get-feed`, config);

    const eventsCopy = items.slice();

    data.data.feed.forEach((item: any) => {
      if (item.dtoType === 'story') {
        eventsCopy.push(item);
      } else if (item.dtoType === 'recommended') {
        eventsCopy.push(item);
      } else {
        item.feedDTOSet.forEach((item: any) => {
          eventsCopy.push(item);
        });
      }
    });

    setItems((oldItems) => {
      return [...oldItems, ...eventsCopy];
    });
    setNextPage('1');
    setLoading(false);
  };

  const renderStoryItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <StroyItem
        creator={{
          uid: item.creator.uid,
          username: item.creator.username,
          photo: item.creator.photo
        }}
        id={item.id}
      />
    ),
    []
  );

  const renderRecommendedItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <TrendingItem
        name={item.name}
        details={item.details}
        creator={item.creator}
        id={item.id}
        images={item.images}
        createdDate={item.createdDate}
        startDate={item.startDate}
        duration={item.duration}
        frequency={item.frequency}
      />
    ),
    []
  );

  // const renderItem: ListRenderItem<any> = useCallback(
  //   ({ item }) => (
  //     <CharacterListItem id={item.id} name={item.name} image="https://picsum.photos/700" />
  //   ),
  //   []
  // );

  const renderDualLists: ListRenderItem<DualType | any> = useCallback(({ item }) => {
    const itemm = item;
    // console.log('yoo');
    if (itemm.dtoType === 'story') {
      return (
        <FlatList
          data={itemm.feedDTOSet}
          renderItem={renderStoryItem}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
          horizontal={true}
          keyExtractor={(item, index) => item.id + index}
          showsHorizontalScrollIndicator={false}
        />
      );
    } else if (itemm.dtoType === 'recommended') {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Trending events:</Text>
          <FlatList
            data={item.feedDTOSet}
            renderItem={renderRecommendedItem}
            horizontal={true}
            keyExtractor={(item, index) => item.id + index}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: itemHeight,
              offset: (itemHeight + 5) * index,
              index
            })}
          />
        </View>
      );
    } else {
      return (
        <FeedItem
          name={item.name}
          details={item.details}
          creator={item.creator}
          id={item.id}
          images={item.images}
          createdDate={item.createdDate}
          startDate={item.startDate}
          duration={item.duration}
          frequency={item.frequency}
        />
      );
    }
  }, []);

  const itemHeight = width + 40;

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
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderDualLists}
      contentContainerStyle={{ gap: 10 }}
      // columnWrapperStyle={{ gap: 5 }}
      onEndReached={() => fetchPage()}
      onEndReachedThreshold={5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      // refreshing={loading}
      // onRefresh={onRefresh}

      // horizontal={true}
      debug
      removeClippedSubviews={true}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: (itemHeight + 5) * index,
        index
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
};

export default MyListt;
