import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { globalEnv } from '../../../../config/baseConfig';
import auth from '@react-native-firebase/auth';
import { useMutation, useQuery } from 'react-query';
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ThemeState } from '../../../../redux/reducers/themeReducer';
import { useSelector } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import { FastImageComponent } from '../../../../components/imageComponent';
import { useAppSelector } from '../../../../hooks';

export default function AccountScreenHeader({ userUid }: { userUid: string }) {
  const colorScheme = useColorScheme();

  const isDark = useSelector((state: { theme: ThemeState }) => state.theme.darkMode);
  const isDarkMode = isDark === null ? colorScheme === 'dark' : isDark;

  const headerStyles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff'
    },
    coverArea: {
      height: 130,
      justifyContent: 'center'
    },
    coverPic: { width: '100%', height: '100%', flex: 1 },

    profilePicArea: {
      position: 'absolute',
      top: 90,
      left: 20,
      justifyContent: 'center'
    },

    profilePic: { width: 80, height: 80, flex: 1, borderRadius: 80 },

    buttonsArea: { position: 'absolute', width: '100%', top: 5, height: 40 },
    buttonStyle: { marginTop: 7 },

    backButton: {
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 20,
      // backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    blurButtonContainer: {
      // flex: 1,

      borderRadius: 20,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },

    moreButton: {
      position: 'absolute',
      right: 10,
      backgroundColor: '#fff',
      width: 35,
      height: 35
    },

    searchButton: {
      position: 'absolute',
      right: 55,
      backgroundColor: '#fff',
      width: 35,
      height: 35
    },

    label: {
      fontSize: 13,
      marginVertical: 4
    }
  });
  const generalItemsStyle = StyleSheet.create({
    smallBtnStyle: { marginTop: 5, width: 50 },
    btnStyle: { marginTop: 5 }
  });
  const followAreaStyle = StyleSheet.create({
    followArea: { height: 30, flexDirection: 'row-reverse', marginTop: 7, paddingStart: 7 },

    followButton: {
      backgroundColor: isDarkMode ? '#fff' : '#000',
      width: 80,
      height: 30
    },

    followButtonText: {
      color: isDarkMode ? '#000' : '#fff'
    },

    bellButton: {
      marginRight: 10,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      width: 30,
      height: 30
    }
  });
  const introAreaStyle = StyleSheet.create({
    introArea: { marginTop: 5, paddingHorizontal: 20, marginBottom: 10 },
    nameArea: { flexDirection: 'row' },
    nameText: {
      fontSize: 26,
      fontWeight: '800',
      marginTop: 2,
      color: isDarkMode ? '#fff' : '#000'
    },
    badge: {
      marginLeft: 6,
      marginTop: 6,
      width: 20,
      height: 20
    },
    premBadge: {
      marginLeft: 6,
      marginTop: 6,
      backgroundColor: '#800080',
      width: 20,
      height: 20
    },
    hotshotBadge: {
      marginLeft: 6,
      marginTop: 6,
      backgroundColor: '#daa520',
      width: 20,
      height: 20
    },
    bioText: { marginTop: 10, lineHeight: 21, color: isDarkMode ? '#fff' : '#000' },
    otherInfoArea: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 },
    otherInfoItem: { flexDirection: 'row', marginRight: 10 },
    otherInfoIcon: { marginTop: 5, marginRight: 5 },
    otherInfoText: { color: '#808080', flexWrap: 'wrap' },

    followArea: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 },
    followTextArea: { flexDirection: 'row', marginRight: 20 },
    followNumText: { color: isDarkMode ? '#fff' : '#000', flexWrap: 'wrap', fontSize: 16 },
    followText: { color: '#808080', flexWrap: 'wrap', fontSize: 16 },
    commonfollowersText: { flexWrap: 'wrap', marginTop: 5 }
  });

  const { uid } = useAppSelector((state) => state.auth);

  const [accessToken, setAccessToken] = useState<string>('');
  const [coverPic, setCoverPic] = useState();
  const [profilePic, setProfilePic] = useState();
  const [userName, setUserName] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [bio, setBio] = useState();
  const [followersCount, setfollowersCount] = useState(0);
  const [followingCount, setfollowingCount] = useState(0);
  const [isFollower, setIsFollower] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    user != null && user.getIdToken().then((token: string) => setAccessToken(token));
    console.log(uid);
    console.log(userUid);

    if (uid === userUid) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Same dude ', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success');
      }
    }
  }, [uid, userUid]);

  const getToken = async () => await auth().currentUser?.getIdToken();
  async function fetchProfile() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + (await getToken())
      }
    };

    // console.log(config);

    const { data } = await axios.get(`${globalEnv.BASE_URL}/account/users/find-by-uid/${userUid}`, config);

    console.log('data', data);

    if (data != null) {
      setUserName(data.username);
      setProfilePic(data.photo);
      setfollowersCount(data.followersCount);
      setfollowingCount(data.followingCount);
      setIsFollower(data.isFollower);
      setIsFollowing(data.isFollowing);
      setCreatedDate(data.createdDate);
    }

    return data;
  }

  const { data, isLoading, isSuccess, isFetching, isError } = useQuery(['profile'], () => fetchProfile(), {
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
    // staleTime: 5000
  });

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  async function followUserRequest() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };

    let followUrl = isFollowing ? 'unfollow' : 'follow';

    const { data: response } = await axios.put(
      `${globalEnv.BASE_URL}/account/social/${userUid}/${followUrl}`,
      {},
      config
    );
    return response;
  }

  const followUserMutation = useMutation(followUserRequest, {
    onSuccess: (data) => {
      setIsFollowing(!isFollowing);
      let updatedFollowersCount = followersCount;
      isFollowing ? updatedFollowersCount-- : updatedFollowersCount++;
      setfollowersCount(updatedFollowersCount);
    },
    onError: (data) => {
      console.log('error');
    }
  });

  const lorum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <View>
      <View style={headerStyles.screen} pointerEvents="box-none">
        <View style={headerStyles.coverArea}>
          <ImageBackground
            style={headerStyles.coverPic}
            // imageStyle={headerStyles.coverPicImageStyle}
            source={{
              uri:
                coverPic != null
                  ? coverPic
                  : 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/background-images/launch_set/22_Launch.jpg'
            }}
          />

          <View style={[headerStyles.buttonsArea]}>
            <TouchableOpacity
              style={{
                marginStart: 5,
                borderRadius: 20,
                overflow: 'hidden',
                width: 40,
                backgroundColor: 'transparent'
              }}
              onPress={() => {}}
            >
              <BlurView
                style={headerStyles.blurButtonContainer}
                blurType="light"
                blurAmount={5}
                overlayColor="transparent"
              >
                <Icon name="arrow-left" size={17} color="#000" style={headerStyles.backButton} />
              </BlurView>
            </TouchableOpacity>
            <Button
              style={headerStyles.searchButton}
              labelStyle={headerStyles.label}
              compact={true}
              children={<Icon name="picture-o" size={17} color="#000" style={headerStyles.buttonStyle} />}
            />
            <Button
              style={headerStyles.moreButton}
              labelStyle={headerStyles.label}
              compact={true}
              children={<Icon name="picture-o" size={17} color="#000" style={headerStyles.buttonStyle} />}
            />
          </View>
        </View>

        <View style={headerStyles.profilePicArea}>
          <FastImageComponent
            imageUri={
              profilePic != null && profilePic !== ''
                ? profilePic
                : 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/background-images/launch_set/22_Launch.jpg'
            }
          />
        </View>

        <View style={followAreaStyle.followArea}>
          <Button
            style={followAreaStyle.followButton}
            labelStyle={headerStyles.label}
            compact={true}
            onPress={() => followUserMutation.mutate()}
            children={
              <Text style={followAreaStyle.followButtonText}>{!isFollowing ? 'Follow' : 'unfollow'}</Text>
            }
          />
          <Button
            style={followAreaStyle.bellButton}
            labelStyle={headerStyles.label}
            compact={true}
            children={
              <Icon
                name="picture-o"
                size={12}
                color={isDarkMode ? '#000' : '#fff'}
                style={generalItemsStyle.smallBtnStyle}
              />
            }
          />
        </View>

        <View style={introAreaStyle.introArea}>
          <View style={introAreaStyle.nameArea}>
            <Text style={introAreaStyle.nameText}>{userName}</Text>
            <View>
              <Button
                style={[introAreaStyle.badge, introAreaStyle.premBadge]}
                labelStyle={headerStyles.label}
                compact={true}
                children={
                  <Icon name="picture-o" size={12} color="#fff" style={{ width: 50, marginTop: 0 }} />
                }
              />
            </View>
            <View>
              <Button
                style={[introAreaStyle.badge, introAreaStyle.hotshotBadge]}
                labelStyle={headerStyles.label}
                compact={true}
                children={
                  <Icon name="picture-o" size={12} color="#fff" style={{ width: 50, marginTop: 0 }} />
                }
              />
            </View>
          </View>

          <View>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={introAreaStyle.bioText}
            >
              {lorum}
            </Text>

            {lengthMore ? (
              <Text onPress={toggleNumberOfLines} style={{ lineHeight: 21, marginTop: 3, color: '#1e90ff' }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>

          <View style={introAreaStyle.otherInfoArea}>
            <View style={introAreaStyle.otherInfoItem}>
              <Icon name="picture-o" size={12} color="#808080" style={introAreaStyle.otherInfoIcon} />
              <Text style={introAreaStyle.otherInfoText}>Software developer</Text>
            </View>
            <View style={introAreaStyle.otherInfoItem}>
              <Icon name="picture-o" size={12} color="#808080" style={introAreaStyle.otherInfoIcon} />
              <Text style={introAreaStyle.otherInfoText}>Software developer that works remotely</Text>
            </View>
          </View>

          <View style={introAreaStyle.followArea}>
            <View style={introAreaStyle.followTextArea}>
              <Text style={introAreaStyle.followNumText}>{followersCount}</Text>
              <Text style={introAreaStyle.followText}> Followers</Text>
            </View>
            <View style={introAreaStyle.followTextArea}>
              <Text style={introAreaStyle.followNumText}>{followingCount}</Text>
              <Text style={introAreaStyle.followText}> Following</Text>
            </View>
          </View>

          <Text style={introAreaStyle.commonfollowersText}>No followers in common</Text>
        </View>
        {/* End of intro area */}
      </View>
    </View>
  );
}
