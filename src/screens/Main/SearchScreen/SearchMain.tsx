import React, { useState } from 'react';

import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { SearchPeople } from './SearchPeople';
import { SearchStackProps } from '../../../../@types/navigation/SearchNavigation';

export const SearchMain = ({}: SearchStackProps) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <View style={{ height: '100%', width: '100%', paddingHorizontal: 10 }}>
      <View style={styles.textInput}>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          label="Event name"
          onChangeText={(input) => setSearchInput(input)}
          value={searchInput}
          theme={{ roundness: 15 }}
          placeholder="Type something"
        />
      </View>

      <SearchPeople searchQuery={searchInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 5,
    height: 50
  }
});
