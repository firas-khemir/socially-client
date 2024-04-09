import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import {
  SingleEventStackParamList,
  SingleEventStackProps
} from '../../../../@types/navigation/SingleEventNavigation';
import SingleEventMain from './SingleEventMain';

export default function SingleEventNavigator({ route }: SingleEventStackProps) {
  const Stack = createNativeStackNavigator<SingleEventStackParamList>();
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Stack.Navigator initialRouteName="SingleEventMain" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SingleEventMain"
          component={SingleEventMain}
          initialParams={{ eventId: route.params?.eventId }}
        />
      </Stack.Navigator>
    </View>
  );
}
