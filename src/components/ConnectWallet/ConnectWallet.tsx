import React from 'react';
import { useWeb3 } from '@3rdweb/hooks';
import s from './ConnectWallet.module.css';
import { useHover } from '../../hooks/useHover';

const ConnectWallet = () => {
  const [isHovered, hoveredProps] = useHover();
  const { connectWallet, disconnectWallet, connectors, address } = useWeb3();

  return (
    <div className={s.root}>
      {address ? (
        <button
          className={s.connectButton}
          onClick={disconnectWallet}
          {...hoveredProps}
        >
          {isHovered ? 'Disconnect' : address}
      
        </button>
      ) : (
        <button
          className={s.connectButton}
          onClick={() => connectWallet('injected')}
        >
          Connect Wallet
    
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
