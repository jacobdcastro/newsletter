import { useWeb3 } from '@3rdweb/hooks';
import React, { createContext, useMemo } from 'react';
import initUserSdk from './userSdk';

export const SdkContext = createContext(null);

const SdkContextProvider = ({ children }) => {
  const { provider } = useWeb3();

  const userSdk = useMemo(() => initUserSdk(provider), [provider]);

  return (
    <SdkContext.Provider value={{ userSdk }}>{children}</SdkContext.Provider>
  );
};

export default SdkContextProvider;
