export interface Subscriber {
  _id?: string;
  address: string;
  dateSubscribed: number;
  active: boolean;
}

export interface Newsletter {
  _id?: string;
  creatorAddress: string;
  bundleDropAddress: string;
  tokenId: string;
  whitelistAtPublish: Subscriber[];
  lastSaved: number;
  isPublished: boolean;
  publishDate: number;
  content: string;
}

export interface Publication {
  _id?: string;
  creatorAddress: string;
  publicationAddress: string;
  subscribers: Subscriber[];
  newsletters: Newsletter[];
}
