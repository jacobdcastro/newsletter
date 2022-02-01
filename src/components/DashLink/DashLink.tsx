import React from 'react';
import { useWeb3 } from '@3rdweb/hooks';
import s from './DashLink.module.css';

const DashLink = () => {
  const { address } = useWeb3();

  // isSignedIn = boolean value if address is null or not
  const isSignedIn = address !== undefined;

  console.log(isSignedIn);

  return (
    <div className={s.root}>
      {isSignedIn ? (
        <a href="/dashboard/subscriber">
          {' '}
          <h4 className={'font-semibold text-violet-600'}>
            Subscriber Dashboard &rarr;
          </h4>
        </a>
      ) : (
        <h4 className={'font-semibold text-violet-600'}>
          Connect Wallet to Enter &uarr;
        </h4>
      )}
    </div>
  );
};

export default DashLink;
