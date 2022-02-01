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

export const useCreator = () => {
  const { userSdk } = useContext(SdkContext);
  const { address } = useWeb3();
  const [newsletterName, setNewsletterName] = useState<string>('');
  const [newsletterDescription, setNewsletterDescription] =
    useState<string>('');
  const [newsletterImg, setNewsletterImg] = useState<File | null>(null);
  const [newsletterContent, setNewsletterContent] = useState<string>('');
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

  const publish = useMutation(
    (payload: { publicationAddress: string; newsletterTokenId: string }) => {
      const { publicationAddress, newsletterTokenId } = payload;
      return axios.post('/api/newsletter/publish', {
        creatorAddress: address,
        publicationAddress,
        newsletterTokenId,
        newsletterContent,
      });
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
        setIsLoading(false);
      },
      onError: error => {
        console.error(error);
        setIsLoading(false);
      },
    }
  );

  // SHOULD already have whitelist in state
  const publishNewsletter = async e => {
    e.preventDefault();

    if (!publicationData || !userSdk) {
      console.error('Missing important data and/or sdk!');
      return;
    }
    if (
      newsletterName === '' ||
      newsletterDescription === '' ||
      newsletterContent === '' ||
      !newsletterImg
    ) {
      console.error('Cannot submit empty fields!');
      return;
    }

    const { data } = publicationData;

    setIsLoading(true);
    console.log(
      '⏳ Heads up! This may take a few minutes.',
      'Please be patient and do NOT leave the page or refresh!'
    );
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
          name: newsletterName,
          description: newsletterContent,
          image: `ipfs://${cid}`,
        },
      ]);

      const newsletterTokenId = batchRes[0];

      const newsletterNft = await bundleDropModule.get(newsletterTokenId);

      console.log({ newsletterNft, data });

      // 2 save to Newsletter[] in MongoDB
      publish.mutate({
        newsletterTokenId,
        publicationAddress: data.publicationAddress,
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const isCreator = useMemo(
    () => (creatorNft === undefined ? undefined : creatorNft !== null),
    [creatorNft]
  );

  // const getAllIssues = async () => {
  //   const nfts = await module.getAll();
  //   console.log({ nfts });
  // };

  return {
    isCreator,
    publication: publicationData?.data,
    publicationIsLoading,
    publicationIsError,

    setNewsletterName,
    setNewsletterDescription,
    setNewsletterImg,
    setNewsletterContent,

    publishNewsletter,
    isLoading,
  };
};
