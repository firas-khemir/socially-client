import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import { Colors } from '../../../../theme/Variables';
import { FeedEventCreatorType, FeedEventDetailsType } from '../common/types';
import { FastImageComponent } from '../../../../components/imageComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const FeedItem = (props: FeedEventDetailsType) => {
  console.log('Re-rendering: ', props.id);

  const navigation = useNavigation();
  const navigateToScreen = () => {
    console.log('click', props.id);
    navigation.dispatch(CommonActions.navigate('SingleEventNavigator', { eventId: props.id }));
  };

  return (
    <TouchableWithoutFeedback onPress={navigateToScreen} style={styles.container}>
      <View>
        <View style={styles.eventHeader}>
          <EventHeader creator={props.creator} createdDate={props.createdDate} />
        </View>

        <View style={styles.eventTitleContainer}>
          <EventTitle eventName={props.name} />
        </View>

        <View style={styles.eventDetailsContainer}>
          <EventDetails details={props.details} />
        </View>

        <View style={styles.eventImage}>
          <View style={styles.cardContainer}>
            {/* <Card.Cover
            source={{
              uri: props.images[0] != null ? props.images[0].hq_url : 'https://picsum.photos/700'
            }}
          /> */}

            <FastImage
              fallback={true}
              // onError={onError}
              // onLoadEnd={onLoadEnd}
              // onLoadStart={onLoadStart}
              style={{ width: '100%', height: 200 }}
              source={{
                uri: props.images[0] != null ? props.images[0].hq_url : 'https://picsum.photos/700',
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            {/* <Image
            source={{
              uri: 'https://picsum.photos/700'
            }}
            style={{ width: '100%', aspectRatio: 1 }}
          /> */}
          </View>
        </View>

        <View style={styles.eventFooter}>
          <EventFooter />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

type EventHeaderType = {
  creator: FeedEventCreatorType;
  createdDate: Date;
};

const EventHeader = ({ creator, createdDate }: EventHeaderType) => {
  const theme = useColorScheme();
  const isDarkTheme = useMemo(() => theme === 'dark', [theme]);

  const navigation = useNavigation();
  const navigateToUserScreen = React.useCallback(() => {
    navigation.dispatch(CommonActions.navigate('AccountNavigator', { userUid: creator.uid }));
  }, [navigation, creator.uid]);

  return (
    <View style={headerStyles.container}>
      <TouchableWithoutFeedback onPressIn={navigateToUserScreen}>
        <View style={headerStyles.userAvatar}>
          <UserAvatar photo={creator.photo} />
        </View>
      </TouchableWithoutFeedback>
      <View style={headerStyles.topSectionContainer}>
        <View style={headerStyles.topSection}>
          <Text style={isDarkTheme ? headerStyles.usernameDark : headerStyles.usernameDark}>
            {creator.username}
          </Text>
          <View style={headerStyles.topRightSection}>
            <Text style={headerStyles.timeText}>{createdDate.toString()}</Text>

            <FeatherIcon name="more-vertical" size={15} color={Colors.white} style={headerStyles.moreIcon} />
          </View>
        </View>
        <View style={headerStyles.badgesSection}>
          <FeatherIcon name="check-circle" size={13} color={Colors.white} style={headerStyles.badgeStyle} />
          <FeatherIcon name="check-circle" size={13} color={Colors.white} style={headerStyles.badgeStyle} />
          <FeatherIcon name="check-circle" size={13} color={Colors.white} style={headerStyles.badgeStyle} />
        </View>
      </View>
    </View>
  );
};

const EventFooter = () => {
  return (
    <View style={footerStyles.container}>
      <View style={footerStyles.interactContainer}>
        <FAIcon name="heart" size={18} color={Colors.white} style={footerStyles.interactIcon} />
        <FAIcon name="comments" size={18} color={Colors.white} style={footerStyles.interactIcon} />
        <FAIcon name="share" size={18} color={Colors.white} />
      </View>
      <View>
        <FAIcon name="bookmark" size={18} color={Colors.white} />
      </View>
    </View>
  );
};

const EventTitle = ({ eventName }: { eventName: string }) => {
  return (
    <View>
      <Text style={headerStyles.eventTitle}>{eventName}</Text>
    </View>
  );
};

const EventDetails = ({ details }: { details: string }) => {
  return (
    <View>
      <Text style={headerStyles.eventDetails}>{details}</Text>
    </View>
  );
};

export const UserAvatar = ({ photo }: { photo?: string }) => {
  return (
    <View style={profileImgStyles.profileImgContainer}>
      <View style={profileImgStyles.profileImg}>
        <FastImageComponent
          dimVal={50}
          imageUri={
            photo != null
              ? photo
              : 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/background-images/launch_set/22_Launch.jpg'
          }
        />
      </View>
    </View>
  );
};

const footerStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  interactContainer: { flexDirection: 'row' },
  interactIcon: { marginEnd: 20 }
});

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  userAvatar: { marginEnd: 7, marginTop: 3, width: 50, height: 50 },
  topSectionContainer: { flex: 1, flexDirection: 'column' },
  topRightSection: { flex: 1, justifyContent: 'flex-end', flexDirection: 'row' },
  badgesSection: { flex: 1, flexDirection: 'row', marginTop: 0 },
  timeText: { marginEnd: 10 },
  moreIcon: { marginTop: 3 },
  badgeStyle: { marginTop: 3 },
  eventTitle: { fontWeight: 'bold', fontSize: 20 },
  eventDetails: { fontSize: 12 },
  usernameLight: { color: '#000' },
  usernameDark: { color: '#fff' },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  }
});

const profileImgStyles = StyleSheet.create({
  profileImgContainer: {
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
});

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 25
  },

  eventHeader: { paddingLeft: 8, paddingEnd: 10, marginTop: 5 },
  eventTitleContainer: { paddingHorizontal: 10, marginTop: 3 },
  eventDetailsContainer: { paddingHorizontal: 10, marginTop: 3 },
  cardContainer: {
    width: '100%',
    marginTop: 15
  },
  eventFooter: { paddingHorizontal: 15, marginTop: 10, marginBottom: 10 },
  eventImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
});

export default memo(FeedItem, (prevProps, nextProps) => prevProps.id === nextProps.id);
