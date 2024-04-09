import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { Alert, Button, View } from 'react-native';
import PhoneNumber from './PhoneNumber';
import VerifyCode from './VerifyCode';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SigninChoice: undefined;
  PhoneAuth: undefined;
};

type PhoneAuthScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SigninChoice'>;
};

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <PhoneAuth />
    </View>
  );
};

export const PhoneAuth = () => {
  const [confirm, setConfirm] = useState<any>();

  async function signIn(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  async function confirmVerificationCode(code: string) {
    try {
      await confirm?.confirm(code);
      setConfirm(null);
    } catch (error) {
      Alert.alert('Invalid code');
    }
  }

  if (confirm) {
    return <VerifyCode onSubmit={confirmVerificationCode} />;
  }

  return <PhoneNumber onSubmit={signIn} />;
};
