import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { FastImageComponent } from '../../../../components/imageComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';

type StoryData = {
  id: string;
  creator: CreatorData;
};

type CreatorData = {
  uid: string;
  username: string;
  photo: string;
};

const StroyItem = (storyData: StoryData) => {
  const navigation = useNavigation();
  const navigateToUserScreen = () => {
    console.log('click');
    navigation.dispatch(CommonActions.navigate('AccountNavigator', { userUid: storyData.creator.uid }));
  };

  return (
    <View style={{ flex: 1, width: 80 }}>
      <View style={{ alignSelf: 'center' }}>
        <StoryAvatar creatorData={storyData.creator} />
      </View>

      <TouchableWithoutFeedback onPressIn={navigateToUserScreen}>
        <Text style={{ marginTop: 3, fontWeight: '500', fontSize: 13, alignSelf: 'center' }}>
          {storyData.creator.username}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const StoryAvatar = ({ creatorData }: { creatorData: CreatorData }) => {
  return (
    <TouchableHighlight style={profileImgStyles.profileImgContainer}>
      <View style={profileImgStyles.profileImg}>
        <FastImageComponent
          dimVal={65}
          imageUri={
            creatorData.photo != null
              ? creatorData.photo
              : 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/background-images/launch_set/22_Launch.jpg'
          }
        />
      </View>
    </TouchableHighlight>
  );
};

const profileImgStyles = StyleSheet.create({
  profileImgContainer: {
    borderColor: 'white',
    borderWidth: 1,
    height: 65,
    width: 65,
    borderRadius: 33,
    overflow: 'hidden'
  },
  profileImg: {
    height: 65,
    width: 65,
    borderRadius: 33
  }
});

export default memo(StroyItem, (prevProps, nextProps) => prevProps.id === nextProps.id);
