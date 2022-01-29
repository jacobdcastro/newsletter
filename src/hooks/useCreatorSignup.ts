import { useWeb3 } from '@3rdweb/hooks';
import { ethers } from 'ethers';
import { useState } from 'react';
import useSdk from './useSdk';

const name = 'Test7';

export const useCreatorSignup = () => {
  const { masterSdk, userSdk } = useSdk();
  const { address } = useWeb3();
  const [nftId, setNftId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsComleted] = useState(false);

  const masterApp = masterSdk?.getAppModule(
    process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS
  );

  // Creator NFT module
  const nftCollectionModule = masterSdk.getNFTModule(
    process.env.NEXT_PUBLIC_NFT_COLLECTION
  );

  // TODO move this to API
  const signUp = async () => {
    setIsLoading(true);
    try {
      // TODO add sig verified minting
      // const sigRes = await nftCollectionModule.generateSignature({
      //   id: '123412341234',
      //   currencyAddress: ethers.constants.AddressZero,
      //   metadata: { help: 'idek', name },
      //   mintEndTimeEpochSeconds:
      //     Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      //   mintStartTimeEpochSeconds: Math.floor(Date.now() / 1000),
      //   price: 0,
      //   to: address,
      // });

      // console.log({ sigRes });

      // 1 create royalty split
      const splitsRes = await masterApp.deploySplitsModule({
        name: `${name} Royalty Split`,
        recipientSplits: [
          {
            address: address,
            shares: 4,
          },
          {
            address: process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS,
            shares: 1,
          },
        ],
      });
      console.log({ splitsRes });

      // 2 create publication module with royalty split
      const bundleDropRes = await masterApp.deployBundleDropModule({
        name: `${name} Newsletter!`,
        description: 'Just a way to talk to lemons...',
        feeRecipient: splitsRes.address,
        primarySaleRecipientAddress: splitsRes.address,
      });

      // 3 set minter permissions on publication module
      await bundleDropRes.setAllRoleMembers({ minter: [address] });
      console.log({ bundleDropRes });

      console.log({ nftCollectionModule });

      // 4 create new Creator NFT
      const nftMintToRes = await nftCollectionModule.mintTo(address, {
        name,
        description: `${name} description`,
        properties: {
          creatorAddress: address,
          bundleDropAddress: bundleDropRes.address,
        },
      });
      console.log({ nftMintToRes });

      setIsLoading(false);
      setIsComleted(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { signUp, isLoading, isCompleted };
};
