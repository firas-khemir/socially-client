import React, { Fragment, useRef, useState } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import axios from 'axios';
import { globalEnv } from '../../../config/baseConfig';
import { useInfiniteQuery } from 'react-query';
import { ActivityIndicator, MD3Colors } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import FeedItem from './Components/FeedItem';
import TrendingItem from './Components/TrendingItem';
import StroyItem from './Components/StoryItem';
import { FeedEventDetailsType } from './common/types';

export function HomeScreen() {
  const [page] = useState<number>(1);

  const token = async () =>
    auth()
      .currentUser?.getIdToken()
      .then((val) => val);

  const fetchEvents = async (pageParam = 1) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + (await token())
      }
    };
    const response = await axios.get(`${globalEnv.BASE_URL}/media/events/get-feed`, config);
    // return response.data;
    const results = response.data;
    return {
      results,
      nextPage: pageParam + 1,
      totalPages: 100000
    };
  };

  const { isLoading, data, isSuccess, fetchNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
    'events',
    () => fetchEvents(page),
    {
      getNextPageParam: (result) => {
        if (result.nextPage <= result.totalPages) {
          return result.nextPage;
        }
        return undefined;
      }
    }
  );

  const loadMore = () => {
    // if (hasNextPage) {
    fetchNextPage();
    // }
  };

  type DualType = {
    dtoType: string;
    feedDTOSet: ArrayLike<any>;
  };

  const renderFeedItem: ListRenderItem<FeedEventDetailsType> = React.useCallback(
    ({ item }) => (
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
    ),
    []
  );

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

  const renderDualLists: ListRenderItem<DualType> = React.useCallback(
    ({ item }) => {
      if (item.dtoType === 'story') {
        return (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={item.feedDTOSet}
              renderItem={({ item }) => (
                <StroyItem
                  creator={{
                    uid: item.creator.uid,
                    username: item.creator.username,
                    photo: item.creator.photo
                  }}
                  id={item.id}
                />
              )}
              horizontal={true}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      } else if (item.dtoType === 'recommended') {
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Trending events:</Text>
            <FlatList
              data={item.feedDTOSet}
              renderItem={({ item }: { item: FeedEventDetailsType }) => (
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
              )}
              horizontal={true}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      } else {
        return (
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Feed events o:</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={item.feedDTOSet}
              renderItem={renderFeedItem}
              keyExtractor={(cItem) => cItem.id}
              maxToRenderPerBatch={3}
            />
          </View>
        );
      }
    },
    [renderFeedItem]
  );

  return (
    <View>
      {isLoading && (
        <Fragment>
          <ActivityIndicator animating={true} color={MD3Colors.primary50} />
        </Fragment>
      )}

      {isSuccess && (
        <View style={{ paddingHorizontal: 5 }}>
          <View style={{ marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={true}
              data={data.pages.map((page) => page.results.feed).flat()}
              renderItem={renderDualLists}
              // keyExtractor={(item, index) => index.toString()}
              onEndReached={loadMore}
              onEndReachedThreshold={0.7}
              ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator animating={true} color={MD3Colors.primary50} /> : null
              }
            />
          </View>
        </View>
      )}

      {isError && (
        <Fragment>
          <Text>Error...</Text>
        </Fragment>
      )}
    </View>
  );
}
