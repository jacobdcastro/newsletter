import { NextApiRequest, NextApiResponse } from 'next';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { bundleDropAddress: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const masterApp = sdk.getAppModule(
    process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS
  );

  const {
    address,
    publicationName,
    publicationDescription,
    splitsModuleAddress,
    image,
  } = req.body;

  // 2 create publication module with royalty split
  const bundleDropRes = await masterApp.deployBundleDropModule({
    name: publicationName,
    description: publicationDescription,
    image,
    feeRecipient: splitsModuleAddress,
    primarySaleRecipientAddress: splitsModuleAddress,
  });

  // 3 set minter permissions on publication module
  await bundleDropRes.setAllRoleMembers({ minter: [address] });

  console.log({ bundleDropRes });

  res.status(200).json({ bundleDropAddress: bundleDropRes.address });
};

export default handler;
