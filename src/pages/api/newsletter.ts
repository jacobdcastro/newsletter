import { NextApiRequest, NextApiResponse } from 'next';
import { Newsletter } from 'src/types/db';
import clientPromise from 'src/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'POST') {
    await db.collection('Publications').updateOne(
      { publicationAddress: req.body.publicationAddress },
      {
        $push: {
          newsletters: {
            creatorAddress: req.body.creatorAddress,
            bundleDropAddress: req.body.publicationAddress,
            tokenId: null,
            whitelistAtPublish: [],
            lastSaved: null,
            isPublished: false,
            publishDate: null,
            content: '',
          } as Newsletter,
        },
      }
    );
  }
};

export default handler;
