import { StackScreenProps } from '@react-navigation/stack';
import { AccountStackParamList } from './AccountNavigation';

export type PostStackParamList = {
  postMain: { id: string };
  AccountNav: StackScreenProps<AccountStackParamList>;
};
