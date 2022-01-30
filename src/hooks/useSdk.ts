import { ThirdwebSDK } from '@3rdweb/sdk';
import { useContext, useState } from 'react';
import { SdkContext } from '../utils/SdkContext';

const useSdk = (): {
  userSdk: ThirdwebSDK | undefined;
} => {
  return useContext(SdkContext);
};

export default useSdk;
