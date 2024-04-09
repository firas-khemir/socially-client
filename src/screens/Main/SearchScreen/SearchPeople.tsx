import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import { useQuery } from 'react-query';
import { globalEnv } from '../../../config/baseConfig';
import auth from '@react-native-firebase/auth';
import { FastImageComponent } from '../../../components/imageComponent';
import { MD3Colors } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SearchPeople = ({
  // navigation,
  searchQuery
}: {
  // navigation: any;
  searchQuery: string;
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(searchQuery);
  const [isEnabled, setIsEnabled] = useState(searchQuery.length > 0);
  const [searchResults, setSearchResults] = useState([]);

  const fetchUsersBySearchInput = async () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + (await auth().currentUser?.getIdToken())
      }
    };
    console.log('page', page);
    const { data } = await axios.get(
      `${globalEnv.BASE_URL}/account/users/find-all?searchQuery=${query}&page=${page}`,
      config
    );
    return data;
  };

  const { data, isLoading, isSuccess, isFetching, isError } = useQuery(
    ['users', query, page],
    fetchUsersBySearchInput,
    {
      cacheTime: 1000,
      retry: 2,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      enabled: isEnabled,
      onSuccess: (data) => {
        const searchResultsCopy = searchResults.slice();
        const newSearchResults = searchResultsCopy.concat(data.content);
        setSearchResults(newSearchResults);
        setTotalPages(data.totalPages);
      },
      onError: () => {}
    }
  );

  useEffect(() => {
    setPage(1);
    setQuery(searchQuery);
    setSearchResults([]);
    setIsEnabled(searchQuery.length > 0);
  }, [searchQuery]);

  function loadMore() {
    page < totalPages && setPage(page + 1);
  }

  return !isEnabled ? (
    <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search for users here</Text>
    </View>
  ) : (
    <View style={{ marginTop: 25, paddingHorizontal: 10 }}>
      {isLoading ? (
        <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Searching...</Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchResultItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            isFetching ? <ActivityIndicator animating={true} color={MD3Colors.primary50} /> : null
          }
        />
      ) : (
        isError && (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text>Error</Text>
          </View>
        )
      )}
    </View>
  );
};

type ResultItemType = {
  // id: string;
  uid: string;
  displayName: string;
  username: string;
  photo: string;
  followedBy: string;
};

const SearchResultItem = ({ item }: { item: ResultItemType }) => {
  const mainStyle: StyleProp<ViewStyle> = { width: '100%', height: 70, flexDirection: 'row' };
  const profilePicStyle: StyleProp<ViewStyle> = {
    alignSelf: 'center',
    marginEnd: 13
  };

  const navigation = useNavigation();

  const navigateToScreen = () => {
    console.log('click', item.uid);
    navigation.dispatch(CommonActions.navigate('AccountNavigator', { userUid: item.uid }));
  };

  // function navigateToProfile() {
  //   props.navigation.navigate('ScreenB')}
  // }

  return (
    <TouchableWithoutFeedback onPressIn={navigateToScreen}>
      <View style={mainStyle}>
        <View style={profilePicStyle}>
          <FastImageComponent
            dimVal={55}
            imageUri={
              item.photo != null && item.photo.length > 0
                ? item.photo
                : 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/background-images/launch_set/22_Launch.jpg'
            }
          />
        </View>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, lineHeight: 18, fontWeight: '600' }}>
            {item.username}
          </Text>
          <Text style={{ color: '#696969', fontSize: 14, lineHeight: 18 }}>{item.displayName}</Text>
          <Text style={{ color: '#696969', fontSize: 14, lineHeight: 18 }}>50K followers</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
