import { useWeb3 } from '@3rdweb/hooks';
import axios from 'axios';
import { useMutation } from 'react-query';

export const useSubscriber = () => {
  const { address } = useWeb3();

  const subscribe = async (publicationAddress: string) => {
    //ping mongodb only
    // await mutate(publicationAddress);
  };

  const isSubscribedTo = async (publicationAddress: string) => {
    // check subscription
  };

  const claimNewsletterNft = async () => {};

  const viewNewsletterContent = async () => {};

  return { subscribe, claimNewsletterNft, viewNewsletterContent };
};
