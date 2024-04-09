import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export default function SingleEventMain() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.coverPicContainer}>
        <FastImage
          fallback={true}
          // onError={onError}
          // onLoadEnd={onLoadEnd}
          // onLoadStart={onLoadStart}
          style={{ width: '100%', height: 550 }}
          source={{
            uri: 'https://picsum.photos/700',
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.coverPicBtnRow}>
          <Button
            icon={ButtonIcon}
            mode="contained"
            labelStyle={styles.label}
            compact={true}
            style={[styles.button, { marginLeft: 10 }]}
            onPress={() => console.log('Pressed')}
          >
            Interested
          </Button>

          <Button
            icon={ButtonIcon}
            mode="contained"
            labelStyle={styles.label}
            compact={true}
            style={[styles.button, { marginLeft: 10 }]}
            onPress={() => console.log('Pressed')}
          >
            Going
          </Button>
        </View>
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: '#696969' }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="hourglass" size={12} color="#000" style={{ marginEnd: 5 }} />
            <Text style={{ fontWeight: 'bold' }}>4h</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="users" size={12} color="#000" style={{ marginEnd: 5 }} />
            <Text>Event by Randoo</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Icon name="calendar" size={12} color="#000" style={{ marginEnd: 5, paddingBottom: 5 }} />
            <View>
              <Text>Event by Randoo</Text>
              <Text>Event by Randoo</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Icon name="server" size={12} color="#000" style={{ marginEnd: 5 }} />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', marginEnd: 5 }}>100 going</Text>
                <Text style={{ fontWeight: 'bold', marginEnd: 5 }}>250 interested</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="facebook" size={12} color="#000" style={{ marginEnd: 5 }} />
                <Icon name="facebook" size={12} color="#000" style={{ marginEnd: 5 }} />
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <Button
            icon={ButtonIcon}
            mode="contained"
            labelStyle={styles.label}
            compact={true}
            style={[styles.button, { marginLeft: 10 }]}
            onPress={() => console.log('Pressed')}
          >
            Interested
          </Button>
          <Button
            icon={ButtonIcon}
            mode="contained"
            labelStyle={styles.label}
            compact={true}
            style={[styles.button, { marginLeft: 10 }]}
            onPress={() => console.log('Pressed')}
          >
            Going
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const ButtonIcon: IconSource = () => {
  return <Icon name="facebook" size={12} color="#000" style={{ marginTop: 1 }} />;
};

const styles = StyleSheet.create({
  coverPicContainer: {
    flex: 1,
    height: 550,
    overflow: 'hidden'
  },

  coverPicBtnRow: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10
  },

  button: {
    width: 'auto'
  },
  label: {
    fontSize: 13,
    marginVertical: 4
  }
});
