export interface Subscriber {
  address: string;
  dateSubscribed: number;
  active: boolean;
}

export interface Newsletter {
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
  creatorAddress: string;
  publicationAddress: string;
  subscribers: Subscriber[];
  newsletters: Newsletter[];
}
