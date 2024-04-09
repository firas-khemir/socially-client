import React from 'react';

import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountNavigator } from '../Account/UserAccount/AccountNavigator';
import { HomeStackParamList } from '../../../../@types/navigation/HomeNavigation';
import MyListt from './MyList';
import SingleEventNavigator from '../SingleEventScreen/SingleEventNavigator';

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Stack.Navigator initialRouteName="HomeFeedMain" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeFeedMain" component={MyListt} />
        <Stack.Screen name="AccountNavigator" component={AccountNavigator} />
        <Stack.Screen name="SingleEventNavigator" component={SingleEventNavigator} />
      </Stack.Navigator>
    </View>
  );
};
