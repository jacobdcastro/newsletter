import React from 'react';
import { AppProps } from 'next/app';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import '../styles/globals.css';
import SdkContextProvider from '../utils/SdkContext';

const supportedChainIds = [
  4, // rinkeby
];

const connectors = {
  injected: {}, // MetaMask
  walletconnect: {},
  walletlink: {
    // Coinbase Wallet
    appName: 'thirdweb - demo',
    url: 'https://thirdweb.com',
    darkMode: false,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <SdkContextProvider>
        <Component {...pageProps} />
      </SdkContextProvider>
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
