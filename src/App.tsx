import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux';
import RootAppNavigator from './navigators/RootAppNavigator';
import './translations';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import placeholder from './assets/img.jpg';
import MyList from './MyList';

const App = () => {
  const colorScheme = useColorScheme();

  GoogleSignin.configure({
    webClientId: '836635725426-g8k7abqnt1qvek7ci8v8nmkhvnk6hufh.apps.googleusercontent.com'
  });

  // const { theme } = useMaterial3Theme();

  // const theme =
  //   colorScheme === 'dark'
  //     ? { ...MD3DarkTheme, colors: theme.dark }
  //     : { ...MD3LightTheme, colors: theme.light };

  const queryClient = new QueryClient({});
  return (
    // <SafeAreaView style={styles.container}>
    //   <MyList />

    //   <StatusBar />
    // </SafeAreaView>
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <QueryClientProvider client={queryClient}>
            <RootAppNavigator />
          </QueryClientProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  }
});

export default App;
