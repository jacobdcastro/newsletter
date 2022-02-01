import { useWeb3 } from '@3rdweb/hooks';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFTSTORAGE_API_KEY,
});

const useCreatorSignup = () => {
  const { address } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [signupCompleted, setSignupCompleted] = useState(false);
  const [username, setUsername] = useState('');
  const [publicationName, setPublicationName] = useState('');
  const [publicationDescription, setPublicationDescription] = useState('');
  const [profileImg, setProfileImg] = useState<File | undefined>();
  const [publicationImg, setPublicationImg] = useState<File | undefined>();
  const [ipfs, setIpfs] = useState({ bundleDropImg: '', creatorNftImg: '' });

  // step 3 - mint creator nft to creator's wallet
  const nftMintToMutation = useMutation(
    (payload: { bundleDropAddress: string }) => {
      return axios.post('/api/signup/3-nftMintTo', {
        ...payload,
        address,
        username,
        image: ipfs.creatorNftImg,
      });
    },
    {
      onSuccess: () => {
        console.log('✅ Creator NFT Minted To Creator wallet', address);
        console.log('🚀 Sign Up Complete!');
        setIsLoading(false);
        setSignupCompleted(true);
      },
    }
  );

  // step 2 - create bundle drop module
  const bundleDropMutation = useMutation(
    (payload: { splitsModuleAddress: string }) =>
      axios.post('/api/signup/2-bundleDropModule', {
        ...payload,
        address,
        publicationName,
        publicationDescription,
        image: ipfs.bundleDropImg,
      }),
    {
      onSuccess: ({ data }) => {
        console.log(
          '✅ Bundle Drop Module Created at:',
          data.bundleDropAddress
        );
        nftMintToMutation.mutate({ bundleDropAddress: data.bundleDropAddress });
      },
    }
  );

  // step 1 - create splits module
  const splitsMutation = useMutation(
    () => axios.post('/api/signup/1-splitsModule', { address, username }),
    {
      onSuccess: ({ data }) => {
        console.log('✅ Splits Module Created at:', data.splitsModuleAddress);
        bundleDropMutation.mutate({
          splitsModuleAddress: data.splitsModuleAddress,
        });
      },
    }
  );

  const signup = useCallback(
    async e => {
      e.preventDefault();
      setIsLoading(true);

      if (
        username === '' ||
        publicationName === '' ||
        publicationDescription === ''
      ) {
        console.warn('Missing one or more fields!');
        setIsLoading(false);
        return;
      }

      if (!profileImg || !publicationImg) {
        console.warn(' Please add both images!');
        setIsLoading(false);
        return;
      }

      console.log(
        '⏳ Heads up! This may take a few minutes.',
        'Please be patient and do NOT leave the page or refresh!'
      );

      try {
        // upload images to IPFS
        const cid1 = await client.storeBlob(profileImg);
        const cid2 = await client.storeBlob(publicationImg);
        setIpfs({
          bundleDropImg: `ipfs://${cid1}`,
          creatorNftImg: `ipfs://${cid2}`,
        });

        // begin thirdweb module creation process
        splitsMutation.mutate();
      } catch (error) {
        setIsLoading(false);
      }
    },
    [
      profileImg,
      publicationDescription,
      publicationImg,
      publicationName,
      username,
    ]
  );

  // return 'hi';

  return {
    isLoading,
    signupCompleted,
    setUsername,
    setPublicationName,
    setPublicationDescription,
    setProfileImg,
    setPublicationImg,
    signup,
  };
};

export default useCreatorSignup;
