import { useWeb3 } from '@3rdweb/hooks';
import { NFTMetadata } from '@3rdweb/sdk';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { CreatorNft } from 'src/types/nft';
import { SdkContext } from 'src/utils/SdkContext';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFTSTORAGE_API_KEY,
});

const publicationAddress = '0x22Dc8B29D437f40520DEe9537c27b6EE34c7bE3c';

export const useCreator = () => {
  const { userSdk } = useContext(SdkContext);
  const { address } = useWeb3();
  const [newsletterImg, setNewsletterImg] = useState<File | null>(null);
  const [creatorNft, setCreatorNft] = useState<NFTMetadata | null | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const creatorNftModule = userSdk?.getNFTModule(
    process.env.NEXT_PUBLIC_NFT_COLLECTION
  );

  const getCreatorNft = useCallback(async () => {
    const nfts: NFTMetadata[] = await creatorNftModule.getOwned(address);
    if (nfts.length > 0) {
      setCreatorNft(nfts[0]);
    } else {
      setCreatorNft(null);
    }
  }, [address, creatorNftModule]);

  // fetches and sets creator's NFT
  useEffect(() => {
    if (creatorNftModule) getCreatorNft();
  }, [getCreatorNft, creatorNftModule]);

  // gets creator's publication
  const {
    data: publicationData,
    isLoading: publicationIsLoading,
    isError: publicationIsError,
  } = useQuery(
    [address],
    () => {
      return axios({
        method: 'GET',
        url: '/api/publications',
        params: { creatorAddress: address },
      });
    },
    { enabled: !!address }
  );

  // const { mutate, data } = useMutation(
  //   ({ publicationAddress, subscribers, newsletterTokenId }) => {
  //     return axios.post('/api/newsletter/publish', {
  //       creatorAddress: address,
  //       publicationAddress,
  //     });
  //   },
  //   { onSuccess: ({ data }) => console.log(data) }
  // );

  // SHOULD already have whitelist in state
  const publishNewsletter = async () => {
    if (!publicationData || !newsletterImg || !userSdk) return;
    const { data } = publicationData;
    setIsLoading(true);
    try {
      // upload image to IPFS
      const cid = await client.storeBlob(newsletterImg);

      // get publication data
      const bundleDropModule = userSdk.getBundleDropModule(
        data.publicationAddress
      );

      // create new NFT in publication collection
      const batchRes = await bundleDropModule.createBatch([
        {
          name: 'Very First Newsletter Airdrop!!',
          description: 'Soooooooooo this should be cool',
          image: `ipfs://${cid}`,
        },
      ]);

      console.log(batchRes);
      const newsletterTokenId = batchRes[0];

      const newsletter = await bundleDropModule.get(newsletterTokenId);

      console.log({ newsletter, data });
      setIsLoading(false);
      // 2 save to Newsletter[] in MongoDB
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const getAllIssues = async () => {
  //   const nfts = await module.getAll();
  //   console.log({ nfts });
  // };

  return {
    isCreator: creatorNft === undefined ? undefined : creatorNft !== null,
    publication: publicationData?.data,
    publicationIsLoading,
    publicationIsError,

    setNewsletterImg,
    publishNewsletter,
    isLoading,
  };
};
