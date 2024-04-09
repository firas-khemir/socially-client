import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, Platform, ToastAndroid } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { globalEnv } from '../../config/baseConfig';
import { useMutation } from 'react-query';
import { LoginAuthAction } from '../../redux/actions/authAction';
import { useAppDispatch } from '../../hooks';

export default () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user] = useState<FirebaseAuthTypes.User | null>();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  async function verifyTokenRequest() {
    return await auth()
      .currentUser?.getIdToken()
      .then(async (token: string) => {
        const dto = { tokenId: token };
        const { data } = await axios.post(`${globalEnv.BASE_URL}/account/auth/verify-token`, dto);
        return data;
      });
  }

  const VerifyTokenMutation = useMutation(verifyTokenRequest, {
    onSuccess: (res) => {
      dispatch(LoginAuthAction(res));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }]
        })
      );
    },
    onError: (data) => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Unable to login', ToastAndroid.SHORT);
      } else {
        Alert.alert('Unable to login');
      }
    }
  });

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => console.log('Your are signed out!'));
      setloggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        {!loggedIn && (
          <GoogleSigninButton
            style={styles.gSigningBtn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
              onGoogleButtonPress().then((data) => {
                if (data != null) {
                  VerifyTokenMutation.mutate();
                } else {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Unable to login', ToastAndroid.SHORT);
                  } else {
                    Alert.alert('Unable to login');
                  }
                }
              })
            }
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!user && <Text>You are currently logged out</Text>}
        {user && (
          <View>
            <Text>Welcome {user.displayName}</Text>
            <Button onPress={signOut} title="LogOut" color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonContainer: {
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  },
  gSigningBtn: { width: 192, height: 48 }
});
