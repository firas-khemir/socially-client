import { StackScreenProps } from '@react-navigation/stack';
import { AccountStackParamList } from './AccountNavigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SingleEventStackParamList } from './SingleEventNavigation';

export type HomeStackParamList = {
  HomeNavigator;
  HomeFeedMain: undefined;
  AccountNavigator: NavigatorScreenParams<AccountStackParamList>;
  SingleEventNavigator: NavigatorScreenParams<SingleEventStackParamList>;
};

type HomeStackProps = StackScreenProps<HomeStackParamList>;
