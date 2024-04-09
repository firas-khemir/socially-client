import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SearchStackProps } from './SearchNavigation';
import { SingleEventStackProps } from './SingleEventNavigation';
import { HomeStackProps } from './HomeNavigation';

// Param List
export type MainParamsList = {
  Home: StackScreenProps<TabsParamsList>;
  Profile: undefined;
};

export type TabsParamsList = {
  HomeNavigator: NavigatorScreenParams<HomeStackProps>;
  Discover: undefined;
  Search: NavigatorScreenParams<SearchStackProps>;
  SingleEvent: NavigatorScreenParams<SingleEventStackProps>;
  Create: undefined;
  Activity: undefined;
  Account: undefined;
};

type SigninParamsList = {
  SigninChoice: undefined;
  PhoneAuth: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>; // contains nested navigators
  Signin: NavigatorScreenParams<SigninParamsList>;
};

// Screen Props -- For screens that have nested screens in them (Contains both route and navigation )

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>; // used to navigate to a screen in a nested navigator
// export type TabsScreenProps = StackScreenProps<TabsParamsList>;
export type MainScreenProps = StackScreenProps<MainParamsList>;

// Navigation Props (Contains only navigation)

export type ApplicationNavigationProps = {
  navigation: StackNavigationProp<ApplicationStackParamList, 'Startup'>;
};

export type SigninNavigationProps = {
  navigation: StackNavigationProp<SigninParamsList, 'SigninChoice'>;
};

export type MainNavigationProps = {
  navigation: StackNavigationProp<MainParamsList, 'Home'>;
};
