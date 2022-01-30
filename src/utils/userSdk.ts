// ? CLIENT-SIDE ONLY
import { ThirdwebSDK } from '@3rdweb/sdk';

const initUserSdk = (userProvider: any) => {
  if (userProvider) {
    return new ThirdwebSDK(userProvider.getSigner());
  }
  return undefined;
};

export default initUserSdk;
