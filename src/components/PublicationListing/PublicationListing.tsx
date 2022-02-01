import { useWeb3 } from '@3rdweb/hooks';
import axios from 'axios';
import React, { useMemo } from 'react';
import { useMutation } from 'react-query';
import { Publication } from 'src/types/db';

type Props = { pub: Publication };

const PublicationListing = ({ pub }: Props) => {
  const { address } = useWeb3();

  const { mutate: subscribe, data } = useMutation(
    async () => {
      return axios({
        method: 'POST',
        url: '/api/subscriber',
        data: {
          subscriberAddress: address,
          publicationAddress: pub.publicationAddress,
        },
      });
    },
    { onSuccess: ({ data }) => console.log(data) }
  );

  const isSubscribed = useMemo(() => {
    if (address) {
      return pub.subscribers.find(sub => sub.address === address);
    } else {
      return false;
    }
  }, [data, address]);

  return (
    <div className="mb-10">
      <ul>
        <li>Publication by: {pub.creatorAddress}</li>
        <li>
          Subscribers:{' '}
          {pub.subscribers.length === 0 ? 'None' : pub.subscribers.length}
        </li>
        <li>
          Last Published Newsletter:{' '}
          {pub.newsletters.length === 0
            ? 'Never!'
            : new Date(
                pub.newsletters[pub.newsletters.length - 1]?.publishDate
              ).toDateString()}
        </li>
      </ul>
      <div>
        <button
          className="p-3 border-3 border-black border-solid"
          onClick={() => subscribe()}
        >
          Subscribe Now!
        </button>
      </div>
    </div>
  );
};

export default PublicationListing;
