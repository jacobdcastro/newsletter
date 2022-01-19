import React from 'react';
import { AppProps } from 'next/app';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import '../styles/globals.css';

const supportedChainIds = [
  1, // mainnet
  3, // ropsten
  4, // rinkeby
  137, // polygon mainnet
  80001, // polygon mumbai
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
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
