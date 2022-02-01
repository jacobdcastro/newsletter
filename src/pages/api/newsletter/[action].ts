import { NextApiRequest, NextApiResponse } from 'next';
import { Newsletter } from 'src/types/db';
import clientPromise from 'src/utils/db';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type RouteActionType = 'publish' | 'find';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'GET') {
    if (req.query.newsletterTokenId) {
      // find one newsletter
    } else {
      // get all newsletters
    }
  }

  if (req.method === 'POST') {
    if (req.query.action === 'publish') {
      const {
        creatorAddress,
        publicationAddress,
        newsletterTokenId,
        subscribers,
      } = req.body;

      const bundleDropModule = sdk.getBundleDropModule(publicationAddress);

      // create claim factory (w/ whitelist)
      const factory = bundleDropModule.getClaimConditionFactory();
      const claimPhase = factory.newClaimPhase({
        startTime: new Date(),
        // maxQuantity: subscribers.length,
        maxQuantity: 14,
        maxQuantityPerTransaction: 1,
      });
      claimPhase.setPrice(0);
      claimPhase.setSnapshot(subscribers);
      await bundleDropModule.setClaimCondition(newsletterTokenId, factory);

      const newsletter = await bundleDropModule.get(newsletterTokenId);

      // await db.collection('Publications').updateOne(
      //   { publicationAddress: req.body.publicationAddress },
      //   {
      //     $push: {
      //       newsletters: {
      //         creatorAddress: req.body.creatorAddress,
      //         bundleDropAddress: req.body.publicationAddress,
      //         tokenId: null,
      //         whitelistAtPublish: [],
      //         lastSaved: null,
      //         isPublished: false,
      //         publishDate: null,
      //         content: '',
      //       } as Newsletter,
      //     },
      //   }
      // );
    }
  }
};

export default handler;
