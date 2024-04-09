import { View, Text, Image, StyleSheet } from 'react-native';
// import { Character } from '../types';
import { memo } from 'react';
import React from 'react';

type CharacterListItem = {
  id: string;
  name: string;
  image: string;
};

const CharacterListItem = ({ id, name, image }: CharacterListItem) => {
  console.log('Re-rendering: ', id);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10
  },
  name: {
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkslategrey',
    alignSelf: 'center',
    marginVertical: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  }
});

export default memo(CharacterListItem, (prevProps, nextProps) => prevProps.id === nextProps.id);
