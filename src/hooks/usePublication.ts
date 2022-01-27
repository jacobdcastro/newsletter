import useSdk from './useSdk';

export const usePublication = () => {
  const { masterSdk, userSdk } = useSdk();

  // const app = masterSdk.getAppModule(
  //   process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS
  // );

  const module = userSdk?.getBundleDropModule(
    process.env.NEXT_PUBLIC_BUNDLE_DROP_ADDRESS
  );

  const metadatas = [
    {
      name: 'Issue #3',
      description: 'This is a cool NFT',
      image: 'https://lol.com',
    },
  ];

  const createAirdrop = async () => {
    await module.createBatch(metadatas);
  };

  const getAllIssues = async () => {
    const nfts = await module.getAll();
    console.log({ nfts });
  };

  return { getAllIssues, createAirdrop };
};
