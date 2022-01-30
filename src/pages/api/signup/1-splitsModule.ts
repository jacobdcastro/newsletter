import { NextApiRequest, NextApiResponse } from 'next';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { splitsModuleAddress: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const masterApp = sdk.getAppModule(
    process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS
  );

  const { address, username } = req.body;

  const splitsRes = await masterApp.deploySplitsModule({
    name: `${username} Royalty Split`,
    description: `This split empowers ${username} to recieve royalties on all NFT sales of their publication`,
    recipientSplits: [
      {
        address: address,
        shares: 4,
      },
      {
        address: process.env.NEXT_PUBLIC_APP_MODULE_ADDRESS,
        shares: 1,
      },
    ],
  });

  console.log({ splitsRes });

  res.status(200).json({ splitsModuleAddress: splitsRes.address });
};

export default handler;
