/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../redux/reducers/themeReducer';
import { ApplicationNavigationProps } from '../../../@types/navigation/MainNavigation';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

const Startup = ({ navigation }: ApplicationNavigationProps) => {
  const { Layout, Gutters } = useTheme();

  let initialRoute = 'Main';

  const init = async () => {
    if (auth().currentUser) {
      initialRoute = 'Main';
    } else {
      initialRoute = 'Signin';
    }

    setDefaultTheme({ theme: 'default', darkMode: null });

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 2000)
    );

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: initialRoute }]
      })
    );
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default Startup;
