// ? API-SIDE ONLY
import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';

if (!process.env.MASTER_PRIVATE_KEY || process.env.MASTER_PRIVATE_KEY == '') {
  console.error('Private key not found.');
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == '') {
  console.error('Alchemy API URL not found.');
}

const masterSdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.MASTER_PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

export { masterSdk };
