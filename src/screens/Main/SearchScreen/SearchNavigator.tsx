import React from 'react';

import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../../@types/navigation/SearchNavigation';
import { AccountNavigator } from '../Account/UserAccount/AccountNavigator';
import { SearchMain } from './SearchMain';

export const SearchMainNavigator = () => {
  const Stack = createNativeStackNavigator<SearchStackParamList>();
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Stack.Navigator initialRouteName="SearchMain" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchMain" component={SearchMain} />
        <Stack.Screen name="AccountNavigator" component={AccountNavigator} />
      </Stack.Navigator>
    </View>
  );
};
