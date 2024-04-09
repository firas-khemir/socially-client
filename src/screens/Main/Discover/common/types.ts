export type FeedEventDetailsType = {
  id: string;
  version?: number;
  name: string;
  details: string;
  images: EventImage[];
  startDate: Date;
  duration: number;
  frequency: string;
  creator: FeedEventCreatorType;
  createdDate: Date;
  lastModifiedDate?: string;
};

export type FeedEventCreatorType = {
  uid: string;
  photo?: string;
  username: string;
};

export type EventImage = {
  id: string;
  version?: number;
  hq_url: string;
  mq_url: string;
  lq_url: string;
};
