import { StackScreenProps } from '@react-navigation/stack';

export type SingleEventStackParamList = {
  SingleEventNavigator;
  SingleEventMain: { eventId: string };
};

type SingleEventStackProps = StackScreenProps<SingleEventStackParamList, 'SingleEventNavigator'>;
