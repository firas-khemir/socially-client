import { StackScreenProps } from '@react-navigation/stack';
import { PostStackParamList } from './PostNavigation';

export type AccountStackParamList = {
  AccountNavigator;
  Profile: { userUid: string };
  // EventMain: NavigatorScreenParams<PostStackParamList>;
};

type AccountStackProps = StackScreenProps<AccountStackParamList>;
