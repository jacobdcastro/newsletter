import { useWeb3 } from '@3rdweb/hooks';
import useSdk from './useSdk';

export const useCreator = () => {
  const { userSdk } = useSdk();
  const { address } = useWeb3();

  const nftModule = userSdk?.getNFTModule(
    process.env.NEXT_PUBLIC_NFT_COLLECTION
  );

  const checkCreatorStatus = async () => {
    const creatorNft = await nftModule.getOwned(address);
    if (creatorNft.length > 0) {
      const publication = await userSdk.getBundleDropModule(
        creatorNft[0].properties.bundleDropAddress.toString()
      );
      console.log({ publication });
    }
  };

  const publishNewsletter = async () => {
    // 1 fetch subscriber list

    // 1 create batch on thirdweb
    const batchRes = await module.createBatch(metadatas);

    // 2 save to Newsletter[] in MongoDB
  };

  // const getAllIssues = async () => {
  //   const nfts = await module.getAll();
  //   console.log({ nfts });
  // };

  return { checkCreatorStatus };
};
