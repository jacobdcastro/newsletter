import React, { useEffect, useState } from 'react';
import { ConnectWallet } from '../components/ConnectWallet';
import { useCreator } from '../hooks/useCreator';
import { useCreatorSignup } from '../hooks/useCreatorSignup';

type Props = {};

const Test = (props: Props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { signUp, isLoading, isCompleted } = useCreatorSignup();
  const { checkCreatorStatus } = useCreator();

  const [creatorData] = useState({
    creator: {
      name: 'xiv.eth',
      address: '0x123456789abcdefg',
    },
    publication: {
      name: 'The XIV Weekly',
      description: 'My REALLY newsletter',
      image: '',
    },
  });

  // useEffect(() => {
  //   if (isCompleted) checkCreatorStatus();
  // }, [isCompleted]);

  return (
    <div>
      <ConnectWallet />

      <div>
        <h1>Backend Order of steps</h1>
        <div>
          <h2>Step 1</h2>

          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <button onClick={() => signUp()}>Sign Up</button>
          )}
          <div>
            <button onClick={() => checkCreatorStatus()}>
              Check If Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
