import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { MainNavigationProps } from '../../../@types/navigation/MainNavigation';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Authenticated({ navigation }: MainNavigationProps) {
  return (
    <SafeAreaView style={styles.screen}>
      {/* <Text style={styles.text}>You're Logged in</Text>
      <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text> */}
      {/* <Text style={styles.text}>{token}</Text> */}
      <Card style={{ width: '80%' }}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>

      <Button
        rippleColor="#FF000020"
        icon="camera"
        mode="contained"
        onPress={async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
              .signOut()
              .then(() => console.log('Your are signed out!'));
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Signout
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8
  },
  text: {
    fontSize: 25
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20
  }
});
