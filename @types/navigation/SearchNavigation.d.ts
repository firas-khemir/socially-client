import { StackScreenProps } from '@react-navigation/stack';
import { AccountStackParamList } from './AccountNavigation';

export type SearchStackParamList = {
  SearchMain: undefined;
  AccountNavigator: NavigatorScreenParams<AccountStackParamList>;
};

type SearchStackProps = StackScreenProps<SearchStackParamList, 'SearchMain'>;
