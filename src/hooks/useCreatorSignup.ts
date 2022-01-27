import { useWeb3 } from '@3rdweb/hooks';
import useSdk from './useSdk';

export const useCreatorSignup = () => {
  const { masterSdk, userSdk } = useSdk();
  const { address } = useWeb3();

  const app = masterSdk?.getAppModule(
    process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS
  );
  console.log(app);

  // 1. create Bundle Drop module
  const createPublication = async () => {
    const res = await app.deployBundleDropModule({
      name: 'Jacobs Newsletter!',
      description: 'Just a way to talk to lemons...',

      // TODO must create splits module to send fees to non-project address
      feeRecipient: address,
      primarySaleRecipientAddress: address,
    });

    console.log(res);
  };

  return { createPublication };
};
