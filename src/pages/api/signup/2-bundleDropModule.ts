import { NextApiRequest, NextApiResponse } from 'next';
import { Publication } from 'src/types/db';
import clientPromise from 'src/utils/db';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { bundleDropAddress: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const client = await clientPromise;
  const db = client.db('Creators');

  let pubs = db.collection('publications').find({}).toArray();
  pubs = JSON.parse(JSON.stringify(pubs));

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

  // 4 add publication to db
  await db.collection('Publications').insertOne({
    creatorAddress: address,
    publicationAddress: bundleDropRes.address,
    subscribers: [
      { dateSubscribed: Date.now(), active: true, address: '0x12345' },
      { dateSubscribed: Date.now(), active: true, address: '0x67890' },
      { dateSubscribed: Date.now(), active: false, address: '0xabcde' },
    ],
    newsletters: [],
  } as Publication);

  console.log({ bundleDropRes });

  res.status(200).json({ bundleDropAddress: bundleDropRes.address });
};

export default handler;
