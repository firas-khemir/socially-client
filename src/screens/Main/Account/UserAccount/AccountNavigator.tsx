import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList, AccountStackProps } from '../../../../../@types/navigation/AccountNavigation';
import AccountScreenMain from './AccountScreenMain';
import { View } from 'react-native';

export const AccountNavigator = ({ route }: AccountStackProps) => {
  const Stack = createNativeStackNavigator<AccountStackParamList>();

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Profile"
          component={AccountScreenMain}
          initialParams={{ userUid: route.params?.userUid }}
        />
      </Stack.Navigator>
    </View>
  );
};
