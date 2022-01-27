import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';

if (
  !process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY ||
  process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY == ''
) {
  console.error('Private key not found.');
}

if (
  !process.env.NEXT_PUBLIC_ALCHEMY_API_URL ||
  process.env.NEXT_PUBLIC_ALCHEMY_API_URL == ''
) {
  console.error('Alchemy API URL not found.');
}

const initMasterSdk = () => {
  const masterSdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY,
      ethers.getDefaultProvider(process.env.NEXT_PUBLIC_ALCHEMY_API_URL)
    )
  );
  return masterSdk;
};

const initUserSdk = (userProvider: any) => {
  if (userProvider) {
    return new ThirdwebSDK(userProvider.getSigner());
  }
  return undefined;
};

export { initMasterSdk, initUserSdk };
