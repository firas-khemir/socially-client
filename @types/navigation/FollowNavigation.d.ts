import { StackScreenProps } from '@react-navigation/stack';
import { AccountStackParamList } from './AccountNavigation';

export type FollowStackParamList = {
  FollowMain: undefined;
  AccountNav: StackScreenProps<AccountStackParamList>;
};
