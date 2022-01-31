import React from 'react';
import { AppProps } from 'next/app';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import '../styles/globals.css';
import SdkContextProvider from '../utils/SdkContext';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <SdkContextProvider>
          <Component {...pageProps} />
        </SdkContextProvider>
      </ThirdwebWeb3Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
