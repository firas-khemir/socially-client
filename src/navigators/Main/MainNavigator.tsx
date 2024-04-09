import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authenticated from '../../screens/Main/Authneticated';
import { MainNavigationProps, MainParamsList } from '../../../@types/navigation/MainNavigation';
import { MainTabs } from './TabNavigator';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator<MainParamsList>();

const MainNavigator = ({ navigation }: MainNavigationProps) => {
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Signin' }]
          })
        );
      }
    });
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="Profile" component={Authenticated} />
      {/* <Stack.Screen name="conversations" component={Conversations} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
