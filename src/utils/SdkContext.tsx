import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers, providers } from 'ethers';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { initMasterSdk, initUserSdk } from './initSdk';

export const SdkContext = createContext(null);

const SdkContextProvider = ({ children }) => {
  const { provider } = useWeb3();

  const masterSdk = useMemo(() => initMasterSdk(), []);
  const userSdk = useMemo(() => initUserSdk(provider), [provider]);

  return (
    <SdkContext.Provider value={{ userSdk, masterSdk }}>
      {children}
    </SdkContext.Provider>
  );
};

export default SdkContextProvider;
