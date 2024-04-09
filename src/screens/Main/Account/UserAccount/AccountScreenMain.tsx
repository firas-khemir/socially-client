import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ListRenderItem, useColorScheme, ActivityIndicator, Text } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { useSelector } from 'react-redux';
import { ThemeState } from '../../../../redux/reducers/themeReducer';
import AccountScreenHeader from './AccountScreenHeader';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { globalEnv } from '../../../../config/baseConfig';
import { useInfiniteQuery } from 'react-query';
import { MD3Colors } from 'react-native-paper';
import { AccountStackProps } from '../../../../../@types/navigation/AccountNavigation';
import { FeedEventDetailsType } from '../../Discover/common/types';
import FeedItem from '../../Discover/Components/FeedItem';

// Functional component
// const AccountScreenMain: React.FC<{ userUid: string }> = ({ userUid }) => {
const AccountScreenMain = ({ route }: AccountStackProps) => {
  const [content, setContent] = useState<any[]>([]);
  const [isPaused, setPause] = useState(false);
  const [userUid, setUserUId] = useState(route.params!.userUid);
  // const [userUid, setUserUId] = useState('a77cfd25-1069-49e7-881d-af982c3d236d');

  console.log('routee', route.params?.userUid);

  const renderItem: ListRenderItem<FeedEventDetailsType> = React.useCallback(({ item }) => {
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
  }, []);

  const colorScheme = useColorScheme();

  const isDark = useSelector((state: { theme: ThemeState }) => state.theme.darkMode);
  const isDarkMode = isDark === null ? colorScheme === 'dark' : isDark;

  const tabBar = (props: any) => (
    <MaterialTabBar
      {...props}
      activeColor={isDarkMode ? '#fff' : '#8f0be2'}
      inactiveColor={isDarkMode ? '#696969' : '#8f0be2'}
      indicatorStyle={{ backgroundColor: '#8f0be2' }}
      style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}
    />
  );

  const token = async () =>
    auth()
      .currentUser?.getIdToken()
      .then((val) => val);
  const fetchUserEvents = async ({ pageParam = 1 }) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + (await token())
      }
    };

    console.log('yoooooo', route.params?.userUid);
    const response = await axios.get(
      `${globalEnv.BASE_URL}/media/events/get-user-events/${route.params?.userUid}?page=${pageParam}`,
      config
    );

    console.log(response);

    const results = response.data;
    pageParam++;
    return {
      results,
      nextPage: pageParam,
      totalPages: response.data.totalPages
    };
  };

  const { isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
    ['userEvents'],
    fetchUserEvents,
    {
      onSuccess: (data) => {
        const updatedContent = content.slice();
        updatedContent.push(...data.pages[0].results.content);
        setContent(updatedContent);
      },

      getNextPageParam: (result) => {
        if (result.nextPage <= result.totalPages) {
          console.log('nextPage', result.nextPage);
          return result.nextPage;
        }
        // return undefined;
      }
    }
  );

  const loadMore = () => {
    hasNextPage && fetchNextPage();
  };

  const undoPause = () => {
    setTimeout(() => {
      setPause(false);
    }, 1000);
  };

  return (
    <Tabs.Container
      renderHeader={() => <AccountScreenHeader userUid={userUid} />}
      renderTabBar={tabBar}
      lazy={false}
    >
      <Tabs.Tab name="Main">
        {/* <Tabs.FlatList data={DATA} renderItem={renderItem} keyExtractor={identity} /> */}

        {isLoading ? (
          <Tabs.ScrollView>
            <View style={[styles.box, styles.boxA]}>
              <Text style={{ color: '#fff' }}>Loading</Text>
            </View>
          </Tabs.ScrollView>
        ) : isSuccess ? (
          <Tabs.FlatList
            data={content}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator animating={true} color={MD3Colors.primary50} /> : null
            }
          />
        ) : (
          isError && (
            <Tabs.ScrollView>
              <View style={[styles.box, styles.boxA]}>
                <Text style={{ color: '#000' }}>Error</Text>
              </View>
            </Tabs.ScrollView>
          )
        )}
      </Tabs.Tab>
      <Tabs.Tab name="Events">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%'
  },
  boxA: {
    backgroundColor: 'white'
  },
  boxB: {
    backgroundColor: '#D8D8D8'
  }
});

export default AccountScreenMain;
