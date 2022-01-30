import { useWeb3 } from '@3rdweb/hooks';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { signupPayload } from 'src/types/signup';
import useSdk from './useSdk';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFTSTORAGE_API_KEY,
});

export const useCreatorSignup = () => {
  const { address } = useWeb3();
  const [profileImg, setProfileImg] = useState();
  const [publicationImg, setPublicationImg] = useState();
  const [username, setUsername] = useState('PLEASE');
  const [publicationName, setPublicationName] = useState('PLEASE');
  const [publicationDescription, setPublicationDescription] =
    useState('idek tbh');
  const [ipfs, setIpfs] = useState({ bundleDropImg: '', creatorNftImg: '' });

  const handleFormChange = () => {};

  // step 3 - mint creator nft to creator's wallet
  const nftMintToMutation = useMutation(
    (payload: { bundleDropAddress: string }) => {
      return axios.post('/api/signup/3-nftMintTo', {
        ...payload,
        address,
        username,
        image: ipfs.creatorNftImg,
      });
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
      onSuccess: ({ data }) =>
        nftMintToMutation.mutate({ bundleDropAddress: data.bundleDropAddress }),
    }
  );

  // step 1 - create splits module
  const splitsMutation = useMutation(
    () => axios.post('/api/signup/1-splitsModule', { address, username }),
    {
      onSuccess: ({ data }) => {
        bundleDropMutation.mutate({
          splitsModuleAddress: data.splitsModuleAddress,
        });
      },
    }
  );

  console.log('splits', splitsMutation.data);
  console.log('bundle', bundleDropMutation.data);
  console.log('nft', nftMintToMutation.data);

  const signup = async () => {
    if (!profileImg || !publicationImg) return;

    const cid1 = await client.storeBlob(profileImg);
    const cid2 = await client.storeBlob(publicationImg);

    setIpfs({
      bundleDropImg: `ipfs://${cid1}`,
      creatorNftImg: `ipfs://${cid2}`,
    });

    splitsMutation.mutate();
  };

  return {
    setUsername,
    setPublicationName,
    setPublicationDescription,
    setProfileImg,
    setPublicationImg,
    signup,
  };
};
