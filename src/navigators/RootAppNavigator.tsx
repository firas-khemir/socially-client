import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import { Startup } from '../screens';
import { useTheme } from '../hooks';
import MainNavigator from './Main/MainNavigator';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation/MainNavigation';
import { SigninNavigator } from './Signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

// @refresh reset
const RootAppNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const theme = useColorScheme();

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    // <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
    //   <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
    //     <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
    <SafeAreaView style={{ ...styles.style, backgroundColor: colors.card }}>
      <NavigationContainer ref={navigationRef} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="Signin" component={SigninNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  style: {
    flex: 1
  }
});

export default RootAppNavigator;
