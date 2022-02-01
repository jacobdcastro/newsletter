import { NextApiRequest, NextApiResponse } from 'next';
import { Newsletter } from 'src/types/db';
import clientPromise from 'src/utils/db';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type RouteActionType = 'publish' | 'find';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'POST') {
    const { publicationAddress, newsletterTokenId, newsletterContent } =
      req.body;

    const { subscribers } = await db
      .collection('Publications')
      .findOne({ publicationAddress });

    const bundleDropModule = sdk.getBundleDropModule(publicationAddress);

    // create claim factory (w/ whitelist)
    const factory = bundleDropModule.getClaimConditionFactory();
    const claimPhase = factory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: subscribers.length,
      maxQuantityPerTransaction: 1,
    });
    claimPhase.setPrice(0);
    claimPhase.setSnapshot(subscribers.map(s => s.address));
    console.log('claim phase set...');
    await bundleDropModule.setClaimCondition(newsletterTokenId, factory);

    console.log('claim phase finalized');

    await db.collection('Publications').updateOne(
      { publicationAddress: req.body.publicationAddress },
      {
        $push: {
          newsletters: {
            creatorAddress: req.body.creatorAddress,
            bundleDropAddress: req.body.publicationAddress,
            tokenId: newsletterTokenId,
            whitelistAtPublish: subscribers,
            lastSaved: Date.now(),
            isPublished: true,
            publishDate: Date.now(),
            content: newsletterContent,
          } as Newsletter,
        },
      }
    );

    console.log('publication updated');

    const updatedPublicationDoc = await db
      .collection('Publications')
      .findOne({ publicationAddress });

    res.status(200).json(updatedPublicationDoc);
  }
};

export default handler;
