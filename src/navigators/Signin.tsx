import { PhoneAuth } from '../screens/Signin/PhoneAuth/PhoneAuth';
import React from 'react';
import { MainSiginChoiceScreen } from '../screens/Signin/SigninChoice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigninParamsList } from '../../@types/navigation/MainNavigation';

const Stack = createNativeStackNavigator<SigninParamsList>();

export const SigninNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SigninChoice" component={MainSiginChoiceScreen} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
    </Stack.Navigator>
  );
};
