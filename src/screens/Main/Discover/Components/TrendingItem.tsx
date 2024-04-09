import React, { memo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FeedEventDetailsType } from '../common/types';
import moment from 'moment';

const TrendingItem = (props: FeedEventDetailsType) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          style={{ width: '100%', height: '100%', flex: 1 }}
          imageStyle={{ borderRadius: 15 }}
          source={{
            uri: props.images != null ? props.images[0].hq_url : 'https://picsum.photos/700'
          }}
        />
      </View>
      <View style={{ flex: 3, marginStart: 5, marginTop: 15 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>{props.name}</Text>
        <Text style={{ fontWeight: '500', fontSize: 12, marginBottom: 3 }}>
          {moment(props.startDate).format('ddd DD/MM/YYYY')}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 12 }}>Bibliothe</Text>
        <View style={{ maxWidth: 100, marginTop: 10 }}>
          <Text style={{ fontWeight: '500', fontSize: 12 }}>{props.creator.username}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 300,
    height: 130,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 1,
    marginEnd: 10,
    borderRadius: 15
  },
  bgImageContainer: {
    flex: 3,
    padding: 5
  }
});

export default memo(TrendingItem, (prevProps, nextProps) => prevProps.id === nextProps.id);
