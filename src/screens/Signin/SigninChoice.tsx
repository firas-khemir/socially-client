import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { styled } from 'nativewind';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import GoogleAuth from './GoogleAuth';
import { SigninNavigationProps } from '../../../@types/navigation/MainNavigation';

// const StyledView = styled(View);
// const StyledText = styled(Text);

export const MainSiginChoiceScreen = ({ navigation }: SigninNavigationProps) => {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Button title="Go to PhoneAuth" onPress={() => navigation.navigate('PhoneAuth')} />
          <GoogleAuth />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  }
});
