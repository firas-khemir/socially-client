import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Authenticated from '../../screens/Main/Authneticated';
import { TabsParamsList } from '../../../@types/navigation/MainNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateNewEvent from '../../screens/Main/CreateNewEvent/CreateNewEventScreen';
import { ImagePicker } from '../../screens/Main/CreateNewEvent/TestFileUpload';
import { SearchMainNavigator } from '../../screens/Main/SearchScreen/SearchNavigator';
import { HomeNavigator } from '../../screens/Main/Discover/HomeNavigator';
import AccountScreenMain from '../../screens/Main/Account/UserAccount/AccountScreenMain';

const Tab = createBottomTabNavigator<TabsParamsList>();

export function MainTabs() {
  //   const route = useRoute();

  const getTabIcon = (color: string, name: string, size = 28) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          ...styles.barStyle,
          ...styles.shadow
        },
        activeTintColor: '#44427D',
        inactiveTintColor: 'gray',

        tabBarActiveTintColor: '#44427D',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => getTabIcon(color, 'home', 29)
        }}
      />
      {/* <Tab.Screen
        name="Discover" // Also contains communities
        children={() => AccountScreenMain()}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => getTabIcon(color, 'magnify', 29)
        }}
      /> */}
      <Tab.Screen
        name="Search" // Also contains communities
        component={SearchMainNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => getTabIcon(color, 'magnify', 29)
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateNewEvent}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => getTabIcon(color, 'plus', 34)
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ImagePicker}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color }) => getTabIcon(color, 'room-service', 29)
        }}
      />
      <Tab.Screen
        name="Account"
        component={Authenticated}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => getTabIcon(color, 'account', 28)
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 0.5
  },
  barStyle: {
    // position: 'absolute',
    // bottom: 5,
    // left: 5,
    // right: 5,
    // borderRadius: 15,
    // height: 60,
    // elevation: 0,
    backgroundColor: '#000000'
  },

  itemStyle: {}
});
