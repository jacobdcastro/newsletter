import { useWeb3 } from '@3rdweb/hooks';
import useSdk from './useSdk';

export const useCreator = () => {
  const { userSdk } = useSdk();
  const { address } = useWeb3();

  const module = userSdk?.getNFTModule(process.env.NEXT_PUBLIC_NFT_COLLECTION);

  const checkCreatorStatus = async () => {
    const creatorNft = await module.getOwned(address);
    if (creatorNft.length > 0) {
      const publication = await userSdk.getBundleDropModule(
        creatorNft[0].properties.bundleDropAddress.toString()
      );
      console.log({ publication });
    }
  };

  // const metadatas = [
  //   {
  //     name: 'Issue #3',
  //     description: 'This is a cool NFT',
  //     image: 'https://lol.com',
  //   },
  // ];

  // const createAirdrop = async () => {
  //   await module.createBatch(metadatas);
  // };

  // const getAllIssues = async () => {
  //   const nfts = await module.getAll();
  //   console.log({ nfts });
  // };

  return { checkCreatorStatus };
};
