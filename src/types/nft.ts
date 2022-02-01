export interface CreatorNft {
  id: string;
  name: string;
  description: string;
  image: string;
  uri: string;
  properties: {
    creatorAddress: string;
    bundleDropAddress: string;
  };
}
