import { NextApiRequest, NextApiResponse } from 'next';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { nftTokenId: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // Creator NFT module
  const nftCollectionModule = sdk.getNFTModule(
    process.env.NEXT_PUBLIC_NFT_COLLECTION
  );

  const { address, username, bundleDropAddress, image } = req.body;

  // 4 create new Creator NFT
  const nftMintToRes = await nftCollectionModule.mintTo(address, {
    name: `${username} Creator Badge`,
    description: `This NFT grants ${username} permission to publish content with their wallet ${address}!`,
    image,
    properties: {
      creatorAddress: address,
      bundleDropAddress: bundleDropAddress,
    },
  });

  console.log({ nftMintToRes });

  res.status(200).json({ nftTokenId: nftMintToRes.id });
};

export default handler;
